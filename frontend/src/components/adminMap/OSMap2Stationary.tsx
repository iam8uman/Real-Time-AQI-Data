
"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import io, { Socket } from 'socket.io-client';


const Map = dynamic(() => import('./SocketMapStationary'), { ssr: false });

type Position = {
  _id: string;
  lati: number;
  lngi: number;
  alti: number;
  sensorData: any[];
  __v: number;
};

type SensorData = {
  _id: string;
  kei: string;
  value: number;
  timestamp: string;
  userId: number;
  position: Position;
  device?:{
    positions: Position;
  }
};

export default function OSMap2() {
  const [initialSensorData, setInitialSensorData] = useState<SensorData[]>([]);
  const [realtimeSensorData, setRealtimeSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    const url = new URL('http://84.247.187.226/sensorDatas/list/filter');
    const params: Record<string, string | number> = {
      page: 1,
      limit: 40,
      sortBy: 'timestamp',
      sortOrder: 'desc',
      filters: 'kei=eq_0_and_device.type=eq_STATIONERY',
    
    };
    
    Object.keys(params).forEach((key: string) => url.searchParams.append(key, String(params[key])));

    fetch(url, {
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching initial sensor data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setInitialSensorData(data.data);
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching initial sensor data:', error);
      });
  }, []);

  console.log(initialSensorData,"ksksksk");

  useEffect(() => {
    const socket: Socket = io('http://84.247.187.226/gs/realtime', {
      withCredentials: true,
      extraHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:3000' // Replace with your frontend URL
      }
    });

    socket.on('sensor_data_topic', (data: SensorData) => {
      if (data && data?.device?.positions) {
        setRealtimeSensorData((prevSensorData) => [...prevSensorData, data]);
        console.log('Received sensor data from socket:', data);
      } else {
        console.error('Received invalid sensor data from socket:', data);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <Map initialSensorData={initialSensorData} realtimeSensorData={realtimeSensorData} />
    </div>
  );
}
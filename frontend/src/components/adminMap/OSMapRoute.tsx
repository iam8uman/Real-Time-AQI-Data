'use client'

import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const OSMap2: React.FC = () => {
  const mapRef = useRef<L.Map | any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [stationeryData, setStationeryData] = useState<any[]>([]);
  const intervalRef = useRef<number | null>(null);
  const stationeryIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [27.695297, 85.271747],
        zoom: 15,
        zoomControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      if (stationeryIntervalRef.current !== null) {
        clearInterval(stationeryIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.get("http://159.65.157.137/sensorDatas/list/filter", {
          params: {
            page: 1,
            limit: 100,
            sortBy: "timestamp",
            sortOrder: "desc",
          },
        });
        console.log("Fetched sensor data:", response.data.data);
        setSensorData(response.data.data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();
    if (typeof window !== "undefined") {
    intervalRef.current = window.setInterval(fetchSensorData, 20000);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchStationeryData = async () => {
      try {
        const response = await axios.get("http://159.65.157.137/sensorDatas/list/filter", {
          params: {
            page: 1,
            limit: 10,
            sortBy: "timestamp",
            sortOrder: "desc",
            filters: ["device.type=eq_STATIONERY"],
          },
        });
        console.log("Fetched stationery data:", response.data.data);
        setStationeryData(response.data.data);
      } catch (error) {
        console.error("Error fetching stationery data:", error);
      }
    };

    fetchStationeryData();
    if (typeof window !== "undefined") {
    stationeryIntervalRef.current = window.setInterval(fetchStationeryData, 120000);
    }

    return () => {
      if (stationeryIntervalRef.current !== null) {
        clearInterval(stationeryIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateMap = () => {
      if (currentIndex >= sensorData.length) return;

      const currentPoint = sensorData[currentIndex];
      if (!currentPoint || !currentPoint.position) {
        console.error('Current point or current point.position is undefined', { currentPoint, currentIndex });
        return;
      }

      const coordinates: [number, number] = [currentPoint.position.lati, currentPoint.position.lngi];

      if (currentIndex > 0) {
        const previousPoint = sensorData[currentIndex - 1];
        const prevCoordinates: [number, number] = [previousPoint.position.lati, previousPoint.position.lngi];

        const avgPMValue = calculateAveragePM(previousPoint.value, currentPoint.value);
        const color = getColorBasedOnPM(avgPMValue);

        L.polyline([prevCoordinates, coordinates], {
          color: color,
          weight: 5,
          opacity: 0.7,
        }).addTo(mapRef.current);
      }

      const marker = L.circleMarker(coordinates, {
        radius: 5,
        color: getColorBasedOnPM(currentPoint.value),
      }).addTo(mapRef.current);

      marker.bindTooltip(`PM2.5: ${currentPoint.value}`).openTooltip();

      if (currentIndex === 0) {
        mapRef.current.fitBounds(L.featureGroup([marker]).getBounds());
      }
    };

    updateMap();

    if (typeof window !== "undefined") {
    if (currentIndex < sensorData.length - 1) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 10000);
    }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, sensorData]);

  useEffect(() => {
    const updateStationeryData = () => {
      if (!Array.isArray(stationeryData)) {
        console.error('Stationery data is not an array', { stationeryData });
        return;
      }

      stationeryData.forEach((point) => {
        if (point && point.value) {
          const coordinates: [number, number] = [27.695323, 85.272303];
          const radius = 50;

          const circle = L.circle(coordinates, {
            radius: radius,
            color: getColorBasedOnPM(point.value),
            weight: 1,
            fillOpacity: 0.5,
          }).addTo(mapRef.current);

          circle.bindTooltip(`Stationery PM2.5: ${point.value}`).openTooltip();
        }
      });
    };

    updateStationeryData();
  }, [stationeryData]);

  const calculateAveragePM = (pmStart: number, pmEnd: number) => {
    return (pmStart + pmEnd) / 2;
  };

  const getColorBasedOnPM = (pmValue: number) => {
    if (pmValue <= 50) return "green";
    else if (pmValue <= 100) return "orange";
    else return "red";
  };

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default OSMap2;

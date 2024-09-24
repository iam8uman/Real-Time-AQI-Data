import React, { useEffect, useState } from "react"
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet"

import "leaflet/dist/leaflet.css"

import L, { LatLngExpression } from "leaflet"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import LineChartComponent from "../LineChartStationary"
import { Card } from "../ui/card"

type Position = {
  _id: string
  lati: number
  lngi: number
  alti: number
  sensorData: any[]
  __v: number
}

type SensorData = {
  _id: string
  kei: string
  value: number
  timestamp: string
  userId: number
  position: Position
  device?: {
    positions: Position
  }
}

type MapProps = {
  initialSensorData: SensorData[] // Initial data fetched
  realtimeSensorData: SensorData[] // Data received from socket
}

// Extend Leaflet's DefaultIcon to avoid TypeScript error
declare module "leaflet" {
  namespace Icon {
    interface Default {
      _getIconUrl?: string
    }
  }
}

const getColor = (value: number) => {
  if (value <= 0) {
    return "white" // Example color for index <= 0
  } else if (value <= 12) {
    return "green" // Good
  } else if (value <= 35.4) {
    return "yellow" // Moderate
  } else if (value <= 55.4) {
    return "orange" // Unhealthy for Sensitive Groups
  } else if (value <= 150.4) {
    return "red" // Unhealthy
  } else if (value <= 250.4) {
    return "purple" // Very Unhealthy
  } else {
    return "black" // Hazardous
  }
}

const SensorMarkers = ({
  sensorData,
  isRealTime,
  onMarkerClick,
}: {
  sensorData: SensorData[]
  isRealTime: boolean
  onMarkerClick: (data: SensorData) => void
}) => {
  console.log("sensorData", sensorData)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sensorData.length > 0) {
      setIsLoading(false)
    }
  }, [sensorData])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {sensorData.map((data, index) => {
        const position: LatLngExpression = [
          data.device?.positions.lati ?? 0,
          data?.device?.positions.lngi ?? 0,
        ]
        if (isRealTime && (index === 0 || index === sensorData.length - 1)) {
          return (
            <Marker
              key={data._id}
              position={position}
              icon={L.icon({
                iconUrl:
                  "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
                shadowUrl:
                  "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
              })}
            >
              <Popup>
                <div>
                  <p>
                    <p>
                      {data.kei === "0"
                        ? "PM2.5"
                        : data.kei === "1"
                          ? "Humidity"
                          : data.kei === "2"
                            ? "Temperature"
                            : "Unknown"}
                    </p>
                  </p>
                  <p>Value: {data.value}</p>
                  <p>Latitude: {data.position.lati}</p>
                  <p>Longitude: {data.position.lngi}</p>
                </div>
              </Popup>
            </Marker>
          )
        } else {
          return (
            <CircleMarker
              key={data._id}
              center={position}
              radius={isRealTime ? 8 : 10} // Increased radius for better visibility
              pathOptions={{
                color: getColor(data.value),
                fillColor: isRealTime ? "blue" : getColor(data.value),
                fillOpacity: 1,
                weight: 10, 
              }}
              eventHandlers={{
                click: () => onMarkerClick(data),
              }}
            ></CircleMarker>
          )
        }
      })}
    </>
  )
}

const PathWithColor = ({ positions }: { positions: Position[] }) => {
  const path = positions.map((pos) => [pos.lati, pos.lngi] as LatLngExpression)

  return (
    <Polyline positions={path} pathOptions={{ color: "blue", weight: 3 }} />
  )
}

const SocketMap = ({ initialSensorData, realtimeSensorData }: MapProps) => {
  const [selectedSensorData, setSelectedSensorData] =
    useState<SensorData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    // Configure Leaflet default icon options
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.6/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
    })
  }, [])

  const handleMarkerClick = (data: SensorData) => {
    setSelectedSensorData(data)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setSelectedSensorData(null)
  }

  return (
    <>
      <MapContainer
        center={[27.6710851, 85.3357824]}
        zoom={13}
        style={{ height: "80vh", width: "100%", zIndex: "0" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SensorMarkers
          sensorData={initialSensorData}
          isRealTime={false}
          onMarkerClick={handleMarkerClick}
        />
        <SensorMarkers
          sensorData={realtimeSensorData}
          isRealTime={true}
          onMarkerClick={handleMarkerClick}
        />
        {realtimeSensorData.length > 0 && (
          <PathWithColor
            positions={realtimeSensorData.map((data) => data.position)}
          />
        )}
      </MapContainer>

      {selectedSensorData && (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent className="z-50 h-full w-full min-w-full p-20">
            <DialogHeader>
              <DialogTitle>Sensor Data</DialogTitle>
              <DialogDescription>
                Detailed view of the sensor data.
              </DialogDescription>
            </DialogHeader>
            <div className="h-full w-full">
              <LineChartComponent
                sensorData={[...initialSensorData, ...realtimeSensorData]}
              />
            </div>
            <DialogFooter>
              <Button onClick={closeDialog}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default SocketMap

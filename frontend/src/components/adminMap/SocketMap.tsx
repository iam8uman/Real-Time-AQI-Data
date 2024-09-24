// import React, { useEffect, useRef, useState } from "react"

// import "leaflet/dist/leaflet.css"

// import { fetchSensorData } from "@/actions/fetchSensorData"
// import axios from "axios"
// import L from "leaflet"

// const OSMap2: React.FC = () => {
//   const mapRef = useRef<L.Map | any>(null)
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [sensorData, setSensorData] = useState<any[]>([])
//   const [stationeryData, setStationeryData] = useState<any[]>([])
//   const intervalRef = useRef<number | null>(null)
//   const stationeryIntervalRef = useRef<number | null>(null)

//   useEffect(() => {
//     if (!mapRef.current) {
//       mapRef.current = L.map("map", {
//         center: [27.695297, 85.271747],
//         zoom: 15,
//         zoomControl: false,
//       })

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(mapRef.current)
//     }

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove()
//         mapRef.current = null
//       }
//       if (intervalRef.current !== null) {
//         clearInterval(intervalRef.current)
//       }
//       if (stationeryIntervalRef.current !== null) {
//         clearInterval(stationeryIntervalRef.current)
//       }
//     }
//   }, [])

//   useEffect(() => {
//     const fetchSensorData = async () => {
//       try {
//         const response = await axios.get(
//           "http://159.65.157.137/sensorDatas/list/filter",
//           {
//             params: {
//               page: 1,
//               limit: 100,
//               sortBy: "timestamp",
//               sortOrder: "desc",
//             },
//           }
//         )
//         console.log("Fetched sensor data:", response.data.data)
//         setSensorData(response.data.data)
//       } catch (error) {
//         console.error("Error fetching sensor data:", error)
//       }
//     }

//     fetchSensorData()
//     intervalRef.current = window.setInterval(fetchSensorData, 20000)

//     return () => {
//       if (intervalRef.current !== null) {
//         clearInterval(intervalRef.current)
//       }
//     }
//   }, [])

//   useEffect(() => {
//     const fetchStationeryData = async () => {
//       const { sensorDataValue } = await fetchSensorData(undefined, [
//         "device.type=eq_STATIONERY",
//       ])
//       setStationeryData(sensorDataValue)
//     }

//     fetchStationeryData()
//     stationeryIntervalRef.current = window.setInterval(
//       fetchStationeryData,
//       120000
//     )

//     return () => {
//       if (stationeryIntervalRef.current !== null) {
//         clearInterval(stationeryIntervalRef.current)
//       }
//     }
//   }, [])

//   useEffect(() => {
//     const updateMap = () => {
//       if (currentIndex >= sensorData.length) return

//       const currentPoint = sensorData[currentIndex]
//       if (!currentPoint || !currentPoint.position) {
//         console.error("Current point or current point.position is undefined", {
//           currentPoint,
//           currentIndex,
//         })
//         return
//       }

//       const coordinates: [number, number] = [
//         currentPoint.position.lati,
//         currentPoint.position.lngi,
//       ]

//       if (currentIndex > 0) {
//         const previousPoint = sensorData[currentIndex - 1]
//         const prevCoordinates: [number, number] = [
//           previousPoint.position.lati,
//           previousPoint.position.lngi,
//         ]

//         const avgPMValue = calculateAveragePM(
//           previousPoint.value,
//           currentPoint.value
//         )
//         const color = getColorBasedOnPM(avgPMValue)

//         L.polyline([prevCoordinates, coordinates], {
//           color: color,
//           weight: 5,
//           opacity: 0.7,
//         }).addTo(mapRef.current)
//       }

//       const marker = L.circleMarker(coordinates, {
//         radius: 5,
//         color: getColorBasedOnPM(currentPoint.value),
//       }).addTo(mapRef.current)

//       marker.bindTooltip(`PM2.5: ${currentPoint.value}`).openTooltip()

//       if (currentIndex === 0) {
//         mapRef.current.fitBounds(L.featureGroup([marker]).getBounds())
//       }
//     }

//     updateMap()

//     if (currentIndex < sensorData.length - 1) {
//       intervalRef.current = window.setInterval(() => {
//         setCurrentIndex((prevIndex) => prevIndex + 1)
//       }, 10000)
//     }

//     return () => {
//       if (intervalRef.current !== null) {
//         clearInterval(intervalRef.current)
//       }
//     }
//   }, [currentIndex, sensorData])

//   useEffect(() => {
//     const updateStationeryData = () => {
//       if (!Array.isArray(stationeryData)) {
//         console.error("Stationery data is not an array", { stationeryData })
//         return
//       }

//       stationeryData.forEach((point) => {
//         if (point && point.value) {
//           const coordinates: [number, number] = [27.695323, 85.272303]
//           const radius = 50

//           const circle = L.circle(coordinates, {
//             radius: radius,
//             color: getColorBasedOnPM(point.value),
//             weight: 1,
//             fillOpacity: 0.5,
//           }).addTo(mapRef.current)

//           circle.bindTooltip(`Stationery PM2.5: ${point.value}`).openTooltip()
//         }
//       })
//     }

//     updateStationeryData()
//   }, [stationeryData])

//   const calculateAveragePM = (pmStart: number, pmEnd: number) => {
//     return (pmStart + pmEnd) / 2
//   }

//   const getColorBasedOnPM = (pmValue: number) => {
//     if (pmValue <= 50) return "green"
//     else if (pmValue <= 100) return "orange"
//     else return "red"
//   }

//   return <div id="map" style={{ height: "80vh", width: "100%" }} />
// }

// export default OSMap2
import React, { useEffect } from "react"
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
  // if (value > 150) return 'red';

  // if (value > 100) return 'orange';
  // if (value > 50) return 'yellow';
  // return 'green';
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
}: {
  sensorData: SensorData[]
  isRealTime: boolean
}) => {
  return (
    <>
      {sensorData.map((data, index) => {
        const position: LatLngExpression = [
          data.position.lati,
          data.position.lngi,
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
                  {/* <p>Timestamp: {new Date(data.timestamp).toLocaleString()}</p> */}
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
              radius={isRealTime ? 6 : 8}
              pathOptions={{
                color: getColor(data.value),
                fillColor: isRealTime ? "blue" : getColor(data.value),
                fillOpacity: 1,
              }}
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
                  {/* <p>Timestamp: {new Date(data.timestamp).toLocaleString()}</p> */}
                  <p>Latitude: {data.position.lati}</p>
                  <p>Longitude: {data.position.lngi}</p>
                </div>
              </Popup>
            </CircleMarker>
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

  return (
    <MapContainer
      center={[27.6710851, 85.3357824]}
      zoom={13}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SensorMarkers sensorData={initialSensorData} isRealTime={false} />
      <SensorMarkers sensorData={realtimeSensorData} isRealTime={true} />
      {realtimeSensorData.length > 0 && (
        <PathWithColor
          positions={realtimeSensorData.map((data) => data.position)}
        />
      )}
    </MapContainer>
  )
}

export default SocketMap

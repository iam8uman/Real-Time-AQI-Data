// "use client"

// import React, { useEffect, useRef } from "react"
// import "leaflet/dist/leaflet.css"
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Flag, MapPin } from "lucide-react"

// let L: any
// if (typeof window !== "undefined") {
//   L = require("leaflet")
//   require("leaflet-routing-machine")
// }

// // Function to generate a random point within a radius (in km) from a given point
// const getRandomPoint = (latitude: number, longitude: number, radiusKm: number) => {
//   const radius = radiusKm * 1000 // convert km to meters
//   const y0 = latitude
//   const x0 = longitude
//   const rd = radius / 111300 // approximate radius in degrees

//   const u = Math.random()
//   const v = Math.random()
//   const w = rd * Math.sqrt(u)
//   const t = 2 * Math.PI * v
//   const x = w * Math.cos(t)
//   const y = w * Math.sin(t)

//   // Adjust the x-coordinate for the shrinking of the east-west distances
//   const new_x = x / Math.cos(y0)

//   const foundLatitude = y + y0
//   const foundLongitude = new_x + x0

//   return [foundLatitude, foundLongitude]
// }

// const Page: React.FC = () => {
//   const mapRef = useRef(null)

//   useEffect(() => {
//     if (L && !mapRef.current) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           if (!mapRef.current) {
//             const { latitude, longitude } = position.coords
//             mapRef.current = L.map("map").setView([latitude, longitude], 14)

//             const osm = L.tileLayer(
//               "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//               {
//                 attribution:
//                   '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//               }
//             )
//             osm.addTo(mapRef.current)

//             const [endLat, endLng] = getRandomPoint(latitude, longitude, 2)

//             const startIcon = L.divIcon({
//               html: `<div style="color: red;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">${MapPin}</svg></div>`,
//               className: 'custom-div-icon'
//             })

//             const endIcon = L.divIcon({
//               html: `<div style="color: green;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">${Flag}</svg></div>`,
//               className: 'text-xl'
//             })

//             L.marker([latitude, longitude], { icon: startIcon }).addTo(mapRef.current).bindPopup("Start Position")
//             L.marker([endLat, endLng], { icon: endIcon }).addTo(mapRef.current).bindPopup("End Position")



//             L.Routing.control({
//               waypoints: [
//                 L.latLng(latitude, longitude),
//                 L.latLng(endLat, endLng)
//               ],
//               routeWhileDragging: true,
//             }).addTo(mapRef.current)
//           }
//         })
//       }
//     }

//     // Cleanup function
//     return () => {
//       if (mapRef.current) {
//         (mapRef.current as L.Map).remove()
//       }
//     }
//   }, [])

//   return (
//     <ScrollArea className="min-h-full">
//       <div id="map" style={{ height: "100vh", width: "100%" }} />
//     </ScrollArea>
//   )
// }

// export default Page
"use client"

import React, { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import { ScrollArea } from "@/components/ui/scroll-area"
import { renderToString } from "react-dom/server"
import { Flag, MapPin } from "lucide-react"

let L: any
if (typeof window !== "undefined") {
  L = require("leaflet")
  require("leaflet-routing-machine")
}

// Function to generate a random point within a radius (in km) from a given point
const getRandomPoint = (latitude: number, longitude: number, radiusKm: number) => {
  const radius = radiusKm * 1000 // convert km to meters
  const y0 = latitude
  const x0 = longitude
  const rd = radius / 111300 // approximate radius in degrees

  const u = Math.random()
  const v = Math.random()
  const w = rd * Math.sqrt(u)
  const t = 2 * Math.PI * v
  const x = w * Math.cos(t)
  const y = w * Math.sin(t)

  // Adjust the x-coordinate for the shrinking of the east-west distances
  const new_x = x / Math.cos(y0)

  const foundLatitude = y + y0
  const foundLongitude = new_x + x0

  return [foundLatitude, foundLongitude]
}

const RoutesPage: React.FC = () => {
  const mapRef = useRef(null)

  useEffect(() => {
    if (L && !mapRef.current) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          if (!mapRef.current) {
            const { latitude, longitude } = position.coords
            mapRef.current = L.map("map").setView([latitude, longitude], 14)

            const osm = L.tileLayer(
              "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              {
                attribution:
                  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              }
            )
            osm.addTo(mapRef.current)

            const [endLat, endLng] = getRandomPoint(latitude, longitude, 2)

            const startIcon = L.divIcon({
              html: renderToString(<MapPin color="red" width={24} height={24} />),
              className: 'custom-div-icon'
            })

            const endIcon = L.divIcon({
              html: renderToString(<Flag color="green" width={24} height={24} />),
              className: 'custom-div-icon'
            })

            L.marker([latitude, longitude], { icon: startIcon }).addTo(mapRef.current).bindPopup("Start Position")
            L.marker([endLat, endLng], { icon: endIcon }).addTo(mapRef.current).bindPopup("End Position")

            L.Routing.control({
              waypoints: [
                L.latLng(latitude, longitude),
                L.latLng(endLat, endLng)
              ],
              routeWhileDragging: true,
              createMarker: () => null, // Prevents default markers between start and end positions

            }).addTo(mapRef.current)
          }
        })
      }
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        (mapRef.current as L.Map).remove()
      }
    }
  }, [])

  return (
    <ScrollArea className="min-h-full">
      <div id="map" style={{ height: "100vh", width: "100%" }} />
    </ScrollArea>
  )
}

export default RoutesPage

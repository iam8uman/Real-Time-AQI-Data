"use client"

import React, { useEffect, useRef, useState } from "react"

import "leaflet/dist/leaflet.css"

import axios from "axios"
import { fetchSensorData } from "@/actions/fetchSensorData"

let L: any
if (typeof window !== "undefined") {
  L = require("leaflet")
  require("leaflet.heat/dist/leaflet-heat.js")
}

const getRandomCoordinates = () => ({
  lat: 27.7 + (Math.random() - 0.5) * 0.02, // Random latitude around a central point
  lng: 85.3 + (Math.random() - 0.5) * 0.02, // Random longitude around a central point
})

const HeatMapAdmin = () => {
  const mapRef = useRef<L.Map | null>(null)
  const [stationeryData, setStationeryData] = useState<any[]>([])

  useEffect(() => {
    const fetchStationeryData = async () => {
      try {
        const { sensorDataValue } = await fetchSensorData(undefined, ["device.type=eq_STATIONERY"]);
        setStationeryData(sensorDataValue);
      } catch (error) {
        console.error("Error fetching stationery data:", error);
      }
    }
  
    fetchStationeryData();
    const intervalId = setInterval(fetchStationeryData, 120000);
  
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (L && !mapRef.current) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords
          if (mapRef.current) {
            // If the map is already initialized, just update the view
            mapRef.current.setView([latitude, longitude], 10)
          } else {
            // If the map is not initialized, create a new one
            mapRef.current = L.map("map").setView([latitude, longitude], 10)
          }
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(mapRef.current)
        })
      }
    }

    if (mapRef.current && stationeryData.length > 0) {
      const points = stationeryData.map((item) => {
        const { kei, value, device, userId } = item
        let { lat, lng } = device.positions.length
          ? device.positions[0]
          : getRandomCoordinates()
        let intensity

        switch (kei) {
          case "0":
            intensity = value < 60 ? 0.3 : value < 120 ? 0.6 : 1.0
            break
          case "1":
          case "2":
          default:
            intensity = (value / 100).toFixed(2)
            break
        }

        // Adjust color based on value
        const color =
          value < 60
            ? "green"
            : value < 120
              ? "blue"
              : value < 180
                ? "orange"
                : "red"

        const marker = L.circleMarker([lat, lng], {
          radius: 8,
          fillColor: color,
          color: "black",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        }).addTo(mapRef.current)

        // Create popup content with KEI value, Device Serial No, and userId
        const popupContent = `
           <div>
             <p>Polution Index Value: ${value}</p>
             <p>Device Serial No: ${device.serialNo}</p>
             <p>User ID: ${userId}</p>
           </div>
         `

        marker.bindPopup(popupContent)

        return [lat, lng, intensity]
      })

      const heatLayer = L.heatLayer(points, { radius: 35, maxZoom: 17 })
      heatLayer.addTo(mapRef.current)

      // Clear and update the heat layer
      return () => {
        if (mapRef.current) {
          mapRef.current.eachLayer((layer: any) => {
            if (layer instanceof L.TileLayer || layer instanceof L.HeatLayer) {
              return
            }
            mapRef.current?.removeLayer(layer)
          })
        }
      }
    }
  }, [stationeryData])

  return <div id="map" style={{ height: "80vh", width: "100%" }} />
}

export default HeatMapAdmin

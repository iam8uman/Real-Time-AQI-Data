'use client'

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L, { LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the video overlay component
const VideoOverlay: React.FC = () => {
  const videoUrls = [
    'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
    'https://www.mapbox.com/bites/00188/patricia_nasa.mp4'
  ];
  const latLngBounds: LatLngBoundsExpression = [[32, -130], [13, -100]];
  const errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';

  const map = useMap();

  useEffect(() => {
    const videoOverlay = L.videoOverlay(videoUrls, latLngBounds, {
      opacity: 0.8,
      errorOverlayUrl: errorOverlayUrl,
      interactive: true,
      autoplay: true,
      muted: true,
      playsInline: true
    }).addTo(map);

    // Add play/pause controls
    videoOverlay.on('load', () => {
      const MyPauseControl = L.Control.extend({
        onAdd: function () {
          const button = L.DomUtil.create('button');
          button.title = 'Pause';
          button.innerHTML = '<span aria-hidden="true">⏸</span>';
          L.DomEvent.on(button, 'click', () => {
            videoOverlay.getElement()?.pause();
          });
          return button;
        }
      });

      const MyPlayControl = L.Control.extend({
        onAdd: function () {
          const button = L.DomUtil.create('button');
          button.title = 'Play';
          button.innerHTML = '<span aria-hidden="true">▶️</span>';
          L.DomEvent.on(button, 'click', () => {
            videoOverlay.getElement()?.play();
          });
          return button;
        }
      });

      const pauseControl = new MyPauseControl();
      const playControl = new MyPlayControl();

      map.addControl(pauseControl);
      map.addControl(playControl);
    });

    // Clean up the overlay when the component unmounts
    return () => {
      map.removeLayer(videoOverlay);
    };
  }, [map, videoUrls, latLngBounds, errorOverlayUrl]);

  return null;
};

// Define the main map component
const VideoOverlayMap: React.FC = () => {
  return (
    <MapContainer center={[37.8, -96]} zoom={4} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <VideoOverlay />
    </MapContainer>
  );
};

export default VideoOverlayMap;

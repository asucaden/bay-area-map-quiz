import React from 'react'
import { Marker, Polyline } from 'react-leaflet'

interface MapMarkersProps {
  guessLat: number
  guessLng: number
  actualLat: number
  actualLng: number
}

export const MapMarkers: React.FC<MapMarkersProps> = ({
  guessLat,
  guessLng,
  actualLat,
  actualLng,
}) => (
  <>
    <Marker position={[guessLat, guessLng]} />
    <Marker position={[actualLat, actualLng]} />
    <Polyline
      positions={[
        [guessLat, guessLng],
        [actualLat, actualLng],
      ]}
    />
  </>
)

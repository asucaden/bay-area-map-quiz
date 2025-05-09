import React from 'react'
import L from 'leaflet'
import { useMapEvents } from 'react-leaflet'
import type { Place } from '../types/place'

interface ClickHandlerProps {
  currentPlace: Place
  onGuess: (lat: number, lng: number, distance: number) => void
  disabled: boolean
}

export const ClickHandler: React.FC<ClickHandlerProps> = ({
  currentPlace,
  onGuess,
  disabled,
}) => {
  useMapEvents({
    click(e) {
      if (disabled) return
      const { lat, lng } = e.latlng
      const distance = L.latLng(lat, lng).distanceTo([
        currentPlace.lat,
        currentPlace.lng,
      ])
      onGuess(lat, lng, distance)
    },
  })
  return null
}

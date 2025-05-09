import { useEffect, useState } from 'react'

export type Place = {
  name: string
  lat: number
  lng: number
}

export const usePlaces = () => {
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPlaces = async () => {
      const res = await fetch('/places.json')
      const data = await res.json()
      setPlaces(data)
      setLoading(false)
    }

    loadPlaces()
  }, [])

  const getRandomPlace = (): Place | null => {
    if (places.length === 0) return null
    return places[Math.floor(Math.random() * places.length)]
  }

  return { places, loading, getRandomPlace }
}

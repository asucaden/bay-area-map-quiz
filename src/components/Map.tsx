import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'
import { useGame } from '../hooks/useGame'
import { calculateScore } from '../utils/calculateScore'
import { ScoreDisplay } from './ScoreDisplay'
import { MapMarkers } from './MapMarkers'
import { Controls } from './Controls'
import { ClickHandler } from './ClickHandler'
import type { Place } from '../types/place'
import '../fix-leaflet'

function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const regionConfig: Record<string, { file: string; center: [number, number] }> =
  {
    'Bay Area': {
      file: '/places/bay-area-coords.json',
      center: [37.7749, -122.4194],
    },
    'Dallas–Fort Worth': {
      file: '/places/dfw-coords.json',
      center: [32.7757, -96.7967],
    },
    Nashville: {
      file: '/places/nashville-coords.json',
      center: [36.1627, -86.7816],
    },
    Phoenix: { file: '/places/phx-coords.json', center: [33.4484, -112.074] },
    'Puget Sound': {
      file: '/places/puget-sound-coords.json',
      center: [47.6062, -122.3321],
    },
  }

const Map: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('Bay Area')
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const [center, setCenter] = useState<[number, number]>(
    regionConfig['Bay Area'].center
  )
  const [hardMode, setHardMode] = useState(false)

  // Load places whenever region changes
  useEffect(() => {
    const cfg = regionConfig[selectedRegion]
    setLoading(true)
    setCenter(cfg.center)
    fetch(cfg.file)
      .then((res) => res.json())
      .then((data: Place[]) => {
        const shuffled = shuffleArray(data)
        setPlaces(shuffled)
        resetGame()
        setLoading(false)
      })
  }, [selectedRegion])

  const {
    currentPlace,
    totalScore,
    guesses,
    submitGuess,
    nextRound,
    resetGame,
    round,
  } = useGame(places)
  const lastGuess = guesses[guesses.length - 1]
  const hasGuessed = Boolean(lastGuess && lastGuess.place === currentPlace)

  const handleGuess = (lat: number, lng: number, distance: number) => {
    const score = calculateScore(distance)
    submitGuess(lat, lng, distance, score)
  }

  return (
    <div className="map-wrapper">
      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        {Object.keys(regionConfig).map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <label style={{ margin: '8px 0', display: 'block', color: '#f5f5f5' }}>
        <input
          type="checkbox"
          checked={hardMode}
          onChange={() => setHardMode(!hardMode)}
          style={{ marginRight: '8px' }}
        />
        Hard Mode (no labels)
      </label>
      {!loading && currentPlace && (
        <MapContainer center={center} zoom={11} className="leaflet-container">
          <TileLayer
            url={
              hardMode
                ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'
                : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            }
            attribution={
              hardMode
                ? '&copy; OpenStreetMap contributors &copy; CARTO'
                : '&copy; OpenStreetMap contributors'
            }
          />
          <ClickHandler
            currentPlace={currentPlace}
            onGuess={handleGuess}
            disabled={hasGuessed}
          />
          {hasGuessed && lastGuess && (
            <MapMarkers
              guessLat={lastGuess.pickedLat}
              guessLng={lastGuess.pickedLng}
              actualLat={lastGuess.place.lat}
              actualLng={lastGuess.place.lng}
            />
          )}
        </MapContainer>
      )}

      <div className="card">
        <h2>
          {loading
            ? 'Loading…'
            : currentPlace
              ? `Round ${round}: Where is ${currentPlace.name}?`
              : 'Ready!'}
        </h2>

        <ScoreDisplay totalScore={totalScore} lastGuess={lastGuess} />

        <Controls onNext={nextRound} disabled={!hasGuessed} />
      </div>
    </div>
  )
}

export default Map

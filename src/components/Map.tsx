import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'
import { usePlaces } from '../hooks/usePlaces'
import { useGame } from '../hooks/useGame'
import { calculateScore } from '../utils/calculateScore'
import { ScoreDisplay } from './ScoreDisplay'
import { MapMarkers } from './MapMarkers'
import { Controls } from './Controls'
import { ClickHandler } from './ClickHandler'

const Map: React.FC = () => {
  const { loading, places } = usePlaces()
  const { currentPlace, totalScore, guesses, submitGuess, nextRound, round } =
    useGame(places || [])
  const lastGuess = guesses[guesses.length - 1]
  const hasGuessed = Boolean(lastGuess && lastGuess.place === currentPlace)

  const handleGuess = (lat: number, lng: number, distance: number) => {
    const score = calculateScore(distance)
    submitGuess(lat, lng, distance, score)
  }

  return (
    <div className="map-wrapper">
      {!loading && currentPlace && (
        <MapContainer
          center={[37.7749, -122.4194]}
          zoom={12}
          className="leaflet-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
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

import React from 'react'
import type { Guess } from '../types/place'

interface ScoreDisplayProps {
  totalScore: number
  lastGuess?: Guess
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  totalScore,
  lastGuess,
}) => (
  <div className="score-display">
    <h2>Total Score: {totalScore}</h2>
    {lastGuess && (
      <p>
        Last: {lastGuess.place.name} — {lastGuess.score} pts (
        {Math.round(lastGuess.distance)} m)
      </p>
    )}
  </div>
)

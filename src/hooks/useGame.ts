import { useState } from 'react'
import type { Place, Guess } from '../types/place'

export function useGame(places: Place[]) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [guesses, setGuesses] = useState<Guess[]>([])

  const currentPlace = places[currentIndex]

  function submitGuess(
    pickedLat: number,
    pickedLng: number,
    distance: number,
    score: number
  ) {
    const guess: Guess = {
      place: currentPlace,
      pickedLat,
      pickedLng,
      distance,
      score,
    }
    setGuesses((prev) => [...prev, guess])
    setTotalScore((prev) => prev + score)
  }

  function nextRound() {
    setCurrentIndex((prev) => Math.min(prev + 1, places.length - 1))
  }

  return {
    currentPlace,
    totalScore,
    guesses,
    submitGuess,
    nextRound,
    round: currentIndex + 1,
  }
}

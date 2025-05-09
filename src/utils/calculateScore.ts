const FULL_POINTS_DISTANCE = 300 // meters within which you get max points
const MAX_DISTANCE = 10000 // distance at which score is zero
const MAX_POINTS = 1000 // maximum points per round

export function calculateScore(distance: number): number {
  if (distance <= FULL_POINTS_DISTANCE) {
    return MAX_POINTS
  } else if (distance >= MAX_DISTANCE) {
    return 0
  }
  const fraction =
    (distance - FULL_POINTS_DISTANCE) / (MAX_DISTANCE - FULL_POINTS_DISTANCE)
  return Math.round(MAX_POINTS * (1 - fraction))
}

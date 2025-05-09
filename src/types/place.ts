export interface Place {
  name: string
  lat: number
  lng: number
}
export interface Guess {
  place: Place
  pickedLat: number
  pickedLng: number
  distance: number
  score: number
}

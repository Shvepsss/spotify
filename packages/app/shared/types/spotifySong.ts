import { SPOTIFY_SONGS_STATUSES } from '../constants'
export type SpotifySong = {
  id: string
  name: string
  author: string
  status: (typeof SPOTIFY_SONGS_STATUSES)[keyof typeof SPOTIFY_SONGS_STATUSES]
  coverImageUrl: string
  album: string
  songUrl: string
}

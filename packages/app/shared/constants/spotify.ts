export const SPOTIFY_SONGS_STATUSES = {
  download: 'download',
  downloaded: 'downloaded',
}
export type SpotifySongStatus =
  (typeof SPOTIFY_SONGS_STATUSES)[keyof typeof SPOTIFY_SONGS_STATUSES]

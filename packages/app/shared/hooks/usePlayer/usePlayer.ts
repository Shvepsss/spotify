import React from 'react'
import { Howl } from 'howler'

type PlaylistInfo = { soundId: number; songUrl: string; howl: Howl }[]

type SongMeta = {
  duration: number
  secondsPlayed: number
}

export const usePlayer = () => {
  const [playlistInfo, setPlaylistInfo] = React.useState<PlaylistInfo>([])
  const [activeSoundId, setActiveSoundId] = React.useState<number | null>(null)
  const [songMeta, setSongMeta] = React.useState<SongMeta | null>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const activeSong = React.useMemo(
    () => playlistInfo.find((songItem) => songItem.soundId === activeSoundId),
    [activeSoundId, playlistInfo]
  )

  const progress = songMeta
    ? Math.min(songMeta.secondsPlayed / songMeta.duration, 1)
    : 0

  const toggleSongPlayer = React.useCallback((song: PlaylistInfo[number]) => {
    const isPlaying = song.howl.playing()
    setActiveSoundId(song.soundId)

    if (isPlaying) {
      song.howl.pause()
      setIsPlaying(false)
      return
    }

    song.howl.play()

    setIsPlaying(true)
  }, [])

  const playNewSong = React.useCallback(
    (songUrl: string) => {
      const existingSong = playlistInfo.find(
        (songItem) => songItem.songUrl === songUrl
      )

      if (activeSong && activeSong?.soundId !== existingSong?.soundId) {
        activeSong.howl.stop()
      }

      if (existingSong) {
        toggleSongPlayer(existingSong)
        return
      }

      const newSong = new Howl({
        src: songUrl,
        preload: true,
        html5: true,
        autoplay: true,
        onplay: (soundId) => {
          setPlaylistInfo((_currentPlaylist) => [
            ..._currentPlaylist,
            { songUrl, howl: newSong, soundId },
          ])
          setActiveSoundId(soundId)
          setIsPlaying(true)
        },
        onend: (soundId) => {
          setActiveSoundId((_currentSoundId) => {
            if (_currentSoundId === soundId) {
              setIsPlaying(false)
              return null
            }

            return _currentSoundId
          })
        },
      })
    },
    [activeSong, playlistInfo, toggleSongPlayer]
  )

  React.useEffect(() => {
    if (!activeSong) {
      setSongMeta(null)
      return
    }

    const updateSongMeta = () => {
      const duration = activeSong.howl.duration()
      const secondsPlayed = parseFloat(activeSong.howl.seek().toFixed(1))

      setSongMeta((_currentMeta) => {
        if (_currentMeta?.secondsPlayed === secondsPlayed) {
          return _currentMeta
        }

        return { duration, secondsPlayed }
      })

      requestAnimationFrame(updateSongMeta)
    }

    const animationFrame = requestAnimationFrame(updateSongMeta)

    return () => cancelAnimationFrame(animationFrame)
  }, [activeSong])

  return {
    playNewSong,
    activeSong,
    songMeta,
    progress,
    isPlaying,
    toggleSongPlayer,
  }
}

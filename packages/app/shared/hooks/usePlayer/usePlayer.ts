import React from 'react'
import { Howl } from 'howler'
import { SpotifySong } from 'app/shared/types/spotifySong'
import { View, PressableProps } from 'app/shared/components/ui'

export type PlaylistInfoItem = {
  soundId: number
  howl: Howl
  data: SpotifySong
}
export type PlaylistInfo = PlaylistInfoItem[]

export type SongMeta = {
  duration: number
  secondsPlayed: number
}

export const usePlayer = () => {
  // place of playing/played songs stored
  const [playlistHistory, setPlaylistHistory] = React.useState<PlaylistInfo>([])
  // Howl instance ID currently selected.
  const [activeSoundId, setActiveSoundId] = React.useState<number | null>(null)
  // storage of song's data (duration and how many seconds have already been played)
  const [songMeta, setSongMeta] = React.useState<SongMeta | null>(null)
  // is song playing or not
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isLoop, setIsLoop] = React.useState(false)
  const [isShuffle, setIsShuffle] = React.useState(false)

  //searching trough the array to check if the selected song's id is equals to id of playing song
  const activeSong = React.useMemo(
    () =>
      playlistHistory.find((songItem) => songItem.soundId === activeSoundId),
    [activeSoundId, playlistHistory]
  )

  const handlePress = React.useCallback(
    (e: PressableProps, progressBarRef: React.RefObject<View>) => {
      console.log(
        'activeSong',
        activeSong,
        'songMeta',
        songMeta,
        'progressBarRef',
        progressBarRef
      )
      if (activeSong && songMeta) {
        progressBarRef.current?.measure((_x, _y, progressBarWidth) => {
          console.log('progressBarRef', progressBarRef)
          // locationX only exists in native, offsetX is for web
          const locationX =
            // @ts-expect-error
            e.nativeEvent.locationX || e.nativeEvent.layerX || 0
          const newPlaybackPositionRatio = locationX / progressBarWidth
          console.log(newPlaybackPositionRatio)
          const newSeconds = songMeta.duration * newPlaybackPositionRatio
          console.log(newSeconds)
          activeSong.howl.seek(newSeconds, activeSong.soundId)
        })
      }
    },
    [activeSong, songMeta]
  )
  // calculate the percentage of the song played to display on the progress bar
  const progress = songMeta
    ? Math.min(songMeta.secondsPlayed / songMeta.duration, 1)
    : 0
  // check whether the song is currently playing or not and set its id as active song's id
  const toggleSongPlayer = React.useCallback((song: PlaylistInfo[number]) => {
    const isPlaying = song.howl.playing()
    setActiveSoundId(song.soundId)
    // if the toogleSongPlayer was called on the song which is currently playing then we pause the song
    if (isPlaying) {
      song.howl.pause()
      setIsPlaying(false)
      return
    }
    //otherwise we play it and update 'isPlaying' state accordingly
    song.howl.play()
    setIsPlaying(true)
  }, [])
  //we're searching through the array and check whether array contains selected song
  const playNewSong = React.useCallback(
    (data: SpotifySong) => {
      // console.log()
      const songId = data.id
      const existingSong = playlistHistory.find(
        (songItem) => songItem.data.id === songId
      )
      // if currently playing song and its ID aren't equal to exesting song  - we stop currently playing song
      if (activeSong && activeSong?.soundId !== existingSong?.soundId) {
        activeSong.howl.stop()
        console.log('stop')
      }
      // if currently playing song is the same as existing (pressed) song - we toggle its state
      if (existingSong) {
        toggleSongPlayer(existingSong)
        console.log('pause')
        return
      }
      //otherwise we create new Howl instance for selected song
      const newSong = new Howl({
        src: data.songUrl,
        preload: true,
        html5: true,
        autoplay: true,
        //when the song begins playing we update the array with data of this song and update states accordingly
        onplay: (soundId) => {
          setPlaylistHistory((_currentPlaylist) => {
            const currentPlaylist = _currentPlaylist.filter(
              (currentSong) =>
                currentSong.soundId !== soundId &&
                currentSong.data.id !== data.id
            )
            return [...currentPlaylist, { howl: newSong, soundId, data }]
          })
          setActiveSoundId(soundId)
          setIsPlaying(true)
        },
        //when the song stops playing we check currently playing song's id and the song's id  , in case they're equal - we update the 'playing' state accordingly
        onend: (soundId) => {
          if (isLoop && activeSong?.soundId === soundId) {
            activeSong?.howl.seek(0)
            return
          } else {
            setActiveSoundId((_currentSoundId) => {
              if (_currentSoundId === soundId) {
                setIsPlaying(false)
                return null
              }

              return _currentSoundId
            })
          }
        },
      })
    },

    [activeSong, playlistHistory, toggleSongPlayer, activeSoundId, isLoop]
  )
  // if we have no active song we reset the data to zero , so the song bar doesn't show any progress
  React.useEffect(() => {
    if (!activeSong) {
      setSongMeta(null)
      return
    }
    // otherwise we set song's data  -  its duration and left seconds to play
    const updateSongMeta = () => {
      const duration = activeSong.howl.duration()
      const secondsPlayed = parseFloat(activeSong.howl.seek().toFixed(1))
      // if last data's left seconds are the same as the current left seconds we left data the same
      setSongMeta((_currentMeta) => {
        if (_currentMeta?.secondsPlayed === secondsPlayed) {
          return _currentMeta
        }
        //otherwise we update the data
        return { duration, secondsPlayed }
      })
      // this function provoke updateSongMeta function after rerender
      requestAnimationFrame(updateSongMeta)
    }
    // this function is provoked before rerender
    const animationFrame = requestAnimationFrame(updateSongMeta)
    // after the activSong has been cnanged we cancel perfomance of cancelAnimationFrame as it will update wrong song's data
    return () => cancelAnimationFrame(animationFrame)
  }, [activeSong])

  const togglePlay = React.useCallback(
    (song: SpotifySong) => {
      playNewSong(song)
    },
    [activeSong, toggleSongPlayer, playNewSong]
  )
  const getRandomIndex = (spotifySongs: SpotifySong[]) => {
    return Math.floor(Math.random() * spotifySongs.length)
  }
  const playSongAtIndex = (spotifySongs: SpotifySong[], index: number) => {
    if (index < 0 || index >= spotifySongs.length) return
    const nextSong = spotifySongs[index]
    if (nextSong) togglePlay(nextSong)
  }

  const playnextSong = (spotifySongs: SpotifySong[]) => {
    const currentIndex = spotifySongs.findIndex(
      (song) => song.id === activeSong?.data.id
    )
    if (isShuffle) {
      const randomIndex = getRandomIndex(spotifySongs)
      const nextIndex =
        randomIndex === currentIndex
          ? (randomIndex + 1) % spotifySongs.length
          : randomIndex
      playSongAtIndex(spotifySongs, nextIndex)
      return
    }
    const nextIndex = (currentIndex + 1) % spotifySongs.length
    playSongAtIndex(spotifySongs, nextIndex)
  }

  const playPreviousSong = (spotifySongs: SpotifySong[]) => {
    const currentIndex = spotifySongs.findIndex(
      (song) => song.id === activeSong?.data.id
    )
    if (isShuffle) {
      const randomIndexBase = getRandomIndex(spotifySongs)
      const randomIndex =
        randomIndexBase === currentIndex
          ? (randomIndexBase - 1 + spotifySongs.length) % spotifySongs.length
          : randomIndexBase
      playSongAtIndex(spotifySongs, randomIndex)
      return
    }
    if (currentIndex === 0) {
      activeSong?.howl.seek(0, activeSong.soundId)
      return
    }
    const previousIndex =
      (currentIndex - 1 + spotifySongs.length) % spotifySongs.length
    playSongAtIndex(spotifySongs, previousIndex)
  }
  const toggleShuffle = () => {
    setIsShuffle(!isShuffle)
  }
  const toggleLoop = () => {
    setIsLoop(!isLoop)
  }

  return {
    playNewSong,
    activeSong,
    songMeta,
    progress,
    isPlaying,
    toggleSongPlayer,
    playlistHistory,
    setIsLoop,
    isLoop,
    handlePress,
    toggleLoop,
    toggleShuffle,
    togglePlay,
    playnextSong,
    playPreviousSong,
    isShuffle,
  }
}

import { useState } from 'react'
import { useDynamicStyles, getDynamicStylesInput } from 'app/shared/hooks'
import {
  SongItem,
  View,
  PlayerCollapsed,
  IconButton,
} from 'app/shared/components/ui'

const WRAPPER_WIDTH = 300
const ICON_SIZE = 27
const ICON_MARGIN = 5
const dynamicStylesInput = getDynamicStylesInput((theme) => {
  return {
    wrapper: {
      backgroundColor: theme.colors.background,
      width: WRAPPER_WIDTH,
    },
    iconButton: {
      margin: ICON_MARGIN,
    },
    buttonsContainer: {
      flexDirection: 'row',
    },
  }
})
const songsArr = [
  {
    id: '123',
    name: 'Hello',
    author: 'Adelle',
    album: '25',
    status: 'downloaded',
    coverImageUrl:
      'https://t2.genius.com/unsafe/378x378/https%3A%2F%2Fimages.genius.com%2F3df25d429ce3c4d205a07c20d7156db5.1000x1000x1.jpg',
  },
  {
    id: '456',
    name: 'Hello',
    author: 'Adelle',
    album: '25',
    status: 'downloade',
    coverImageUrl:
      'https://t2.genius.com/unsafe/378x378/https%3A%2F%2Fimages.genius.com%2F3df25d429ce3c4d205a07c20d7156db5.1000x1000x1.jpg',
  },
  {
    id: '758',
    name: 'Hello',
    author: 'Adelle',
    album: '25',
    status: 'downloaded',
    coverImageUrl:
      'https://t2.genius.com/unsafe/378x378/https%3A%2F%2Fimages.genius.com%2F3df25d429ce3c4d205a07c20d7156db5.1000x1000x1.jpg',
  },
]

export function HomeScreen() {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  const [selectedSong, setSelectedSong] = useState<string>()
  const [playingSongId, setPlayingSongId] = useState<string | null>(null)
  const isPlaying = (songId: string) => {
    return songId === playingSongId
  }

  const playHandler = (songId: string) => {
    if (songId === playingSongId) {
      setPlayingSongId(null)
      return
    }
    setSelectedSong(songId)
    setPlayingSongId(songId)
  }
  const onSongPressHandler = (songId) => {
    console.log(`${songId}`)
  }

  return (
    <View style={dynamicStyles.wrapper}>
      {songsArr.map((song) => (
        <PlayerCollapsed
          onPressElement={() => onSongPressHandler(song.id)}
          key={song.id}
          withCover={true}
          {...song}
          isSelected={song.id === selectedSong}
          isPlaying={song.id === playingSongId}
          rightComponent={
            <View style={dynamicStyles.buttonsContainer}>
              <IconButton
                iconName="monitor"
                size={ICON_SIZE}
                color="secondary"
                onPress={() => onSongPressHandler(song.id)}
                style={dynamicStyles.iconButton}
              />
              {isPlaying(song.id) ? (
                <IconButton
                  iconName="pause"
                  size={ICON_SIZE}
                  color="secondary"
                  onPress={() => playHandler(song.id)}
                  style={dynamicStyles.iconButton}
                />
              ) : (
                <IconButton
                  iconName="play"
                  size={ICON_SIZE}
                  color="primary"
                  onPress={() => playHandler(song.id)}
                  style={dynamicStyles.iconButton}
                />
              )}
            </View>
          }
        />
      ))}
    </View>
  )
}

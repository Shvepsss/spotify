import { useState } from 'react'
import { useDynamicStyles, getDynamicStylesInput } from 'app/shared/hooks'
import { SongItem, View, IconLocal } from 'app/shared/components/ui'

const WRAPPER_WIDTH = 300
const MENU_ICON_SIZE = 27
const dynamicStylesInput = getDynamicStylesInput((theme) => {
  return {
    wrapper: {
      backgroundColor: theme.colors.background,
      width: WRAPPER_WIDTH,
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

  const onSongPress = (songId: string) => {
    if (songId === playingSongId) {
      setPlayingSongId(null)
      return
    }
    setSelectedSong(songId)
    setPlayingSongId(songId)
  }

  return (
    <View style={dynamicStyles.wrapper}>
      {songsArr.map((song) => (
        <SongItem
          key={song.id}
          withCover={false}
          rightComponent={
            <IconLocal
              iconName="menu"
              size={MENU_ICON_SIZE}
              color="surfaceDisabled"
            />
          }
          {...song}
          isSelected={song.id === selectedSong}
          isPlaying={song.id === playingSongId}
          onPress={() => onSongPress(song.id)}
        />
      ))}
    </View>
  )
}

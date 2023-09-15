import { useState } from 'react'
import { View } from 'dripsy'
import { useDynamicStyles, getDynamicStylesInput } from 'app/shared/hooks'
import { SongItem } from 'app/shared/components/ui'

const dynamicStylesInput = getDynamicStylesInput((theme) => {
  return {
    wrapper: {
      backgroundColor: theme.colors.background,
      width: 300,
    },
  }
})

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
  const onMenuPress = () => {
    console.log(`pressed`)
  }

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
  return (
    <View style={dynamicStyles.wrapper}>
      {songsArr.map((song) => (
        <SongItem
          key={song.id}
          {...song}
          isSelected={song.id === selectedSong}
          isPlaying={song.id === playingSongId}
          onPress={() => onSongPress(song.id)}
          onMenuPress={() => onMenuPress()}
        />
      ))}
    </View>
  )
}

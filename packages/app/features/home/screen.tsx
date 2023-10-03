import { useDynamicStyles, getDynamicStylesInput } from 'app/shared/hooks'
import { SongItem, View } from 'app/shared/components/ui'
import { PlayerCollapsed } from '../PlayerCollapsed'

const WRAPPER_WIDTH = 300

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
    songUrl:
      'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
  },
  {
    id: '456',
    name: 'Hello',
    author: 'Adelle',
    album: '25',
    status: 'downloade',
    coverImageUrl:
      'https://t2.genius.com/unsafe/378x378/https%3A%2F%2Fimages.genius.com%2F3df25d429ce3c4d205a07c20d7156db5.1000x1000x1.jpg',
    songUrl:
      'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
  },
  {
    id: '758',
    name: 'Hello',
    author: 'Adelle',
    album: '25',
    status: 'downloaded',
    coverImageUrl:
      'https://t2.genius.com/unsafe/378x378/https%3A%2F%2Fimages.genius.com%2F3df25d429ce3c4d205a07c20d7156db5.1000x1000x1.jpg',
    songUrl:
      'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
  },
]

export function HomeScreen() {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  return (
    <View style={dynamicStyles.wrapper}>
      {songsArr.slice(0, 1).map((song) => (
        <PlayerCollapsed key={song.id} withCover={true} {...song} />
      ))}
    </View>
  )
}

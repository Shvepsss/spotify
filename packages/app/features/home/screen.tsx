import { useState, useCallback } from 'react'
import {
  useDynamicStyles,
  getDynamicStylesInput,
  usePlayer,
} from 'app/shared/hooks'
import {
  SongItem,
  View,
  Player,
  IconButton,
  SpotifySong,
  BottomSheetModal,
} from 'app/shared/components/ui'
import { PlayerCollapsed } from '../PlayerCollapsed'

const dynamicStylesInput = getDynamicStylesInput((theme) => {
  return {
    wrapper: {
      backgroundColor: theme.colors.background,
      width: '100%',
    },
  }
})

const songsArr = [
  {
    id: '123',
    name: 'Hello 1',
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
    name: 'Hello 2',
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
    name: 'Hello 3',
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
  const [collapsedPlayer, setCollapsedPlayer] = useState(true)
  const {
    playNewSong,
    songMeta,
    progress,
    activeSong,
    isPlaying,
    toggleSongPlayer,
    playlistHistory,
    isLoop,
    setIsLoop,
  } = usePlayer()

  const togglePlay = useCallback(
    (song: SpotifySong) => {
      playNewSong(song)
    },
    [activeSong, toggleSongPlayer, playNewSong]
  )

  function togglePlayerState() {
    setCollapsedPlayer(!collapsedPlayer)
  }
  const onSpringStart = (event) => {
    if (event.type === 'SNAP') {
      togglePlayerState()
    }
  }
  const onMenuPress = () => {}
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  return (
    <View style={dynamicStyles.wrapper}>
      {songsArr.map((song) => (
        <SongItem
          key={song.id}
          {...song}
          withCover={true}
          onPressElement={() => togglePlay(song)}
          isSelected={activeSong?.data?.id === song.id}
          isPlaying={isPlaying}
          rightComponent={
            <IconButton
              color="secondary"
              size={27}
              iconName="menu"
              onPress={onMenuPress}
            />
          }
        />
      ))}
      <BottomSheetModal
        snapPoints={[110, '100%']}
        open={true}
        backgroundStyle={{ backgroundColor: 'red', height: '100%' }}
        onSpringStart={onSpringStart}
      >
        {activeSong && songMeta && (
          <>
            <View style={{ display: !collapsedPlayer ? 'flex' : 'none' }}>
              <Player
                spotifySongs={songsArr}
                activeSong={activeSong}
                progress={progress}
                songMeta={songMeta}
                togglePlay={togglePlay}
                isPlaying={isPlaying}
                isLoop={isLoop}
                setIsLoop={setIsLoop}
              />
            </View>
            <View
              style={{
                display: collapsedPlayer && activeSong ? 'flex' : 'none',
              }}
            >
              <PlayerCollapsed
                songMeta={songMeta}
                activeSong={activeSong}
                progress={progress}
                isPlaying={isPlaying}
                withCover={true}
                {...activeSong?.data}
                togglePlay={togglePlay}
              />
            </View>
          </>
        )}
      </BottomSheetModal>
    </View>
  )
}

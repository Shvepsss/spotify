import { useState, useCallback } from 'react'
import {
  useDynamicStyles,
  getDynamicStylesInput,
  usePlayer,
  useTheme,
} from 'app/shared/hooks'
import {
  SongItem,
  View,
  Player,
  IconButton,
  BottomSheetModal,
  Typography,
  Button,
  CurrentUserPLaylist,
  ContentCarrousel,
} from 'app/shared/components/ui'
import { PlayerCollapsed } from '../../shared/components/ui/PlayerCollapsed'
import { ScrollView } from 'react-native'

const dynamicStylesInput = getDynamicStylesInput((theme) => {
  return {
    wrapper: {
      backgroundColor: theme.colors.background,
      flex: 1,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerButtons: {
      margin: 5,
    },
    contentChoiceContainer: {
      marginVertical: 15,
      justifyContent: 'space-evenly',
      flexDirection: 'row',
    },
    contentChoiceButtons: {
      marginHorizontal: 10,
    },
    carrouselContent: {
      flex: 1,
      flexDirection: 'row',
      gap: 20,
      marginVertical: 10,
    },
    feedContainer: {
      flex: 1,
      gap: 20,
      marginVertical: 20,
    },
    lastPlaylistsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      justifyContent: 'center',
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
  {
    id: '755',
    name: 'Hello 4',
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
    handlePress,
    togglePlay,
    playPreviousSong,
    playnextSong,
    toggleShuffle,
    toggleLoop,
    isShuffle,
  } = usePlayer()
  const theme = useTheme()
  const showMusic = () => {}

  const chooseByHref = (albumHref: string) => {
    console.log(albumHref)
  }

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
      <ScrollView>
        <View style={dynamicStyles.header}>
          <Typography variant="headlineLarge" color="secondary">
            Good evening
          </Typography>
          <View style={dynamicStyles.headerButtonsContainer}>
            <IconButton
              iconName="bell"
              size={20}
              color="secondary"
              style={dynamicStyles.headerButtons}
            />
            <IconButton
              iconName="timer"
              size={20}
              color="secondary"
              style={dynamicStyles.headerButtons}
            />
            <IconButton
              iconName="settings"
              size={20}
              color="secondary"
              style={dynamicStyles.headerButtons}
            />
          </View>
        </View>
        <View style={dynamicStyles.contentChoiceContainer}>
          <Button
            onPress={() => showMusic()}
            backgroundColor={theme.colors.surface}
            style={dynamicStyles.contentChoiceButtons}
          >
            <Typography variant="bodyMedium" color="secondary">
              Music
            </Typography>
          </Button>
          <Button
            onPress={() => showMusic()}
            backgroundColor={theme.colors.surface}
            style={dynamicStyles.contentChoiceButtons}
          >
            <Typography color="secondary" variant="bodyMedium">
              Show/Podcasts
            </Typography>
          </Button>
          <Button
            onPress={() => showMusic()}
            style={dynamicStyles.contentChoiceButtons}
            backgroundColor={theme.colors.surface}
          >
            <Typography color="secondary" variant="bodyMedium">
              AudioBooks
            </Typography>
          </Button>
        </View>
        <View style={dynamicStyles.feedContainer}>
          <View style={dynamicStyles.lastPlaylistsContainer}>
            {songsArr.map((song) => (
              <CurrentUserPLaylist
                name={song.name}
                coverImageUrl={song.coverImageUrl}
                key={song.id}
              />
            ))}
          </View>
          <Typography variant="headlineLarge" color="secondary">
            New Releases
          </Typography>
          {
            // Section for new relases( API: Albums -  Get New Release)
            <ScrollView
              horizontal={true}
              style={dynamicStyles.carrouselContent}
            >
              {songsArr.map((song) => (
                <ContentCarrousel
                  name={song.name}
                  imageUri={song.coverImageUrl}
                  key={song.id}
                  artist={song.author}
                  href={song.songUrl}
                  chooseElement={chooseByHref}
                />
              ))}
            </ScrollView>
          }
          <Typography variant="headlineLarge" color="secondary">
            Special for you
          </Typography>
          {
            //section for personal reccomendations  (API: Tracks - Get Recommendations)
            <ScrollView
              horizontal={true}
              style={dynamicStyles.carrouselContent}
            >
              {songsArr.map((song) => (
                <ContentCarrousel
                  name={song.name}
                  imageUri={song.coverImageUrl}
                  key={song.id}
                  artist={song.author}
                  href={song.songUrl}
                  chooseElement={chooseByHref}
                />
              ))}
            </ScrollView>
          }
        </View>

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
                  handleBarPress={handlePress}
                  playNextSong={playnextSong}
                  playPreviousSong={playPreviousSong}
                  isShuffle={isShuffle}
                  toggleLoop={toggleLoop}
                  toggleShuffle={toggleShuffle}
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
                  handleBarPress={handlePress}
                />
              </View>
            </>
          )}
        </BottomSheetModal>
      </ScrollView>
    </View>
  )
}

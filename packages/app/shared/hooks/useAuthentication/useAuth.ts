import { useEffect, useState } from 'react'

const CLIENT_ID = '5e626d1d53cd4a568c761d0b29e901b4'
const REDIRECT_URI = 'http://localhost:8888'
const SCOPE = 'user-read-private user-read-email'

export function useSpotifyAuth() {
  const [token, setToken] = useState<string | null>(null)
  const [userData, setUserData] = useState(null)

  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`

    fetch(authUrl)
      .then((response) => {
        if (response.status === 200) {
          const hash = window.location.hash.substring(1)
          const params = new URLSearchParams(hash)
          const accessToken = params.get('access_token')

          if (accessToken) {
            setToken(accessToken)
          } else {
            console.error('Токен доступа не найден')
          }
        } else {
          console.error('Ошибка авторизации')
        }
      })
      .catch((error) => {
        console.error('Ошибка сети:', error)
      })
  }

  return { token, userData, handleLogin }
}

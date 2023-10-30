import { useEffect, useState } from 'react'

const CLIENT_ID = '5e626d1d53cd4a568c761d0b29e901b4'
const REDIRECT_URI = 'http://localhost:8888'
const SCOPE = 'user-read-private user-read-email'

export function useSpotifyAuth() {
  const [token, setToken] = useState<string | null>(null)

  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`
    window.location.href = authUrl
  }
  const extractTokenFromURL = () => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    return params.get('access_token')
  }

  useEffect(() => {
    const accessToken = extractTokenFromURL()
    if (accessToken) {
      setToken(accessToken)
    }
  })
  console.log(token)
  return { token, handleLogin }
}

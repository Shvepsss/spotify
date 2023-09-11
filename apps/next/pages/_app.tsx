import 'raf/polyfill'
import 'setimmediate'

import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'
import type { SolitoAppProps } from 'solito'

// @ts-expect-error
import icons from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Solito Example App</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style global type="text/css">{`
        @font-face {
          font-family: 'MaterialCommunityIcons';
          src: url(${icons}) format('truetype');
        }
      `}</style>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp

const { withExpo } = require('@expo/next-adapter')
const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    }
    ;(config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ]),
      config.module.rules.push({
        test: /\.ttf$/,
        loader: 'url-loader', // or directly file-loader
        include: path.resolve(
          __dirname,
          '../../node_modules/react-native-vector-icons'
        ),
      })

    return config
  },
  images: {
    domains: ['t2.genius.com'],
  },
  transpilePackages: [
    'react-native',
    'react-native-web',
    'solito',
    'dripsy',
    '@dripsy/core',
    'moti',
    'app',
    'react-native-reanimated',
    '@expo/html-elements',
    'react-native-gesture-handler',
    'react-native-paper',
    'react-native-vector-icons',
    'react-native-safe-area-context',
  ],
}

module.exports = withExpo(nextConfig)

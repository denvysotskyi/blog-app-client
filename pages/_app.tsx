import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { useEffect } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`

const theme = {
  media: {
    phone: '(max-width: 425px)',
    tablet: '(max-width: 768px)',
    laptop: '(max-width: 992px)',
    desktop: '(max-width: 1200px)',
    widescreen: '(max-width: 1439px)'
  }
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const reg = await navigator.serviceWorker.register('sw.js')
          console.log('Service worker registration is success', reg)
        } catch (e) {
          console.error('Service worker registration is fail', e)
        }
      })
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <>
        <Head>
          <meta charSet={'utf-8'} />
          <link rel={'icon'} href={'/favicon.ico'} />
          <meta name={'viewport'}
                content={'width=device-width, initial-scale=1'}
          />
          <meta name={'theme-color'}
                content={'#000000'}
          />
          <meta name={'Blog App'}
                content={'Blog App'}
          />
          <link rel={'icon'}
                href={'/logo192.png'}
          />
          <link rel={'icon'}
                href={'/logo512.png'}
          />
          <link rel={'manifest'}
                href={'/manifest.json'}
          />
        </Head>
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  )
}

export default MyApp
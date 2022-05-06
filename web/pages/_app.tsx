import '../styles/globals.css'
import '../styles/arxiv_vanity.css'
// import '../styles/custom.css'
import type { AppProps } from 'next/app'
import Header from '../components/msHeader'
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux'
import store from '../store'
import Head from 'next/head'

function MyApp({ Component, pageProps:{session,...pageProps} }: AppProps) {
  const { global } = pageProps;
  return (
    <>
    <SessionProvider session={session}>
      <Provider store={store}>
      <Head>
        <title>ML Research Papers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Header></Header>
    <div className='test'>
    <Component {...pageProps} />
    </div>
    </Provider>
    </SessionProvider>
    </>
  )
}

export default MyApp

import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>

      <Head>
        <title>בית ספר רימונים באר שבע</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />

    </>
  )
}

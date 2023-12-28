import '@/styles/globals.css'
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"
import Context from '@/contexts/context'
import * as React from 'react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const [pages, setPages] = React.useState([])

  React.useEffect(() => {
    const fetchPages = async () => {
      try {
        const fetchedPages = await fetch("/api/page", {
          headers: { 'Content-Type': 'application/json' },
        });
        const json = await fetchedPages.json();
        setPages(json);
      }
      catch (error) {
        console.log(error.message);
      }
    }
    fetchPages();
  }, [])

  return (
    <>

      <Head>
        <title>בית ספר רימונים באר שבע</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Context.Provider value={{ pages }}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Context.Provider >

    </>
  )
}
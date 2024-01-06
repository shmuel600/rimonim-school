import '@/styles/globals.css'
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"
import Context from '@/contexts/context'
import * as React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const [pages, setPages] = React.useState([])
  const [user, setUser] = React.useState()
  const [onBadLoad, setOnBadLoad] = React.useState(<></>)

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

    // fetch all pages
    fetchPages();

    // if pages didnt get fetched
    setTimeout(() => {
      setOnBadLoad(
        <>
          {`There may have been a problem fetching data from the server.`}
          <br />
          {`Please wait or try again later.`}
        </>
      )
    }, 1000)
  }, [])

  return (
    <>

      <Head>
        <title>בית ספר רימונים באר שבע</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={darkTheme}>
        <Context.Provider value={{ pages, user, setUser, permissions: user?.permissions || null }}>
          <SessionProvider session={session}>
            {
              pages.length > 0 ?
                <Component {...pageProps} />
                :
                <div style={{
                  height: '100vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'darkgray'
                }}>
                  {onBadLoad}
                </div>
            }
          </SessionProvider>
        </Context.Provider >
      </ThemeProvider>
    </>
  )
}
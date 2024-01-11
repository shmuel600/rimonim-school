import '@/styles/globals.css'
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"
import Context from '@/contexts/context'
import * as React from 'react'
import { ThemeProvider, createTheme, styled } from '@mui/material/styles'
import { Box } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Loader = styled(Box)({
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: '48px',
  height: '48px',
  border: '5px solid #90caf9',
  borderBottom: '5px solid transparent',
  borderRadius: '50%',
  display: 'inline-block',
  boxSizing: 'border-box',
  animation: 'rotate 1s linear infinite',
  "@keyframes rotate": {
    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' }
  }
});

const ErrorMsg = styled(Box)({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'darkgray',
  direction: 'rtl'
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const [pages, setPages] = React.useState([])
  const [user, setUser] = React.useState()
  const [onBadLoad, setOnBadLoad] = React.useState(<Loader />)

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
        setOnBadLoad(
          <ErrorMsg>
            {`נתקלנו בבעיה בטעינת האתר.`}
            <br />
            {`לחצו `}
            <strong onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>
              {`לרענון הדף`}
            </strong>
            {` או נסו שוב מאוחר יותר.`}
          </ErrorMsg>
        )
      }
    }

    // fetch all pages
    fetchPages();
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
                onBadLoad
            }
          </SessionProvider>
        </Context.Provider >
      </ThemeProvider>
    </>
  )
}
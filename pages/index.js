import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import * as React from 'react'
import { useVisible } from '@/hooks/useVisible'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import Image from 'next/image'


export default function Home() {

  const updates = React.useRef()
  const isUpgradesVisible = useVisible(updates)

  return (
    <main className={styles.main}>

      <div className={styles.shadow}></div>

      <Header />

      {/* <Image alt="" width={100} height={100}
        src="/rimonim_logo_web_white.png"
        style={{
          position: 'fixed',
          top: '4rem',
          right: '2rem'
        }}
      /> */}

      <div className={styles.picture}>
        <h1 style={{ fontSize: '44px' }}>
          בית הספר רימונים באר שבע
        </h1>
        {/* <Image alt="" width={250} height={250}
          src="/rimonim_logo_web_white.png"
        /> */}
      </div>

      {!isUpgradesVisible &&
        <div
          style={{ display: 'flex', justifyContent: 'center', transitionDuration: '0.4s', cursor: 'pointer' }}
          onClick={() => updates.current.scrollIntoView({ behavior: "smooth" })}
        >
          <h2 style={{
            position: 'fixed',
            bottom: '10%',
            color: 'white',
          }}>
            עדכונים שוטפים
          </h2>
          <KeyboardArrowDownOutlinedIcon
            className={styles.arrowDown}
            sx={{
              fontSize: '60px',
              position: 'fixed',
              bottom: '2%',
              color: 'white',
            }} />
        </div>
      }

      <div className={styles.page} ref={updates} style={{ padding: '4rem', scrollMargin: '4rem', minHeight: '80vh' }}>
        <h1>
          עדכונים שוטפים
        </h1>

      </div>

      <Footer />

    </main>
  )
}

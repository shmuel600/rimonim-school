'use client'
import dynamic from 'next/dynamic'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import * as React from 'react'
import { useVisible } from '@/hooks/useVisible'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import Gallery from '@/components/Home/Gallery'

const DynamicContent = dynamic(
    () => import('@/components/DynamicContent/DynamicContent'),
    { ssr: false }
)

export default function Home() {

    const updates = React.useRef()
    const isUpdatesVisible = useVisible(updates)

    const handleSroll = () => {
        updates.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <main className={styles.main}>

            <div className={styles.shadow}></div>

            <Header />

            <div className={styles.picture}>
                <h1 style={{ fontSize: '44px' }}>
                    בית הספר רימונים באר שבע
                </h1>
            </div>

            {!isUpdatesVisible &&
                <div
                    style={{ display: 'flex', justifyContent: 'center', transitionDuration: '0.4s', cursor: 'pointer' }}
                    onClick={handleSroll}
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

            <div className={styles.page} ref={updates} style={{ scrollMargin: '4rem', minHeight: '60vh' }}>

                <h1>
                    עדכונים שוטפים
                </h1>

                <div style={{ margin: '1rem', marginBottom: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <DynamicContent
                        pageName={'home'}
                        isHomePage={true}
                        handleSroll={handleSroll}
                    />
                </div>

                <h1>
                    תמונות מאירועי בית הספר
                </h1>

                <div style={{ margin: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Gallery />
                </div>

            </div>

            <Footer />

        </main>
    )
}
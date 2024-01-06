'use client'
import styles from '@/styles/Class.module.css'
import * as React from 'react'
import { useRouter } from 'next/router'

export default function ClassHeader({ pageName }) {

    const [navOpen, setNavOpen] = React.useState(false)
    const [navWidth, setNavWidth] = React.useState(-0)
    const sideNav = React.useRef()

    React.useEffect(() => {
        navWidth === 0 && setNavWidth(navOpen ? 0 : -sideNav?.current?.clientWidth)
    }, [navOpen, sideNav, navWidth])

    const router = useRouter()

    const classTabs = [
        'דף הבית',
        'לוח אירועים',
        'מערכת שעות',
        'משחקים',
        'יצירות',
        'תמונות וסרטונים'
    ]

    return (
        <>
            <div className={styles.header}>
                <div
                    onClick={() => setNavOpen(!navOpen)}
                    style={{ margin: '0.5rem', padding: '0.5rem', background: 'lightgray', borderRadius: '1rem' }}
                >
                    סמל
                </div>
                <div style={{ width: '100%' }}>
                    בית ספר רימונים באר שבע - {pageName}
                </div>
            </div>
            <div
                ref={sideNav}
                className={styles.sideNav}
                style={{
                    opacity: `${navOpen ? '1' : '0'}`,
                    transform: `translateX(${navOpen ? 0 : -sideNav?.current?.clientWidth}px)`
                }}
            >
                {
                    classTabs.map(tab =>
                        <div key={classTabs.indexOf(tab)} onClick={() => {
                            setNavOpen(false)
                            router.push(`/class/${pageName}/${tab}`)
                        }}>
                            {tab}
                        </div>
                    )
                }
                <div onClick={() => router.push(`/`)}>חזרה לאתר בית הספר</div>
            </div>
        </>
    )
}
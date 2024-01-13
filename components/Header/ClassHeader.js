'use client'
import styles from '@/styles/Class.module.css'
import * as React from 'react'
import { useRouter } from 'next/router'
import ClassHeaderSVG from '@/components/Header/ClassHeaderSVG'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import CalendarViewMonthRoundedIcon from '@mui/icons-material/CalendarViewMonthRounded'
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded'
import YardRoundedIcon from '@mui/icons-material/YardRounded'
import PermMediaRoundedIcon from '@mui/icons-material/PermMediaRounded'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import { useVisible } from '@/hooks/useVisible'
import { useSession } from "next-auth/react"

import UserDetails from './UserDetails'

export default function ClassHeader({ pageName }) {

    const { data: session } = useSession()
    const router = useRouter()
    const pageTop = React.useRef()
    const isScrolled = !useVisible(pageTop)
    const [activeTab, setActiveTab] = React.useState('דף הבית')

    const setPage = (page) => {
        router.push(page)
    }

    const classTabs = [
        'דף הבית',
        'לוח אירועים',
        'מערכת שעות',
        'משחקים',
        'יצירות',
        'תמונות וסרטונים'
    ]

    const tabsIcons = [
        <HomeRoundedIcon key={0} className={styles.tabsIcons} />,
        <EventRoundedIcon key={1} className={styles.tabsIcons} />,
        <CalendarViewMonthRoundedIcon key={2} className={styles.tabsIcons} />,
        <CasinoRoundedIcon key={3} className={styles.tabsIcons} />,
        <YardRoundedIcon key={4} className={styles.tabsIcons} />,
        <PermMediaRoundedIcon key={5} className={styles.tabsIcons} />
    ]

    return (
        <>
            <div ref={pageTop} style={{ position: 'absolute', height: '4rem' }}></div>
            <div>
                <ClassHeaderSVG pageName={pageName} />
            </div>
            <div className={`${styles.header} ${isScrolled ? styles.scrolled : styles.notScrolled}`}>

                {
                    classTabs.map(tab =>
                        <div
                            key={classTabs.indexOf(tab)}
                            style={{ display: 'flex' }}
                            className={`${activeTab === tab ? styles.active : styles.inactive}`}
                            onClick={() => {
                                router.push(`/class/${pageName}/${tab}`)
                                setActiveTab(tab)
                            }}
                        >
                            <div className={styles.tabs}>
                                {tab}
                            </div>
                            <div style={{ marginLeft: '0.5rem' }}>
                                {tabsIcons[classTabs.indexOf(tab)]}
                            </div>
                        </div >
                    )
                }

                <div
                    style={{ display: 'flex' }}
                    className={`${activeTab === 'school-site' ? styles.active : styles.inactive}`}
                    onClick={() => {
                        router.push(`/`)
                        setActiveTab('school-site')
                    }}
                >
                    <div className={styles.tabs}>
                        אתר בית הספר
                    </div>
                    <div style={{ marginLeft: '0.5rem' }}>
                        <SchoolRoundedIcon className={styles.tabsIcons} />
                    </div>
                </div>

            </div >

            {
                session && <UserDetails session={session} setPage={setPage} />
            }
        </>
    )
}
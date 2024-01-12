'use client'
import styles from '@/styles/Class.module.css'
import * as React from 'react'
import { useRouter } from 'next/router'
import ClassHeaderSVG from '@/components/Header/ClassHeaderSVG'

export default function ClassHeader({ pageName }) {

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
            <ClassHeaderSVG pageName={pageName} />
            <div className={styles.header} style={{ position: 'fixed', display: 'flex', flexDirection: 'row-reverse', flexWrap: 'wrap' }}>
                {
                    classTabs.map(tab =>
                        <div key={classTabs.indexOf(tab)} onClick={() => {
                            router.push(`/class/${pageName}/${tab}`)
                        }}>
                            {tab}
                        </div>
                    )
                }
                <div onClick={() => router.push(`/`)}>
                    אתר בית הספר
                </div>
            </div>
        </>
    )
}
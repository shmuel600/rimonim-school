'use client'
import styles from '@/styles/Sky.module.css'
import Sky from './Sky'

export default function ClassHeaderSVG({ pageName }) {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.sky}>
                    <Sky pageName={[pageName]} />
                </div>
            </div>
        </>
    )
}
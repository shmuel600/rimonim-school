'use client'
import styles from '@/styles/ClassHeader.module.css'
import Sun from './sun'
import Clouds from './clouds'

export default function ClassHeaderSVG({ pageName }) {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.sky}>
                    {/* <Sun pageName={[pageName]} /> */}
                    <Clouds pageName={[pageName]} />
                </div>
            </div>
        </>
    )
}
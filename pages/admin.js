'use client';
import Header from '@/components/Header';
import styles from '@/styles/Page.module.css'

export default function Admin() {
    return (
        <main
            className={styles.main}
        // style={{ background: '#16171d', color: "#2b313a" }}
        // style={{ background: "#2b313a" }}

        >
            <Header />

            <div className={styles.page}>
                {/* change or add images to home page view */}
                {/* change user permissions by page */}
                {/* change user permissions by user */}
                Admin
            </div>
        </main>
    )
}
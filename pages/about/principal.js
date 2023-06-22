import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'

export default function Principal() {
    return (
        <main className={styles.main}>

            <Header />

            <div className={styles.page}>
                דבר המנהלת
            </div>

        </main>
    )
}

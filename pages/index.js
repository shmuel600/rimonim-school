import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.shadow}></div>

      <Header />

      <div className={styles.picture}>
        <h1 style={{ fontSize: '54px' }}>
          בית הספר רימונים באר שבע
        </h1>
      </div>

      <div className={styles.page} style={{ padding: '4rem', minHeight: '80vh' }}>
        <h1>
          עדכונים שוטפים
        </h1>

      </div>

      <Footer />

    </main>
  )
}

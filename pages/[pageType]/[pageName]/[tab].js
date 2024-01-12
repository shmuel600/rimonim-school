import dynamic from 'next/dynamic'
import styles from '@/styles/Page.module.css'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'
import * as React from 'react'
import ClassHeader from '@/components/Header/ClassHeader'
import { useVisible } from '@/hooks/useVisible'

export async function getServerSideProps({ params }) {
    const { pageType, pageName, tab } = params;
    return {
        props: {
            pageType,
            pageName,
            tab
        },
    };
}

const DynamicContent = dynamic(
    () => import('@/components/DynamicContent/DynamicContent'),
    { ssr: false }
)

// make dynamic page render only on the client side
export default function CSR_Page({ pageType, pageName, tab }) {

    const router = useRouter()
    const [load, setLoad] = React.useState(false)

    React.useEffect(() => {
        const classTabs = [
            'לוח אירועים',
            'מערכת שעות',
            'משחקים',
            'יצירות',
            'תמונות וסרטונים'
        ]
        if (
            (
                pageType !== 'class' &&
                !classTabs?.includes(tab)
            )) {
            router.replace('/')
        }
        else setLoad(true)
    }, [pageType, tab, router])

    return (
        <main className={styles.main}>
            {
                load &&
                <>
                    <ClassHeader pageName={pageName} />
                    <div className={styles.page} style={{ background: '#fff6fe', padding: 0 }}>
                        <DynamicContent pageName={pageName} pageType={pageType} tab={tab} />
                    </div>
                    <Footer />
                </>
            }
        </main>
    )
}
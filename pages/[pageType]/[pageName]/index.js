import dynamic from 'next/dynamic'
import styles from '@/styles/Page.module.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'
import * as React from 'react'
import Context from '@/contexts/context'

export async function getServerSideProps({ params }) {
    const { pageType, pageName } = params;
    return {
        props: {
            pageType,
            pageName
        },
    };
}

const DynamicContent = dynamic(
    () => import('@/components/DynamicContent/DynamicContent'),
    { ssr: false }
)

// make dynamic page render only on the client side
export default function CSR_Page({ pageType, pageName }) {

    const { pages } = React.useContext(Context);
    const [load, setLoad] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const pageTypes = pages.map(page => page.type)
        const pageNames = pages.map(page => page.name)
        if (pageType === 'class') {
            router.replace(`/class/${pageName}/דף הבית`)
        }
        if (
            !pageTypes?.includes(pageType) ||
            !pageNames?.includes(pageName)
        ) {
            router.replace('/')
        }
        else setLoad(true)
    }, [pages, pageType, pageName, router])

    return (
        <main className={styles.main}>
            {
                load &&
                <>
                    <Header />
                    <div className={styles.page}>
                        <DynamicContent pageName={pageName} />
                    </div>
                    <Footer />
                </>
            }
        </main>
    )
}
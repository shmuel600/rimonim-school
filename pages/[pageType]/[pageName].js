import dynamic from 'next/dynamic'
import styles from '@/styles/Page.module.css'
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    return (
        <main className={styles.main}>
            <Header />
            <div className={styles.page}>
                <DynamicContent pageName={pageName} pageType={pageType} />
            </div>
            <Footer />
        </main>
    )
}
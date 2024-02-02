'use client';
import styles from '@/styles/Admin.module.css'
import * as React from 'react'
import Context from '@/contexts/context'
import { useRouter } from 'next/router'
import AdminHeader from '@/components/Header/AdminHeader'
import Admin from '@/components/Admin/index'

export default function AdminPage() {

    const router = useRouter()
    const pageTop = React.useRef()
    const { user, permissions } = React.useContext(Context);
    const [activeTab, setActiveTab] = React.useState(router.query?.editGallery ? 2 : 0);

    React.useEffect(() => {
        if (user && permissions !== 'admin') {
            router.replace('/')
        }
    }, [user, permissions, router])

    return (
        <>
            {permissions === 'admin' &&

                <main className={styles.main}>
                    <div ref={pageTop}></div>

                    <AdminHeader
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <div className={styles.page}>
                        <Admin
                            pageTop={pageTop}
                            activeTab={activeTab}
                        />
                    </div>
                </main>

            }
        </>
    )
}
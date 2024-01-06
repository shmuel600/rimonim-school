'use client';
import styles from '@/styles/Admin.module.css'

import * as React from 'react'
import { useRouter } from 'next/router'
import Context from '@/contexts/context'

import AdminHeader from '@/components/Header/AdminHeader';
import PagesPermissions from '@/components/Admin/PagesPermissions/index';
import Users from '@/components/Admin/Users';
import HomePageGallery from '@/components/Admin/HomePageGallery';


export default function Admin() {

    const router = useRouter()
    const { pages, permissions } = React.useContext(Context);
    const [activeTab, setActiveTab] = React.useState(0);
    const [users, setUsers] = React.useState([]);
    const pageTop = React.useRef()

    React.useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const fetchedUsers = await fetch("/api/user", {
                    headers: { 'Content-Type': 'application/json' },
                });
                const json = await fetchedUsers.json();
                setUsers(json);
            }
            catch (error) {
                console.log(error.message);
            }
        }
        fetchAllUsers();
    }, [])

    React.useEffect(() => {
        if ((!permissions === 'admin'))
            router.replace('/')
    }, [permissions, router])

    return (
        <main className={styles.main}>
            <div ref={pageTop}></div>
            <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className={styles.page}>
                <div hidden={activeTab !== 0} style={{ minWidth: 'min(600px, 80%)' }}>
                    <PagesPermissions pages={pages} users={users} setUsers={setUsers} pageTop={pageTop} />
                </div>
                <div hidden={activeTab !== 1}>
                    <Users users={users} />
                </div>
                <div hidden={activeTab !== 2}>
                    <HomePageGallery />
                </div>
            </div>

        </main>
    )
}
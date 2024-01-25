'use client';
import * as React from 'react'
import Context from '@/contexts/context'

import Permissions from '@/components/Admin/Permissions/index'
import Pages from '@/components/Admin/Pages/index'
import HomePageGallery from '@/components/Admin/HomePageGallery'
import Loader from '../Loader';

export default function Admin({ pageTop, activeTab }) {

    const { pages, setPages } = React.useContext(Context);
    const [users, setUsers] = React.useState([]);

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

    const updateUserPermissions = async (user, permissions) => {
        try {
            await fetch(`/api/user/${user._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ permissions, lastPermissions: Date.now() }),
            });
            refreshUsers()
        }
        catch (error) {
            console.log(error.message, "could_not_update_permissions");
        }
    }

    const refreshUsers = async () => {
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

    const refreshPages = async () => {
        try {
            const fetchedPages = await fetch("/api/page", {
                headers: { 'Content-Type': 'application/json' },
            });
            const json = await fetchedPages.json();
            setPages(json);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>

            <div hidden={activeTab !== 0 || !(users.length > 0)} style={{ minWidth: 'min(600px, 80%)' }}>
                <Permissions
                    classes={pages.filter(page => page.type === 'class')}
                    users={users}
                    pageTop={pageTop}
                    updateUserPermissions={updateUserPermissions}
                />
            </div>

            <div hidden={activeTab !== 1 || !(users.length > 0)} style={{ minWidth: 'min(600px, 80%)' }}>
                <Pages
                    pages={pages}
                    classes={pages.filter(page => page.type === 'class')}
                    studyMaterials={pages.filter(page => page.type === 'study-material')}
                    refreshPages={refreshPages}
                />
            </div>

            <div hidden={activeTab !== 2 || !(users.length > 0)}>
                <HomePageGallery />
            </div>

            <div hidden={users.length > 0}>
                <Loader />
            </div>

        </>
    )
}
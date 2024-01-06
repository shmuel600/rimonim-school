'use client'
import styles from '@/styles/Header.module.css'
import Image from 'next/image'
import { signOut } from "next-auth/react"
import Context from '@/contexts/context'
import * as React from 'react'

export default function UserDetails({ session, setPage }) {

    const { pages, permissions } = React.useContext(Context);
    const shortcutToPage =
        permissions === 'admin' ?
            'admin'
            :
            (permissions && pages.filter(page => page._id === permissions)[0])

    return (
        <div
            className={styles.userDetails}
        >
            <Image src={session?.user?.image} alt="" width={50} height={50} style={{ borderRadius: '50%', marginRight: '1rem' }} />
            <div>
                <div>{session?.user?.name}</div>
                <div>
                    {
                        permissions === 'admin' ?
                            <button onClick={() => setPage(`/admin`)}>
                                ניהול
                            </button>
                            :
                            (
                                permissions ?
                                    <button onClick={() => setPage(`/${shortcutToPage?.type}/${shortcutToPage?.name}`)}>
                                        {shortcutToPage?.name}
                                    </button>
                                    :
                                    <button className={styles.disabledButton}>
                                        אין הרשאה
                                    </button>
                            )
                    }
                </div>
                <div>
                    <button
                        onClick={() => signOut('google')}
                    >
                        התנתק
                    </button>
                </div>
            </div>
        </div>
    )
}
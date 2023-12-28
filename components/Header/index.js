'use client'
import styles from '@/styles/Header.module.css'
import Image from 'next/image'
import * as React from 'react'
import Context from '@/contexts/context'
import { useRouter } from 'next/router'
import { useVisible } from '@/hooks/useVisible'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { signIn, signOut, useSession } from "next-auth/react"

export default function Header() {
    const { data: session } = useSession()
    const { pages } = React.useContext(Context);
    const [menu, setMenu] = React.useState('')
    const [user, setUser] = React.useState()
    const router = useRouter()
    const { asPath: path } = useRouter()
    const pageTop = React.useRef()
    const hideHeaderBackground = useVisible(pageTop) && path === '/'


    React.useEffect(() => {
        const signUserIn = async () => {
            const userDetails = {
                name: session?.user?.name,
                email: session?.user?.email,
                image: session?.user?.image,
            }
            try {
                const fetchedUser = await fetch("/api/user", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userDetails)
                });
                const json = await fetchedUser.json();
                setUser(json);
            }
            catch (error) {
                console.log(error.message, "could_not_create_user");
            }
        }
        session?.user && !user && signUserIn();
    }, [session, user])

    const setPage = (page) => {
        router.push(page)
    }

    return (
        <>
            <div ref={pageTop}></div>

            <div
                className={`
                ${styles.header} 
                ${path === '/' && styles.isHomePage} 
                ${!hideHeaderBackground && styles.showBackground}
                `}
                onMouseLeave={() => setMenu('')}
            >

                <Image alt="" width={50} height={50}
                    className={styles.logo}
                    src="/rimonim_logo_web_white.png"
                    style={{ margin: '0 0.5rem', cursor: 'pointer' }}
                    onClick={() => setPage('/')}
                />

                <span
                    onClick={() => setPage('/')}
                    onMouseOver={() => setMenu('')}
                    className={styles.headerButton}
                >
                    דף הבית
                </span>

                <span
                    onMouseOver={() => setMenu('אודות')}
                    className={styles.headerButton}>
                    <KeyboardArrowDownOutlinedIcon sx={{ fontSize: '16px', m: 0, p: 0, pr: 0.5 }} />
                    אודות
                    {menu === 'אודות' &&
                        <div className={styles.openMenu}>
                            {
                                pages.length > 0 && pages
                                    .filter(page => page.type === 'about')
                                    .map(page =>
                                        <button
                                            key={page._id}
                                            onClick={() => setPage(`/about/${page.name}`)}
                                        >
                                            {page.name}
                                        </button>
                                    )
                            }
                        </div>
                    }
                </span>

                <span
                    onMouseOver={() => setMenu('אתרי הכיתות')}
                    className={styles.headerButton}>
                    <KeyboardArrowDownOutlinedIcon sx={{ fontSize: '16px', m: 0, p: 0, pr: 0.5 }} />
                    אתרי הכיתות
                    {menu === 'אתרי הכיתות' &&
                        <div className={styles.openMenu}>
                            {
                                pages && pages
                                    .filter(page => page.type === 'class')
                                    .map(page =>
                                        <button
                                            key={page._id}
                                            onClick={() => setPage(`/class/${page.name}`)}
                                        >
                                            {page.name}
                                        </button>
                                    )
                            }
                        </div>
                    }
                </span>

                {/* show 'חומרי לימוד' only if user has any permission*/}
                <span
                    onMouseOver={() => setMenu('חומרי לימוד')}
                    className={styles.headerButton}>
                    <KeyboardArrowDownOutlinedIcon sx={{ fontSize: '16px', m: 0, p: 0, pr: 0.5 }} />
                    חומרי לימוד
                    {menu === 'חומרי לימוד' &&
                        <div className={`${styles.openMenu} ${styles.withBorder}`}>
                            {
                                pages && pages
                                    .filter(page => page.type === 'material')
                                    .map(page =>
                                        <button
                                            key={page._id}
                                            onClick={() => setPage(`/study-material/${page.name}`)}
                                        >
                                            {page.name}
                                        </button>
                                    )
                            }
                        </div>
                    }
                </span>

                {
                    session ?
                        <div
                            className={styles.userDetails}
                        >
                            <Image src={session?.user?.image} alt="" width={50} height={50} style={{ borderRadius: '50%', marginRight: '1rem' }} />
                            <div>
                                <div>{session?.user?.name}</div>
                                <div>
                                    <button
                                        onClick={() => setPage(`/admin`)}
                                    >
                                        ניהול הרשאות
                                    </button>
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
                        :
                        <span
                            onClick={() => signIn('google')}
                            onMouseOver={() => setMenu('')}
                            className={styles.headerButton}
                        >
                            התחברות
                        </span>
                }


            </div>
        </>
    )
}

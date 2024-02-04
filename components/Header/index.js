'use client'
import styles from '@/styles/Header.module.css'
import Image from 'next/image'
import * as React from 'react'
import Context from '@/contexts/context'
import { useRouter } from 'next/router'
import { useVisible } from '@/hooks/useVisible'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { signIn, useSession } from "next-auth/react"
import UserDetails from './UserDetails'

export default function Header() {
    const { data: session } = useSession()
    const { pages, permissions } = React.useContext(Context);
    const [menu, setMenu] = React.useState('')
    const router = useRouter()
    const { asPath: path } = useRouter()
    const pageTop = React.useRef()
    const hideHeaderBackground = useVisible(pageTop) && path === '/'

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
                    src="/rimonim_logo_web_colors.png"
                    priority={true}
                    style={{ margin: '0 0.5rem', cursor: 'pointer' }}
                    onClick={() => setPage('/')}
                />

                <span
                    onClick={() => {
                        setPage('/')
                        setMenu('')
                    }}
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
                                            onClick={() => {
                                                setPage(`/about/${page.name}`)
                                                setMenu('')
                                            }}
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
                                    .sort((a, b) => a.name.replace(/\D/g, '') - b.name.replace(/\D/g, ''))
                                    .map(page =>
                                        <button
                                            key={page._id}
                                            onClick={() => {
                                                setPage(`/class/${page.name}`)
                                                setMenu('')
                                            }}
                                        >
                                            {page.name}
                                        </button>
                                    )
                            }
                        </div>
                    }
                </span>

                {
                    permissions &&
                    <span
                        onMouseOver={() => setMenu('חומרי לימוד')}
                        className={styles.headerButton}>
                        <KeyboardArrowDownOutlinedIcon sx={{ fontSize: '16px', m: 0, p: 0, pr: 0.5 }} />
                        חומרי לימוד
                        {menu === 'חומרי לימוד' &&
                            <div className={`${styles.openMenu} ${styles.withBorder}`}>
                                {
                                    pages && pages
                                        .filter(page => page.type === 'study-material')
                                        .sort((a, b) => {
                                            if (a.name < b.name) {
                                                return -1;
                                            }
                                            if (a.name > b.name) {
                                                return 1;
                                            }
                                            else return 0;
                                        })
                                        .map(page =>
                                            <button
                                                key={page._id}
                                                onClick={() => {
                                                    setPage(`/study-material/${page.name}`)
                                                    setMenu('')
                                                }}
                                            >
                                                {page.name}
                                            </button>
                                        )
                                }
                            </div>
                        }
                    </span>
                }

                {
                    session ?
                        <UserDetails session={session} setPage={setPage} />
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

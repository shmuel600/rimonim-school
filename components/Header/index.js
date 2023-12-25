import styles from '@/styles/Header.module.css'
import Image from 'next/image'
import * as React from 'react'
import { useRouter } from 'next/router'
import { useVisible } from '@/hooks/useVisible'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'

export default function Header() {
    const [menu, setMenu] = React.useState('')
    const router = useRouter()
    const { asPath } = useRouter()
    const pageTop = React.useRef()
    const showBackground = !useVisible(pageTop) || asPath !== '/'

    const setPage = (page) => {
        router.push(page)
    }

    return (
        <>
            <div ref={pageTop}></div>

            <div
                className={`
                ${styles.header} 
                ${asPath === '/' && styles.useTabs} 
                ${showBackground && styles.showBackground}
                `}
                onMouseLeave={() => setMenu('')}
            >

                <Image alt="" width={50} height={50}
                    src="/rimonim_logo_web_white.png"
                    style={{ margin: '0 0.5rem', cursor: 'pointer' }}
                    onClick={() => setPage('/')}
                />

                <button
                    onClick={() => setPage('/')}
                    onMouseOver={() => setMenu('')}
                >
                    דף הבית
                </button>

                <button
                    onMouseOver={() => setMenu('אודות')}
                    className={styles.center}>
                    <KeyboardArrowDownOutlinedIcon sx={{ fontSize: '16px', m: 0, p: 0, pr: 0.5 }} />
                    אודות
                    {menu === 'אודות' &&
                        <div className={styles.menu}>
                            <button onClick={() => setPage('/about/principal')}>
                                דבר המנהלת
                            </button>
                            <button onClick={() => setPage('/about/counselor')}>
                                דבר היועצת
                            </button>
                            <button onClick={() => setPage('/about/image')}>
                                תדמית בית הספר
                            </button>
                            <button onClick={() => setPage('/about/vision')}>
                                חזון בית הספר
                            </button>
                            <button onClick={() => setPage('/about/school')}>
                                על בית הספר
                            </button>
                        </div>
                    }
                </button>

                <button
                    onMouseOver={() => setMenu('אתרי הכיתות')}
                    className={styles.center}>
                    <KeyboardArrowDownOutlinedIcon sx={{ fontSize: '16px', m: 0, p: 0, pr: 0.5 }} />
                    אתרי הכיתות
                    {menu === 'אתרי הכיתות' &&
                        <div className={styles.menu}>
                            <button>
                                כיתה א 1
                            </button>
                            <button>
                                כיתה א 2
                            </button>
                            <button>
                                כיתה א 3
                            </button>
                            <button>
                                כיתה א 4
                            </button>
                            <button>
                                כיתה א 5
                            </button>
                            <button>
                                כיתה א 6
                            </button>
                            <button>
                                כיתה א 7
                            </button>
                        </div>
                    }
                </button>

                {/* show only 'התחברות' or 'חומרי לימוד' */}
                <button
                    onMouseOver={() => setMenu('חומרי לימוד')}
                    className={styles.center}>
                    <KeyboardArrowDownOutlinedIcon sx={{ fontSize: '16px', m: 0, p: 0, pr: 0.5 }} />
                    חומרי לימוד
                    {menu === 'חומרי לימוד' &&
                        <div className={`${styles.menu} ${styles.menuWrap}`}>
                            <button>
                                חינוך לשוני
                            </button>
                            <button>
                                חינוך מתמטי
                            </button>
                            <button>
                                מדע וטכנולוגיה
                            </button>
                            <button>
                                תקשוב
                            </button>
                            <button>
                                זהירות בדרכים
                            </button>
                            <button>
                                מקצועות טיפוליים
                            </button>
                            <button>
                                כישורי חיים
                            </button>
                            <button>
                                חינוך גופני
                            </button>
                            <button>
                                אומנות
                            </button>
                            <button>
                                מוסיקה
                            </button>
                            <button>
                                חגים
                            </button>
                            <button>
                                מפתח הלב
                            </button>
                            <button>
                                בריאות
                            </button>
                            <button>
                                האחר הוא אני
                            </button>
                            <button>
                                אתרים כלליים
                            </button>
                        </div>
                    }
                </button>

                {/* <button onMouseOver={() => setMenu('')}>
                    התחברות
                </button> */}

            </div>
        </>
    )
}

'use client'
import styles from '@/styles/Footer.module.css'
import * as React from 'react'
import { useRouter } from 'next/router'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Link from "next/link"
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded'
import MailRoundedIcon from '@mui/icons-material/MailRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded'

export default function Footer() {

    const router = useRouter()
    const [activeIcon, setActiveIcon] = React.useState('')

    const setPage = (page) => {
        router.push(`/home/${page}`)
    }

    return (
        <>
            <div
                className={styles.footer}
            >
                <div className={styles.footerContent}>

                    <div className={styles.footerLinks}>
                        <div className={styles.contact}>
                            <div className={styles.links}>
                                {`צור קשר`}
                            </div>
                            <Link href={'tel:08-6281306'} target="_blank" onMouseEnter={() => setActiveIcon('phone')} onMouseLeave={() => setActiveIcon('')} className={styles.footerButton}>
                                <PhoneEnabledRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} className={`${activeIcon === 'phone' ? styles.icon : ''}`} />
                                {`08-6281306`}
                            </Link>
                            <Link href={'mailto:geulim10@walla.co.il'} target="_blank" onMouseEnter={() => setActiveIcon('mail')} onMouseLeave={() => setActiveIcon('')} className={styles.footerButton}>
                                <MailRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} className={`${activeIcon === 'mail' ? styles.icon : ''}`} />
                                {`geulim10@walla.co.il`}
                            </Link>
                            <Link href={'https://www.google.com/maps/place/%D7%A8%D7%99%D7%9E%D7%95%D7%A0%D7%99%D7%9D+%D7%91%D7%99%D7%AA+%D7%A1%D7%A4%D7%A8%E2%80%AD/@31.2569719,34.7632206,15z/data=!4m6!3m5!1s0x150265dd51f975a1:0x4776afd8c0c869b5!8m2!3d31.2569719!4d34.7632206!16s%2Fg%2F11cly_0cn1?entry=ttu'} target="_blank" onMouseEnter={() => setActiveIcon('location')} onMouseLeave={() => setActiveIcon('')} className={styles.footerButton}>
                                <PlaceRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} className={`${activeIcon === 'location' ? styles.icon : ''}`} />
                                {`ישראל ישעיהו 1, באר שבע`}
                            </Link>
                        </div>
                        <div className={styles.links}>
                            <div onClick={() => setPage('פרויקטים מיוחדים')} onMouseEnter={() => setActiveIcon('projects')} onMouseLeave={() => setActiveIcon('')} className={styles.footerButton}>
                                <InsertEmoticonRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} className={`${activeIcon === 'projects' ? styles.icon : ''}`} />
                                {`פרויקטים מיוחדים`}
                            </div>
                            <div onClick={() => setPage('חירום')} onMouseEnter={() => setActiveIcon('emergency')} onMouseLeave={() => setActiveIcon('')} className={styles.footerButton}>
                                <WarningRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} className={`${activeIcon === 'emergency' ? styles.icon : ''}`} />
                                {`חירום`}
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div className={styles.footerText}>
                        {`בית הספר עושה כל שביכולתו לשמירת זכות יוצרים וזכות הפרט בחומרים המצויים באתר הבית ספרי.`}
                        <br />
                        {`למרות המעקב העקבי והרצוף אחרי הפעילות באתר בית הספר, 
                        ייתכן שחומר או פריט מידע מסוים, 
                        שהועלה לאתר באמצעות עורכי משנה (מורים ו/או תלמידים), 
                        מפר באופן כלשהו את זכות היוצרים ו/או זכות הפרט.`}
                        <br />
                        {`כל פנייה בנדון תזכה למרב תשומת הלב ולפעולה מידית בהתאם לצורך.`}
                        <br />
                        {`בית הספר מתחייב להסיר כל פריט המפר זכות יוצרים ו/או זכות הפרט בזמן סביר ממועד קבלת הפנייה, 
                        לאחר שבדק ומצא שהיא מוצדקת, 
                        והוא מתחייב ליידע את האחראי להפרה זו ולהתריע בפניו על העלאת חומרים אלה, 
                        כדי למנוע הישנות מקרים שכאלה.`}
                    </div>

                </div>

                <div className={styles.credit}>
                    <span>{`© 2024 `}</span>
                    <span>{` • `}</span>
                    <span>{` Shmuel Gerstenfeld `}</span>
                    <span>{` • `}</span>
                    <span>{` שמואל גרסטנפלד`}</span>
                    <Link href={'https://www.linkedin.com/in/shmuel600'} target="_blank" className={styles.linkedIn}>
                        <LinkedInIcon sx={{ m: 0, p: 0, mt: 0.7 }} />
                    </Link>
                </div>

            </div>
        </>
    )
}
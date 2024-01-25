'use client'
import styles from '@/styles/Footer.module.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Link from "next/link"
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded'
import SegmentRoundedIcon from '@mui/icons-material/SegmentRounded'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded'
import MoodRoundedIcon from '@mui/icons-material/MoodRounded'

export default function Footer() {

    return (
        <>
            <div
                className={styles.footer}
            >
                <div className={styles.footerContent}>
                    <div className={styles.links}>
                        <Link href={'https://wa.me/972507721545'} target="_blank">
                            <PhoneEnabledRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} />
                            {`צור קשר`}
                        </Link>
                        <div>
                            <SegmentRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} />
                            {`תקנון בית הספר`}
                        </div>
                        <div>
                            <WarningRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} />
                            {`חירום`}
                        </div>
                        <div>
                            <InsertEmoticonRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} />
                            {`פרויקטים מיוחדים`}
                        </div>
                    </div>
                    <hr />
                    <div style={{ width: '50%', margin: '1.5rem' }}>
                        <div
                            style={{ textAlign: 'right', fontSize: 'smaller', color: 'rgba(255,255,255,0.2)' }}
                        >
                            {
                                `בית הספר עושה כל שביכולתו לשמירת זכות יוצרים וזכות הפרט בחומרים המצויים באתר הבית ספרי.`
                            }
                            <br />
                            {
                                `למרות המעקב העקבי והרצוף אחרי הפעילות באתר בית הספר, 
                        ייתכן שחומר או פריט מידע מסוים, 
                        שהועלה לאתר באמצעות עורכי משנה (מורים ו/או תלמידים), 
                        מפר באופן כלשהו את זכות היוצרים ו/או זכות הפרט.`
                            }
                            <br />
                            {
                                `כל פנייה בנדון תזכה למרב תשומת הלב ולפעולה מידית בהתאם לצורך.`
                            }
                            <br />
                            {
                                `בית הספר מתחייב להסיר כל פריט המפר זכות יוצרים ו/או זכות הפרט בזמן סביר ממועד קבלת הפנייה, 
                        לאחר שבדק ומצא שהיא מוצדקת, 
                        והוא מתחייב ליידע את האחראי להפרה זו ולהתריע בפניו על העלאת חומרים אלה, 
                        כדי למנוע הישנות מקרים שכאלה.`
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.credit}>
                    <span>{`© 2024 `}</span>
                    <span>{` • `}</span>
                    <span>{` Shmuel Gerstenfeld `}</span>
                    <span>{` • `}</span>
                    <span>{` שמואל גרסטנפלד`}</span>
                    <a href="https://www.linkedin.com/in/shmuel600/">
                        <LinkedInIcon sx={{ m: 0, p: 0, mt: 0.7, color: 'rgba(255, 255, 255, 0.1)' }} />
                    </a>
                </div>
            </div>
        </>
    )
}
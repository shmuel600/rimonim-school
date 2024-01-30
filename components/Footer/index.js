'use client'
import styles from '@/styles/Footer.module.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Link from "next/link"
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded'
import MailRoundedIcon from '@mui/icons-material/MailRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded'

export default function Footer() {

    return (
        <>
            <div
                className={styles.footer}
            >
                <div className={styles.footerContent}>
                    <div>
                        <div className={styles.contact}>
                            <div className={styles.links}>
                                {`צור קשר`}
                            </div>
                            <Link href={'tel:+972-08-6281306'} target="_blank">
                                <PhoneEnabledRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} />
                                {`08-6281306`}
                            </Link>
                            <Link href={'mailto:geulim10@walla.co.il'} target="_blank">
                                <MailRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} />
                                {`geulim10@walla.co.il`}
                            </Link>
                            <Link href={'https://www.google.com/maps/place/%D7%A8%D7%99%D7%9E%D7%95%D7%A0%D7%99%D7%9D+%D7%91%D7%99%D7%AA+%D7%A1%D7%A4%D7%A8%E2%80%AD/@31.2569719,34.7632206,15z/data=!4m6!3m5!1s0x150265dd51f975a1:0x4776afd8c0c869b5!8m2!3d31.2569719!4d34.7632206!16s%2Fg%2F11cly_0cn1?entry=ttu'} target="_blank">
                                <PlaceRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} />
                                {`ישראל ישעיהו 1, באר שבע`}
                            </Link>
                        </div>
                        <div className={styles.links}>
                            <div>
                                <InsertEmoticonRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} />
                                {`פרויקטים מיוחדים`}
                            </div>
                            <div>
                                <WarningRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} />
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
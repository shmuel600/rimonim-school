'use client'
import styles from '@/styles/Footer.module.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Link from "next/link"
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import SegmentRoundedIcon from '@mui/icons-material/SegmentRounded'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded'

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
                            <Groups2RoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1.5, mr: 0 }} />
                            {`צוות בית הספר`}
                        </div>
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
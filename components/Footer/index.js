'use client'
import styles from '@/styles/Footer.module.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {

    return (
        <>
            <div
                className={styles.footer}
            >
                <div className={styles.credit}>
                    <span>{`© 2024 `}</span>
                    <span>{` • `}</span>
                    <span>{` Shmuel Gerstenfeld `}</span>
                    <span>{` • `}</span>
                    <span>{` שמואל גרסטנפלד`}</span>
                    <a href="https://www.linkedin.com/in/shmuel600/">
                        <LinkedInIcon sx={{ m: 0, p: 0, mt: 1, color: 'rgba(255, 255, 255, 0.1)' }} />
                    </a>
                </div>
            </div>
        </>
    )
}
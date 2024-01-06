import styles from '@/styles/Admin.module.css'
import { useRouter } from 'next/router'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export default function AdminHeader({ activeTab, setActiveTab }) {
    const router = useRouter()

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Tabs
            value={activeTab}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
            centered
            className={styles.tabs}
            sx={{ direction: 'rtl', background: '#495463', width: '100%', position: 'fixed', top: 0 }}
        >
            <Tab className={styles.tab} label="דפים" />
            <Tab className={styles.tab} label="משתמשים" />
            <Tab className={styles.tab} label="גלריה" />
            <Tab className={styles.tab} label="דף הבית" onClick={() => router.push('/')} />
        </Tabs>
    );
}
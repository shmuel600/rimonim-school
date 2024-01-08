import styles from '@/styles/Admin.module.css'
import { useRouter } from 'next/router'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded'
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

export default function AdminHeader({ activeTab, setActiveTab }) {
    const router = useRouter()

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Tabs
            value={activeTab}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            centered
            className={styles.tabs}
        >

            <Tab className={styles.tab} label={
                <div style={{ display: 'flex' }}>
                    <PeopleRoundedIcon className={styles.headerIcon} fontSize='small' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                    <div>
                        הרשאות
                    </div>
                </div>
            } />

            <Tab className={styles.tab} label={
                <div style={{ display: 'flex' }}>
                    <SpaceDashboardRoundedIcon className={styles.headerIcon} fontSize='small' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                    <div>
                        דפים
                    </div>
                </div>
            } />

            <Tab className={styles.tab} label={
                <div style={{ display: 'flex' }}>
                    <CollectionsRoundedIcon className={styles.headerIcon} fontSize='small' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                    <div>
                        גלריה
                    </div>
                </div>
            } />

            <div onClick={() => router.push('/')}>
                <Tab className={styles.tab} label={
                    <div className={styles.exitToHomePageButton}>
                        <LogoutRoundedIcon className={styles.headerIcon} fontSize='small' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                        <div>
                            יציאה
                        </div>
                    </div>
                } />
            </div>

        </Tabs>
    );
}
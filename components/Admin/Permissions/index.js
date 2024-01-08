import styles from '@/styles/Admin.module.css'
import * as React from 'react'
import Classes from '@/components/Admin/Permissions/ByClass/Classes'
import Users from '@/components/Admin/Permissions/ByUser/Users'

export default function Pages({ classes, users, pageTop, updateUserPermissions }) {

    const [tab, setTab] = React.useState('כיתות')



    return (
        <>
            {/* option to add class */}
            {/* add permission: "all classes", to users page */}
            {/* option to add study material? */}
            <strong className={styles.tableHeader} style={{ color: 'darkgray' }}>
                <div className={styles.category} >
                    <div
                        onClick={() => setTab('כיתות')}
                        className={tab === 'משתמשים' ? styles.pagesTab : ''}
                    >
                        הרשאת עריכה לכיתות
                    </div>
                    <div
                        onClick={() => setTab('משתמשים')}
                        className={tab === 'כיתות' ? styles.pagesTab : ''}

                    >
                        הרשאות משתמשים
                    </div>
                </div>
            </strong>
            {
                tab === 'כיתות' &&
                <Classes
                    classes={classes}
                    users={users}
                    pageTop={pageTop}
                    updateUserPermissions={updateUserPermissions}
                />
            }
            {
                tab === 'משתמשים' &&
                <Users users={users} updateUserPermissions={updateUserPermissions} />
            }
        </>
    )
}
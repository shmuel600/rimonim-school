import styles from '@/styles/Admin.module.css'
import * as React from 'react'
import Context from '@/contexts/context'
import KeyRoundedIcon from '@mui/icons-material/KeyOutlined'
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded'

export default function Users({ users, updateUserPermissions }) {
    const { pages } = React.useContext(Context);
    const [menu, setMenu] = React.useState('')

    return (
        <div onMouseLeave={() => setMenu('')}>
            {users.map(user =>
                <div
                    key={user._id}
                    className={`${styles.row} ${styles.clickable}`}
                    onClick={() => {
                        setMenu(menu === user.name ? '' : user.name)
                    }}
                >
                    <div className={styles.tableRow} style={{ height: '3rem' }}>

                        <div className={styles.category}>
                            <div>{user.name}</div>
                        </div>

                        <div className={styles.category} style={{ textAlign: 'left' }}>

                            <div className={styles.userMenu}>
                                {user.permissions &&
                                    (user.permissions === 'admin' ?
                                        'מנהל הרשאות'
                                        :
                                        (pages.map(page =>
                                            page._id === user.permissions && page.name
                                        ))
                                    )
                                }
                                {menu === user.name &&
                                    <div className={`${styles.openMenu} ${user.permissions ? styles.hasPermission : styles.noPermission}`}>
                                        {user.permissions !== 'admin' &&
                                            <div onClick={() => updateUserPermissions(user, 'admin')}>
                                                הפוך למנהל
                                                <KeyRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                            </div>
                                        }
                                        {user.permissions &&
                                            <div onClick={() => updateUserPermissions(user, null)}>
                                                הסר הרשאה
                                                <PersonRemoveRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}
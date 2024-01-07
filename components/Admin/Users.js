import styles from '@/styles/Admin.module.css'
import * as React from 'react'
import Context from '@/contexts/context'

export default function Users({ users, updateUserPermissions }) {
    const { pages } = React.useContext(Context);
    const [menu, setMenu] = React.useState('')

    return (
        <div onMouseLeave={() => setMenu('')}>
            <strong className={styles.tableHeader} style={{ color: 'darkgray' }} >
                <div className={styles.category} >

                    <div>
                        הרשאות משתמשים
                    </div>

                </div>
            </strong>
            {users.map(user =>
                <div
                    key={user._id}
                    className={styles.row}
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
                                            </div>
                                        }
                                        {user.permissions &&
                                            <div onClick={() => updateUserPermissions(user, null)}>
                                                הסר הרשאה
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
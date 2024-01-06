import styles from '@/styles/Admin.module.css'
import * as React from 'react'
import ClassesList from './ClassesList'

export default function PagesPermissions({ pages, users, setUsers, pageTop }) {

    const [activeRow, setActiveRow] = React.useState('')
    const [previouslyActiveRow, setPreviouslyActiveRow] = React.useState('')

    const classes = pages.filter(page => page.type === 'class')
    const studyMaterials = pages.filter(page => page.type === 'study-material')

    return (
        <>
            {/* option to add class */}
            {/* add permission: "all classes", to users page */}
            {/* option to add study material? */}
            <strong className={styles.tableHeader} style={{ color: 'darkgray' }} >
                <div className={styles.category} >
                    <div>
                        הרשאת עריכה לכיתות
                    </div>
                </div>
            </strong>
            {classes.map(classPage =>
                <ClassesList
                    key={classPage._id}
                    users={users}
                    setUsers={setUsers}
                    activeRow={activeRow}
                    setActiveRow={setActiveRow}
                    previouslyActiveRow={previouslyActiveRow}
                    setPreviouslyActiveRow={setPreviouslyActiveRow}
                    classPage={classPage}
                    pageTop={pageTop}
                />
            )}

            {/* <strong className={styles.addNew} style={{ color: 'darkgray' }} >
                <div className={styles.category} >
                    <input type="text" defaultValue='כיתה א' />
                </div>
                <div className={styles.category} >
                    <div></div>
                    <button>
                        כיתה חדשה
                    </button>
                </div>
            </strong> */}

            {/* <br />
            Study Materials:
            {studyMaterials.map(studyMaterialPage =>
                <div key={studyMaterialPage._id}>
                    {studyMaterialPage.name}
                </div>
            )} */}
        </>
    )
}
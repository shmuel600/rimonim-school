'use client'
import * as React from 'react'
import Class from "@/components/Admin/Permissions/ByClass/Class"

export default function Classes({ classes, users, pageTop, updateUserPermissions }) {

    const [activeRow, setActiveRow] = React.useState('')
    const [previouslyActiveRow, setPreviouslyActiveRow] = React.useState('')

    return (
        <>
            {
                classes
                    .sort((a, b) => a.name.replace(/\D/g, '') - b.name.replace(/\D/g, ''))
                    .map(classPage =>
                        <Class
                            key={classPage._id}
                            users={users}
                            activeRow={activeRow}
                            setActiveRow={setActiveRow}
                            previouslyActiveRow={previouslyActiveRow}
                            setPreviouslyActiveRow={setPreviouslyActiveRow}
                            classPage={classPage}
                            pageTop={pageTop}
                            updateUserPermissions={updateUserPermissions}
                        />
                    )
            }
            {
                classes.length === 0 &&
                <div style={{ direction: 'rtl', margin: '2rem' }}>
                    {`אין עדיין כיתות. ניתן להוסיף כיתות חדשות בכרטיסיה "דפים".`}
                </div>
            }
        </>
    )
}
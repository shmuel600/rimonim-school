'use client'
import * as React from 'react'
import Class from "@/components/Admin/Permissions/ByClass/Class"

export default function Classes({ classes, users, pageTop, updateUserPermissions }) {

    const [activeRow, setActiveRow] = React.useState('')
    const [previouslyActiveRow, setPreviouslyActiveRow] = React.useState('')

    return (
        <>
            {
                classes.map(classPage =>
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
        </>
    )
}
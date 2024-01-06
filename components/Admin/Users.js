import * as React from 'react'

export default function Users({ users }) {

    return (
        <>
            {
                users.map(user =>
                    <div key={user._id}>
                        {user.name}{user.permissions}
                    </div>
                )
            }
        </>
    )
}
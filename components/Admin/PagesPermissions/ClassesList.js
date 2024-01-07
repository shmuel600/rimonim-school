'use client'
import styles from '@/styles/Admin.module.css'
import * as React from 'react'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import SetPermissions from '@/components/Admin/PagesPermissions/SetPermissions'

export default function ClassesList({
    activeRow,
    setActiveRow,
    previouslyActiveRow,
    setPreviouslyActiveRow,
    classPage,
    users,
    pageTop,
    updateUserPermissions
}) {

    const [chosenUser, setChosenUser] = React.useState('')
    const [viewedUser, setViewedUser] = React.useState('')

    React.useEffect(() => {
        previouslyActiveRow.length > 0 && setTimeout(() => { setPreviouslyActiveRow('') }, 1000)
    }, [previouslyActiveRow, setPreviouslyActiveRow])

    React.useEffect(() => {
        const fetchUserByPageId = async () => {
            try {
                const fetchedUser = await fetch(`/api/page/${classPage?._id}`, {
                    headers: { 'Content-Type': 'application/json' },
                });
                const json = await fetchedUser.json();
                setViewedUser(json.name)
            }
            catch (error) {
                console.log("could not fetch user;", error.message)
            }
        }
        fetchUserByPageId()
    }, [users, classPage])

    const handleSave = (chosenUserToSave, viewedUserToRemove) => {
        if (chosenUserToSave !== '') {
            handleUpdate(chosenUserToSave, classPage._id)
            setChosenUser('')
        }
        if (viewedUserToRemove !== '') {
            handleUpdate(viewedUserToRemove, null)
        }
        setViewedUser(chosenUserToSave)
        pageTop.current.scrollIntoView({ behavior: "smooth" })
    }

    const handleUpdate = async (userName, permissions) => {
        const user = users.filter(user => user.name === userName)[0]
        if (user) updateUserPermissions(user, permissions)
    }

    return (
        <>
            {
                users.length > 0 &&
                <div
                    className={styles.row}
                    onClick={() => {
                        setActiveRow(activeRow === classPage.name ? '' : classPage.name)
                        setPreviouslyActiveRow(activeRow === previouslyActiveRow ? '' : activeRow)
                    }}
                >
                    <div className={styles.tableRow}>
                        <div className={styles.category} >
                            <div>
                                {classPage.name}
                            </div>
                            <div>
                                {viewedUser}
                            </div>
                        </div>
                        <KeyboardArrowDownOutlinedIcon
                            className={`
                                ${styles.arrow}
                                ${activeRow === classPage.name && styles.arrowActive}
                                ${previouslyActiveRow === classPage.name && styles.arrowInactive}
                            `}
                        />
                    </div>
                    <div
                        hidden={activeRow !== classPage.name && previouslyActiveRow !== classPage.name}
                        className={`
                            ${styles.details} 
                            ${activeRow === classPage.name && styles.detailsActive}
                            ${previouslyActiveRow === classPage.name && styles.detailsInactive}
                        `}
                    >
                        <SetPermissions
                            users={users}
                            viewedUser={viewedUser}
                            chosenUser={chosenUser}
                            setChosenUser={setChosenUser}
                            handleSave={handleSave}
                            hideSaveButton={previouslyActiveRow === classPage.name}
                        />
                    </div>
                </div>
            }
        </>
    )
}
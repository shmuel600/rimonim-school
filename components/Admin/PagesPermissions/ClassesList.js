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
    setUsers,
    pageTop
}) {

    const [currentUser, setCurrentUser] = React.useState('')

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
                setCurrentUser(json.name)
            }
            catch (error) {
                error.message !== "Unexpected end of JSON input" &&
                    console.log("could not fetch user;", error.message);
            }
        }
        currentUser === '' && fetchUserByPageId()
    }, [currentUser, classPage])

    const handleSave = (newValue, removedUser) => {
        const chosenUser = newValue ? users.filter(user => user.name === newValue)[0]?.name : '';
        setCurrentUser(chosenUser)
        pageTop.current.scrollIntoView({ behavior: "smooth" })
        if (chosenUser !== '') {
            updateUserPermissions(chosenUser, classPage._id)
        }
        updateUserPermissions(removedUser, null)
    }

    const updateUserPermissions = async (userName, permissions) => {
        const userToUpdate = users.filter(user => user.name === userName)[0]
        if (userToUpdate)
            try {
                await fetch(`/api/user/${userToUpdate._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ permissions })
                });
                refreshUsers()
            }
            catch (error) {
                console.log(error.message, "could_not_update_permissions");
            }
    }

    const refreshUsers = async () => {
        try {
            const fetchedUsers = await fetch("/api/user", {
                headers: { 'Content-Type': 'application/json' },
            });
            const json = await fetchedUsers.json();
            setUsers(json);
        }
        catch (error) {
            console.log(error.message);
        }
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
                                {currentUser}
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
                            currentUser={currentUser}
                            handleSave={handleSave}
                            hideSaveButton={previouslyActiveRow === classPage.name}
                        />
                    </div>
                </div>
            }
        </>
    )
}
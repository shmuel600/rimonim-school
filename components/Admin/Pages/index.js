'use client'
import styles from '@/styles/Admin.module.css'
import * as React from 'react'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import Modal from '@/components/Modal/Modal'
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded'

export default function EditPages({ classes, studyMaterials }) {

    const [modalOpen, setModalOpen] = React.useState(false);
    const [editName, setEditName] = React.useState('');
    const [idToDelete, setIdToDelete] = React.useState('');

    const updatePage = async (method, path, id, body = '') => {
        try {
            const fetchedPage = await fetch(`/api/${path}/${id}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ body })
            });
            const json = await fetchedPage.json();
        }
        catch (error) {
            console.log(error.message, "could_not_create_content");
        }
    }

    const handleCreate = async (name, type) => {
        try {
            const fetchedPage = await fetch(`/api/page`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, type })
            });
            const json = await fetchedPage.json();
        }
        catch (error) {
            console.log(error.message, "could_not_create_content");
        }
    }

    const handleRename = (id, newName, accepted = false) => {
        if (!newName.length > 0 || !accepted) {
            setEditName(id)
        }
        else {
            setEditName('')
            updatePage('PATCH', 'page', id, newName)
        }
    }

    const handleDelete = (id, accepted = false) => {
        if (id !== idToDelete && !accepted) {
            setIdToDelete(id)
            setModalOpen(true)
        }
        else {
            // remember to update user permissions to null
            updatePage('DELETE', 'page', idToDelete)
            updatePage('DELETE', 'content', idToDelete)
            setIdToDelete('')
        }
    }

    const handleClose = () => {
        setModalOpen(false)
    }

    return (
        <>

            <strong className={styles.tableHeader} style={{ color: 'darkgray' }} >
                <div className={styles.category} >
                    <div>
                        כיתות
                    </div>
                </div>
            </strong>

            {classes.map(_class =>
                <div key={_class._id} className={styles.row}>
                    <div className={styles.tableRow}>

                        <div className={styles.category}>
                            {
                                editName === _class._id ?
                                    <div>
                                        לרשום כאן
                                    </div>
                                    :
                                    <div>
                                        {_class.name}
                                    </div>
                            }
                        </div>

                        <div className={styles.category}>
                            <div
                                className={styles.detailsButton}
                                onClick={() => handleRename(_class._id, newName)}
                            >
                                <EditRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                שנה שם
                            </div>
                            <div
                                className={styles.detailsButton}
                                onClick={() => handleDelete(_class._id)}
                            >
                                <DeleteRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                מחק
                            </div>
                        </div>

                    </div>
                </div>
            )}

            <div className={styles.row} style={{ color: 'darkgray' }} >
                <div className={styles.tableRow}>
                    <div className={styles.category} >
                        <div>
                            לרשום כאן
                        </div>
                    </div>
                    <div className={styles.category} >
                        <div
                            className={styles.detailsButton}
                            onClick={() => handleCreate('class', newName)}
                        >
                            <SaveAltRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                            כיתה חדשה
                        </div>
                    </div>
                </div>
            </div>

            <strong className={styles.tableHeader} style={{ color: 'darkgray' }} >
                <div className={styles.category} >
                    <div>
                        חומרי לימוד
                    </div>
                </div>
            </strong>

            {studyMaterials.map(studyMaterial =>
                <div key={studyMaterial._id} className={styles.row}>
                    <div className={styles.tableRow}>

                        <div className={styles.category}>
                            {
                                editName === studyMaterial._id ?
                                    <div>
                                        לרשום כאן
                                    </div>
                                    :
                                    <div>
                                        {studyMaterial.name}
                                    </div>
                            }
                        </div>

                        <div className={styles.category}>
                            <div
                                className={styles.detailsButton}
                                onClick={() => handleRename(studyMaterial._id, newName)}
                            >
                                <EditRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                שנה שם
                            </div>
                            <div
                                className={styles.detailsButton}
                                onClick={() => handleDelete(studyMaterial._id)}
                            >
                                <DeleteRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                מחק
                            </div>
                        </div>

                    </div>
                </div>
            )}

            <div className={styles.row} style={{ color: 'darkgray' }} >
                <div className={styles.tableRow}>
                    <div className={styles.category} >
                        <div>
                            לרשום כאן
                        </div>
                    </div>
                    <div className={styles.category} >
                        <div
                            className={styles.detailsButton}
                            onClick={() => handleCreate('study-material', newName)}
                        >
                            <SaveAltRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                            חומר לימוד חדש
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={modalOpen}
                handleClose={handleClose}
                content={
                    <div style={{
                        border: 'transparent',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '100%'
                    }}
                    >
                        <div>
                            פעולה זו תמחק את הדף.
                            <br />
                            האם את/ה בטוח/ה שברצונך להמשיך?
                        </div>
                        <div className={styles.detailsButtonsContainer}>
                            <div className={styles.detailsButton} onClick={() => handleDelete(idToDelete, true)}>
                                כן
                            </div>
                            <div className={styles.detailsButton} onClick={handleClose}>
                                לא
                            </div>
                        </div>
                    </div>
                }
            />

        </>
    )
}
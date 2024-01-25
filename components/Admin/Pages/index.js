'use client'
import styles from '@/styles/Admin.module.css'
import * as React from 'react'
import Modal from '@/components/Modal/Modal'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded'
import BlockRoundedIcon from '@mui/icons-material/BlockRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'

export default function EditPages({ pages, refreshPages }) {

    const inputRef = React.useRef();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [editName, setEditName] = React.useState('');
    const [toDelete, setToDelete] = React.useState('');

    const updatePage = async (method, id, name = '') => {
        try {
            const fetchedPage = await fetch(`/api/page/${id}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            const json = await fetchedPage.json();
            refreshPages()
        }
        catch (error) {
            console.log(error.message, `could_not_${method.toLowerCase()}_page`);
        }
    }

    const handleCreate = async (type, name) => {
        try {
            const fetchedPage = await fetch(`/api/page`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, type })
            });
            const json = await fetchedPage.json();
            refreshPages()
            setEditName('')
        }
        catch (error) {
            console.log(error.message, "could_not_create_content");
        }
    }

    const handleRename = (newName) => {
        updatePage('PATCH', editName, newName)
        setEditName('')
    }

    const handleDelete = () => {
        updatePage('DELETE', toDelete)
        closeModal()
    }

    const openModal = (id) => {
        setToDelete(id)
        setModalOpen(true)
    }

    const closeModal = () => {
        setToDelete('')
        setModalOpen(false)
    }

    return (
        <>

            <strong className={styles.tableHeader} style={{ color: 'darkgray' }} >
                <div className={styles.category} >
                    <div>
                        {`כיתות`}
                    </div>
                </div>
            </strong>

            {pages
                .filter(page => page.type === 'class')
                .sort((a, b) => a.name.replace(/\D/g, '') - b.name.replace(/\D/g, ''))
                .map(_class =>
                    <div key={_class._id} className={styles.row}>
                        <div className={styles.tableRow}>

                            <div className={styles.category}>
                                {
                                    editName === _class._id ?
                                        <input
                                            type="text"
                                            defaultValue={_class.name}
                                            ref={inputRef}
                                            maxlength="9"
                                            autoFocus
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleRename(inputRef.current.value);
                                                }
                                                if (e.key === 'Escape') {
                                                    e.preventDefault();
                                                    setEditName('');
                                                }
                                            }}
                                        />
                                        :
                                        <div>
                                            {_class.name}
                                        </div>
                                }
                            </div>

                            <div className={styles.category}>
                                {
                                    editName === _class._id ?
                                        <>
                                            <div
                                                className={styles.detailsButton}
                                                onClick={() => handleRename(inputRef.current.value)}
                                            >
                                                <SaveAltRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                                שמור
                                            </div>
                                            <div
                                                className={styles.detailsButton}
                                                onClick={() => setEditName('')}
                                            >
                                                <BlockRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                                בטל
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div
                                                className={styles.detailsButton}
                                                onClick={() => setEditName(_class._id)}
                                            >
                                                <EditRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                                שנה שם
                                            </div>
                                        </>
                                }
                                <div
                                    className={styles.detailsButton}
                                    onClick={() => openModal(_class._id)}
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
                    {
                        editName === 'newClass' ?
                            <div className={styles.category} >
                                <input
                                    type="text"
                                    defaultValue={`כיתה א'`}
                                    ref={inputRef}
                                    maxlength="9"
                                    autoFocus
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleCreate('class', inputRef.current.value);
                                        }
                                        if (e.key === 'Escape') {
                                            e.preventDefault();
                                            setEditName('');
                                        }
                                    }}
                                />
                            </div>
                            : <div></div>
                    }
                    <div className={styles.category} >
                        {
                            editName === 'newClass' ?
                                <>
                                    <div
                                        className={styles.detailsButton}
                                        onClick={() => handleCreate('class', inputRef.current.value)}
                                    >
                                        <SaveAltRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                        שמור
                                    </div>
                                    <div
                                        className={styles.detailsButton}
                                        onClick={() => setEditName('')}
                                    >
                                        <BlockRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                        בטל
                                    </div>
                                </>
                                :
                                <div
                                    className={styles.detailsButton}
                                    onClick={() => setEditName('newClass')}
                                >
                                    <AddRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                    כיתה חדשה
                                </div>
                        }
                    </div>
                </div>
            </div>




            <strong className={styles.tableHeader} style={{ color: 'darkgray' }} >
                <div className={styles.category} >
                    <div>
                        {`חומרי לימוד`}
                    </div>
                </div>
            </strong>

            {pages
                .filter(page => page.type === 'study-material')
                .sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    else return 0;
                })
                .map(studyMaterial =>
                    <div key={studyMaterial._id} className={styles.row}>
                        <div className={styles.tableRow}>

                            <div className={styles.category}>
                                {
                                    editName === studyMaterial._id ?
                                        <input
                                            type="text"
                                            defaultValue={studyMaterial.name}
                                            ref={inputRef}
                                            autoFocus
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleRename(inputRef.current.value);
                                                }
                                                if (e.key === 'Escape') {
                                                    e.preventDefault();
                                                    setEditName('');
                                                }
                                            }}
                                        />
                                        :
                                        <div>
                                            {studyMaterial.name}
                                        </div>
                                }
                            </div>

                            <div className={styles.category}>
                                {
                                    editName === studyMaterial._id ?
                                        <>
                                            <div
                                                className={styles.detailsButton}
                                                onClick={() => handleRename(inputRef.current.value)}
                                            >
                                                <SaveAltRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                                שמור
                                            </div>
                                            <div
                                                className={styles.detailsButton}
                                                onClick={() => setEditName('')}
                                            >
                                                <BlockRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                                בטל
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div
                                                className={styles.detailsButton}
                                                onClick={() => setEditName(studyMaterial._id)}
                                            >
                                                <EditRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                                שנה שם
                                            </div>
                                        </>
                                }
                                <div
                                    className={styles.detailsButton}
                                    onClick={() => openModal(studyMaterial._id)}
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
                    {
                        editName === 'newStudyMaterial' ?
                            <div className={styles.category} >
                                <input
                                    type="text"
                                    defaultValue=''
                                    ref={inputRef}
                                    autoFocus
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleCreate('study-material', inputRef.current.value);
                                        }
                                        if (e.key === 'Escape') {
                                            e.preventDefault();
                                            setEditName('');
                                        }
                                    }}
                                />
                            </div>
                            : <div></div>
                    }
                    <div className={styles.category} >
                        {
                            editName === 'newStudyMaterial' ?
                                <>
                                    <div
                                        className={styles.detailsButton}
                                        onClick={() => handleCreate('study-material', inputRef.current.value)}
                                    >
                                        <SaveAltRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                        שמור
                                    </div>
                                    <div
                                        className={styles.detailsButton}
                                        onClick={() => setEditName('')}
                                    >
                                        <BlockRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                        בטל
                                    </div>
                                </>
                                :
                                <div
                                    className={styles.detailsButton}
                                    onClick={() => setEditName('newStudyMaterial')}
                                >
                                    <AddRoundedIcon fontSize='smaller' sx={{ mb: -0.5, ml: 1, mr: -0.5 }} />
                                    חומר לימוד חדש
                                </div>
                        }
                    </div>
                </div>
            </div>

            <Modal
                open={modalOpen}
                handleClose={closeModal}
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
                            <div className={styles.detailsButton} onClick={handleDelete}>
                                כן
                            </div>
                            <div className={styles.detailsButton} onClick={closeModal}>
                                לא
                            </div>
                        </div>
                    </div>
                }
            />

        </>
    )
}
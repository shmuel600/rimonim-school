'use client'
import Fab from '@mui/material/Fab'
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import styles from '@/styles/Editor.module.css'

export default function StartEditButton({ isEditingActive, setIsEditingActive, handleSave, handleSroll }) {
    return (
        <>
            {
                isEditingActive ?
                    <Fab
                        className={styles.fabDoneEdit}
                        onClick={handleSave}
                        sx={{ position: 'fixed', left: '1rem', bottom: '3rem' }}
                        size="medium"
                        color="primary"
                        aria-label="start editing"
                    >
                        <DoneRoundedIcon />
                    </Fab>
                    :
                    <Fab
                        className={styles.fabStartEdit}
                        onClick={() => {
                            setIsEditingActive(true)
                            handleSroll && handleSroll()
                        }}
                        sx={{ position: 'fixed', left: '1rem', bottom: '3rem' }}
                        size="medium"
                        color="primary"
                        aria-label="start editing"
                    >
                        <EditNoteRoundedIcon />
                    </Fab>
            }
        </>
    )
}
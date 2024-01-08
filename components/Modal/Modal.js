import Modal from '@mui/material/Modal'

export default function ModalComponent({ open, handleClose, content }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            hideBackdrop
            disableAutoFocus
            onTransitionEnter={() => setTransition('enter')}
            onTransitionExited={() => setTransition('exit')}
            sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                height: 150,
                bgcolor: '#1a1c23',
                color: '#495463',
                borderRadius: '1rem',
                p: 2,
                boxShadow: 'rgba(0, 0, 0, 0.5) 0 0 0 100vh',
                direction: 'rtl',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            {content}
        </Modal>
    )
}
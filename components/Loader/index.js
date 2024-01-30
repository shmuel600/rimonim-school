import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'


const Loader = styled(Box)({
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '48px',
    height: '48px',
    border: '5px solid #90caf9',
    borderBottom: '5px solid transparent',
    borderRadius: '50%',
    display: 'inline-block',
    boxSizing: 'border-box',
    animation: 'rotate 1s linear infinite',
    "@keyframes rotate": {
        '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
        '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' }
    }
});

const Loader2 = styled(Box)({
    width: '48px',
    height: '48px',
    border: '5px solid #90caf9',
    borderBottom: '5px solid transparent',
    borderRadius: '50%',
    display: 'inline-block',
    boxSizing: 'border-box',
    animation: 'rotate 1s linear infinite',
    "@keyframes rotate": {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
    }
});

export default function Load({ fixed = true }) {
    return fixed ? <Loader /> : <Loader2 />;
};
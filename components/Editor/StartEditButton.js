'use client';

export default function StartEditButton({ setIsActive }) {
    return (
        <>
            <div
                onClick={() => setIsActive(true)}
                style={{ position: 'fixed', bottom: '3rem', right: '3rem', background: 'blue', borderRadius: '50%', width: '3rem', height: '3rem' }}
            >

            </div>
        </>
    )
}
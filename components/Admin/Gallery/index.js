
import styles from '@/styles/Admin.module.css'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Loader from '@/components/Loader'
import Image from 'next/image'

const Input = styled('input')({
    display: 'none',
});
export default function Gallery() {

    const imageInputRef = React.useRef();
    const [gallery, setGallery] = React.useState([])
    const [preview, setPreview] = React.useState('')
    const [hoveredImage, setHoveredImage] = React.useState('')
    const [loading, setLoading] = React.useState('')

    React.useEffect(() => {
        try {
            fetch(`api/image`)
                .then(res => res.json())
                .then(data => setGallery(data))
        }
        catch (error) { console.log(error.message) }
    }, [])

    const uploadImages = (files) => {
        Array.from(files).forEach((file) => uploadImage(file));
    }

    const uploadImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            setLoading('add')
            try {
                const content = await fetch(`api/image`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data: reader.result })
                })
                const fetchedGallery = await content.json();
                setGallery(fetchedGallery);
                setLoading('')
            }
            catch (error) {
                console.log(error)
                alert('הייתה בעיה בהעלאת התמונה, ייתכן והתמונה שוקלת יותר מידי')
                setLoading('')
            }
        };
    };

    const deleteImage = async (id, url) => {
        setLoading(id)
        const filename = (url.split('/')[7] + '/' + url.split('/')[8]).split('.')[0]
        try {
            const content = await fetch(`api/image/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename })
            })
            const fetchedGallery = await content.json();
            setGallery(fetchedGallery);
            setLoading('')
        }
        catch (error) { console.log(error.message) }
    }

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.gallery}>

                {gallery.map(image =>
                    <div
                        key={image._id}
                        className={styles.image}
                        style={{ background: `url(${image.url})` }}
                        onMouseEnter={() => setHoveredImage(image.url)}
                        onMouseLeave={() => setHoveredImage('')}

                    >
                        {loading === image._id ?
                            <Loader fixed={false} />
                            :
                            hoveredImage === image.url &&
                            <>
                                <FullscreenRoundedIcon
                                    onClick={() => setPreview(image.url)}
                                    fontSize='large' className={styles.icon} sx={{ m: 1 }}
                                />
                                <DeleteRoundedIcon
                                    onClick={() => deleteImage(image._id, image.url)}
                                    fontSize='large' className={styles.icon} sx={{ m: 1 }}
                                />
                            </>
                        }
                    </div>
                )}

                <div
                    className={styles.addImage}
                    onMouseEnter={() => setHoveredImage('addNew')}
                    onMouseLeave={() => setHoveredImage('')}
                    onClick={() => { imageInputRef.current.click() }}
                >
                    <Input
                        type="file"
                        multiple
                        accept="image/*"
                        ref={imageInputRef}
                        onChange={(e) => uploadImages(e.target.files)}
                    />
                    {loading === 'add' ?
                        <Loader fixed={false} />
                        :
                        (loading === 'error' ?
                            "error"
                            :
                            <AddRoundedIcon className={hoveredImage === 'addNew' ? styles.icon : ''} sx={{ fontSize: '3rem' }} />
                        )
                    }
                </div>

                {preview !== '' &&
                    <div
                        style={{ width: '100%', height: '100%', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: '1000', background: 'rgba(0, 0, 0, 0.5)' }}
                        onClick={() => setPreview('')}
                    >
                        <div style={{ width: '60%', height: '60%', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                            <CloseRoundedIcon
                                onClick={() => setPreview('')} fontSize='large'
                                sx={{ m: 2, p: 0.5, color: 'whitesmoke', zIndex: '999', position: 'fixed', right: '0', boxShadow: 'rgba(0,0,0,0.2) 0 0 0 1rem inset', borderRadius: '50%' }}
                            />
                            <Image
                                src={preview} fill alt="preview" objectFit='cover' className={styles.previewImage}
                                onClick={e => e.stopPropagation()}
                            />
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

import styles from '@/styles/Gallery.module.css'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import Loader from '@/components/Loader'

const Input = styled('input')({
    display: 'none',
});
export default function HomePageGallery() {

    const imageInputRef = React.useRef();
    const [gallery, setGallery] = React.useState([])
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
            catch (error) { console.log(error.message) }
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
        <div className={styles.page}>
            <div className={styles.gallery}>

                {gallery.map(image =>
                    <div
                        key={image._id}
                        className={styles.image}
                        style={{ background: `url(${image.url})` }}
                        onMouseEnter={() => setHoveredImage(image.url)}
                        onMouseLeave={() => setHoveredImage('')}
                        onClick={() => deleteImage(image._id, image.url)}
                    >
                        {loading === image._id ?
                            <Loader fixed={false} />
                            :
                            (hoveredImage === image.url && <DeleteRoundedIcon fontSize='large' className={styles.icon} />)
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
                        <AddRoundedIcon className={hoveredImage === 'addNew' ? styles.icon : ''} sx={{ fontSize: '3rem' }} />
                    }
                </div>

            </div>
        </div>
    )
}
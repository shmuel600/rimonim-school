import * as React from 'react'
import styles from '@/styles/Gallery.module.css'
import Image from 'next/image'
import Carousel from './Carousel'

export default function Gallery() {

    const [gallery, setGallery] = React.useState('')

    React.useEffect(() => {
        try {
            fetch(`api/image`)
                .then(res => res.json())
                .then(data => setGallery(data))
        }
        catch (error) { console.log(error.message) }
    }, [])

    return (
        <>
            {gallery.length > 0 &&
                <Carousel images={gallery} />
            }
        </>
    )
}
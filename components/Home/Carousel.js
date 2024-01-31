import { useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/Gallery.module.css'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setDirection('next');
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        setDirection('prev');
    };

    const imageContainerStyles = {
        transform: `translateX(-${currentIndex * 100}%)`,
    };

    return (
        <div className={styles.carousel}>
            <div style={imageContainerStyles} className={`${styles.imageContainer} ${direction}`}>
                {images.map((image, index) => (
                    <div key={index} className={`${styles.slide} ${index === currentIndex ? styles.slideActive : ''}`}>
                        <Image
                            src={image.url}
                            alt={`Slide ${index + 1}`}
                            width={500}
                            height={350}
                            objectFit="cover"
                            style={{ borderRadius: '1rem' }}
                        />
                    </div>
                ))}
            </div>

            <div className={`${styles.buttonPrev}`} onClick={prevSlide}>
                <KeyboardArrowLeftRoundedIcon fontSize='large' />
            </div>
            <div className={`${styles.buttonNext}`} onClick={nextSlide}>
                <KeyboardArrowRightRoundedIcon fontSize='large' />
            </div>
            {/* <button className={`${styles.buttonPrev}`} onClick={prevSlide}>{`<`}</button> */}
            {/* <button className={`${styles.buttonNext}`} onClick={nextSlide}>{`>`}</button> */}
        </div>
    );
};

export default Carousel;

import * as React from 'react'
import Image from 'next/image'
import styles from '@/styles/Gallery.module.css'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [direction, setDirection] = React.useState(null);

    let timeoutId;

    React.useEffect(() => {
        startCarousel();
        return () => {
            clearTimeout(timeoutId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        startCarousel();
        return () => {
            clearTimeout(timeoutId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    const startCarousel = () => {
        timeoutId = setTimeout(() => {
            nextSlide();
        }, 2000);
    };

    const handleHover = () => {
        clearTimeout(timeoutId);
    };

    const handleMouseLeave = () => {
        startCarousel();
    };

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
        <div
            className={styles.carousel}
            onMouseOver={handleHover}
            onMouseLeave={handleMouseLeave}
        >
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
                            // onMouseEnter={() => clearInterval(interval)}
                            // onMouseLeave={() => { }}
                            onClick={() => clearInterval(interval)}
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

        </div>
    );
};

export default Carousel;

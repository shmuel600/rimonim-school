'use client'
import styles from '@/styles/ClassHeader.module.css'

export default function Sun({ pageName }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 400" preserveAspectRatio="xMaxYMin meet" className={styles.svg}>
            {/* <!--  S  U  N --> */}
            <g id="sun" className={styles.sun}>
                <circle id="shine" filter="url(#filter_sunBlur)" fill="rgba(255,206,44,0.6)" cx="332" cy="32" r="183" />
                <path id="s5" className={styles.s5} fill="#ff952c" d="M500.7-59.8c-14.1-12-34.2-8.5-50.8-12.7s-29.8-14.2-41.7-27c-25-27.3-47.1-70.1-89.9-42.5-16.4,10.5-28,27-44.5,37.8s-33.1,16-51.1,21.8c-16.3,5.3-37.7,11.1-46.8,27.3-10.6,18.8,3.3,37.2,4.6,56.3,2.6,37.5-37.9,65.9-30.2,103.8,7,34.4,59.2,37.6,81.2,60.2,27,27.7,37.4,66.5,83.7,48.7,16.8-6.4,30.7-18.7,47.8-24.4,23.1-7.8,47.2-3.8,71-6.2,54.8-5.4,45.5-63.3,52.2-104.4,4.2-25.9,11.7-50.4,19.7-75.4C512.4-16.4,519.4-43.7,500.7-59.8Z" />
                <circle id="s4" fill="#ffcb4a" cx="332.4" cy="36.3" r="135.8" />
                <path id="s3" fill="#ffdc82" d="M426.8-27c-19.4-43.1-64.1-63.7-109.6-58-47.7,5.8-88,34.1-100.9,82.8-6.3,23.8,5.1,47.8,22.6,63.8,8.7,8,19.2,13,28.8,19.6s16.8,16,24.2,26.1c25.7,35.3,75.5,33.7,108,8.6C441,84.2,447.2,18.3,426.8-27Z" />
                <path id="s2" className={styles.s2} fill="#ffe6a6" d="M416.5-8.3c-4.4-40-37.6-62.6-74.9-66.7-15.7-1.8-34.8-2.1-48.5,6.6C274.4-56.5,276.2-37.8,278.2-19s-5,39.8,11.6,53.4c12.8,10.5,37,19.3,52.7,23.4C385.6,69.1,421.1,34.7,416.5-8.3Z" />
                <path id="s1" fill="#ffeec2" d="M375.3,23.5c-5.1,16.7-28,24.5-51,17.4s-37.7-26.3-32.5-43,27.9-24.6,51-17.5S380.4,6.7,375.3,23.5Z" />
            </g>
            <text x="80" y="130" className={styles.className}>
                {pageName}
            </text>

            {/* <!-- SUN --> */}
            <animateTransform
                xlinkHref="#s5"
                attributeName="transform"
                type="rotate"
                dur="18s"
                begin="0"
                repeatCount="indefinite"
                to="360"
            />
            <animateTransform
                xlinkHref="#s4"
                attributeName="transform"
                type="translate"
                dur="4s"
                begin="0"
                repeatCount="indefinite"
                values="0 0 ; 0 -15 ; 0 0"
            />
            <animate
                xlinkHref="#s3"
                attributeName="d"
                dur="4s"
                begin="0"
                fill="freeze"
                repeatCount="indefinite"
                values="M426.8-27c-19.4-43.1-64.1-63.7-109.6-58-47.7,5.8-88,34.1-100.9,82.8-6.3,23.8,5.1,47.8,22.6,63.8,8.7,8,45.6,35.6,53,45.7,25.7,35.3,75.5,33.7,108,8.6C441,84.2,447.2,18.3,426.8-27Z
        ; 
        M426.8-27c-19.4-43.1-64.1-63.7-109.6-58C269.5-79.2,241.9-49.7,229-1c-6.3,23.8-1.5,36,16,52,8.7,7.9,3,9,46.5,38.5,36.2,24.5,75.5,32.5,99,0C420.9,47.4,447.2,18.3,426.8-27Z
        ;
        M426.8-27c-19.4-43.1-64.1-63.7-109.6-58-47.7,5.8-88,34.1-100.9,82.8-6.3,23.8,5.1,47.8,22.6,63.8,8.7,8,45.6,35.6,53,45.7,25.7,35.3,75.5,33.7,108,8.6C441,84.2,447.2,18.3,426.8-27Z"
            />
            <animateTransform
                xlinkHref="#s2"
                attributeName="transform"
                type="rotate"
                dur="8s"
                begin="0"
                repeatCount="indefinite"
                to="360"
            />
        </svg>
    )
}
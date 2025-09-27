// src/hooks/useIntersectionObserver.js

import { useRef, useEffect, useState } from 'react';

const useIntersectionObserver = (threshold = 0.2) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: threshold,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return [ref, isVisible];
};

export default useIntersectionObserver;
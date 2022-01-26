import { useRef, useState, useEffect } from 'react';

const useElementOnScreen = (options) => {
    const containerRef = useRef();
    const [isVisible, setIsVisible] = useState();

    const callback = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    }

    useEffect(() => {
        const currentElement = containerRef.current;
        const observer = new IntersectionObserver(callback, options)

        if (currentElement) observer.observe(currentElement);

        return () => {
            if (currentElement) observer.unobserve(currentElement);
        }
    }, [containerRef, options]);

    return [containerRef, isVisible];
}

export default useElementOnScreen;
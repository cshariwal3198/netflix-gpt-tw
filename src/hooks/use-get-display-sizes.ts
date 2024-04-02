import { useEffect, useState } from "react";

export const useDisplaySizeGroup = () => {

    const [isSM, setIsSM] = useState(false);
    const [isMD, setIsMD] = useState(false);
    const [isLG, setIsLG] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            console.log(width);
            if (width < 720) {
                setIsSM(true);
                setIsMD(false);
                setIsLG(false);
            } else if (width < 1300 && width > 720) {
                setIsSM(false);
                setIsMD(true);
                setIsLG(false);
            } else {
                setIsSM(false);
                setIsMD(false);
                setIsLG(true);
            }
        };

        // Initial call
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isSM, isMD, isLG };
}
import { useState, useEffect } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });     
        }

        handleResize();

        window.addEventListener("resize", handleResize); //track resizes during runtime

        return () => window.removeEventListener("resize", handleResize); //cleanUp function
    }, [])

    console.log("size:", windowSize)     
    return windowSize;
}

export default useWindowSize;
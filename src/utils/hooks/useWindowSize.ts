import { useEffect, useState } from 'react'

type WindowDimentions = {
    width: number;
    height: number;
};

const useWindowSize = () => {
    const [windowDimension, setWindowDimension] = useState<WindowDimentions>({width: 0, height: 0})


    useEffect(() => {
        const handleWidthResize = () => setWindowDimension({width: window.innerWidth, height: window.innerHeight})
        window.addEventListener('resize', handleWidthResize)

        handleWidthResize()

        return () => window.removeEventListener('resize', handleWidthResize)
    },[])
  
    return  windowDimension 
}

export default useWindowSize
import { useEffect, useState } from "react";
import { useFormState } from "react-hook-form";


const  MOBILE_BREAKPOINT = 768;

export function useResponsive() {

    const [isMobile,setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT)

    useEffect(() => {
      const handleResize = () =>{
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
    
      window.addEventListener('resize',handleResize)
      return () => {
        window.removeEventListener('resize',handleResize)
      }
    }, [])

    return {isMobile}
    
}
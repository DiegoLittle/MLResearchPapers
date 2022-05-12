import { useEffect, useState } from "react"

export default function useOnScreen(ref) {

    const [isIntersecting, setIntersecting] = useState(false)
  
  
    useEffect(() => {
      observer.observe(ref.current)
      ref.current = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting)
      )
      // Remove the observer as soon as the component is unmounted
      return () => { observer.disconnect() }
    }, [])
  
    return isIntersecting
  }
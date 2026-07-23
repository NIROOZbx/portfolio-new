import { useState, useEffect, useRef } from 'react'

export function useScrollHide(scrollRef?: React.RefObject<HTMLElement | null>) {
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const el = scrollRef?.current ?? window

    const handleScroll = () => {
      const currentY = scrollRef?.current
        ? scrollRef.current.scrollTop
        : window.scrollY

      if (currentY > lastScrollY.current && currentY > 10) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [scrollRef])

  return hidden
}

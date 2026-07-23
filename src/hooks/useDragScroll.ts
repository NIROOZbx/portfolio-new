import { useRef, useState, useCallback, type RefObject } from 'react'

interface UseDragScrollReturn {
  scrollRef: RefObject<HTMLDivElement | null>
  dragHandlers: {
    onMouseDown: (e: React.MouseEvent) => void
    onMouseLeave: () => void
    onMouseUp: () => void
    onMouseMove: (e: React.MouseEvent) => void
  }
}

export function useDragScroll(): UseDragScrollReturn {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsMouseDown(true)
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft
    scrollLeft.current = scrollContainerRef.current.scrollLeft
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsMouseDown(false)
  }, [])

  const onMouseUp = useCallback(() => {
    setIsMouseDown(false)
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isMouseDown || !scrollContainerRef.current) return
      e.preventDefault()
      const x = e.pageX - scrollContainerRef.current.offsetLeft
      const walk = (x - startX.current) * 1.5
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk
    },
    [isMouseDown]
  )

  return {
    scrollRef: scrollContainerRef,
    dragHandlers: { onMouseDown, onMouseLeave, onMouseUp, onMouseMove }
  }
}

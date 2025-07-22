"use client"

import { useEffect, useState, useRef } from "react"

// Intersection Observer hook for lazy loading animations
export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return [ref, isInView] as const
}

// Staggered animation hook
export function useStaggerAnimation(itemCount: number, delay = 100) {
  const [visibleItems, setVisibleItems] = useState(0)
  const [ref, isInView] = useInView()

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setVisibleItems((prev) => {
          if (prev >= itemCount) {
            clearInterval(timer)
            return prev
          }
          return prev + 1
        })
      }, delay)

      return () => clearInterval(timer)
    }
  }, [isInView, itemCount, delay])

  return [ref, visibleItems] as const
}

// Typing animation hook
export function useTypingAnimation(text: string, speed = 50) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  return [displayText, isComplete] as const
}

// Count up animation hook
export function useCountUp(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start)
  const [ref, isInView] = useInView()

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)

        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(start + (end - start) * easeOutQuart))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration, start])

  return [ref, count] as const
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

interface FloatingCTAProps {
  onOpenModal: () => void
}

export function FloatingCTA({ onOpenModal }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const threshold = 1000 // Show after scrolling 1000px

      if (scrolled > threshold && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-2xl p-4 relative">
        <button onClick={() => setIsDismissed(true)} className="absolute top-2 right-2 text-white/80 hover:text-white">
          <X className="h-4 w-4" />
        </button>

        <div className="pr-6">
          <h4 className="font-semibold mb-1">🎁 Free Starter Pack</h4>
          <p className="text-sm text-blue-100 mb-3">Get the career guide that helped 5,000+ Nigerians</p>

          <Button onClick={onOpenModal} size="sm" className="bg-white text-blue-600 hover:bg-blue-50 w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Now
          </Button>
        </div>
      </div>
    </div>
  )
}

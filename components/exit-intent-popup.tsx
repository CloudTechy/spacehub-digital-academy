"use client"

import { useState, useEffect } from "react"
import { LeadCaptureModal } from "./lead-capture-modal"

export function ExitIntentPopup() {
  const [showModal, setShowModal] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top of the page
      if (e.clientY <= 0 && !hasShown) {
        setShowModal(true)
        setHasShown(true)
      }
    }

    // Also show after 30 seconds if not shown yet
    const timer = setTimeout(() => {
      if (!hasShown) {
        setShowModal(true)
        setHasShown(true)
      }
    }, 30000)

    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(timer)
    }
  }, [hasShown])

  return <LeadCaptureModal isOpen={showModal} onClose={() => setShowModal(false)} trigger="exit-intent" />
}

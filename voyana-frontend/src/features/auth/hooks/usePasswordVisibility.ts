import { useState } from 'react'

export function usePasswordVisibility(initialValue = false) {
  const [isVisible, setIsVisible] = useState(initialValue)

  const toggleVisibility = () => {
    setIsVisible((value) => !value)
  }

  return {
    isVisible,
    toggleVisibility,
  }
}

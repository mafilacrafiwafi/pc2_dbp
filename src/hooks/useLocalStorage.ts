import { useState } from 'react'

// version temporal: reemplazar por el hook que me pasan
export function useLocalStorage(key: string, initialValue: string | null) {
  const [value, setValue] = useState<string | null>(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  const saveValue = (newValue: string | null) => {
    setValue(newValue)
    if (newValue === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(newValue))
    }
  }

  return [value, saveValue] as const
}

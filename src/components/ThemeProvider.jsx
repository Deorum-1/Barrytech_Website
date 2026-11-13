import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => (
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  ))

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.add('theme-ready')
    root.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#071b30' : '#ffffff',
    )
  }, [theme])

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    try {
      window.localStorage.setItem('barrytech-theme', next)
    } catch (error) {
      console.error('Unable to save the theme preference.', error)
    }
    setTheme(next)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

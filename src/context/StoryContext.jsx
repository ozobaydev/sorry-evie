import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const StoryContext = createContext(null)

/** Tiny shared story state: has she said yes yet, and which stars are lit. */
export function StoryProvider({ children }) {
  const [forgiven, setForgiven] = useState(false)
  const [openedStars, setOpenedStars] = useState(() => new Set())

  const openStar = useCallback((i) => {
    setOpenedStars((prev) => {
      if (prev.has(i)) return prev
      const next = new Set(prev)
      next.add(i)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ forgiven, setForgiven, openedStars, openStar }),
    [forgiven, openedStars, openStar]
  )

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
}

export function useStory() {
  return useContext(StoryContext)
}

'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Returns a back-navigation function that uses browser history when available,
 * falling back to a specified URL for direct-access scenarios (shared links,
 * bookmarks, notification click-throughs).
 *
 * Usage:
 *   const goBack = useSmartBack('/surveys')
 *   <button onClick={goBack}>Back</button>
 */
export function useSmartBack(fallbackUrl: string): () => void {
  const router = useRouter()

  return useCallback(() => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push(fallbackUrl)
    }
  }, [router, fallbackUrl])
}

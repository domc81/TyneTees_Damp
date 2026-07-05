'use client'

import { useSyncExternalStore } from 'react'
import { subscribe, getState, type ConnState } from '@/lib/offline/connectivity'

/** Reactive online/offline state from the connectivity monitor. */
export function useConnectivity(): ConnState {
  return useSyncExternalStore(
    (onChange) => subscribe(() => onChange()),
    () => getState(),
    () => 'online' as ConnState // SSR snapshot
  )
}

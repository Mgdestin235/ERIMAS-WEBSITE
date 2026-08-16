'use client'

import { useEffect } from 'react'

export function RegisterServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw-admin.js').catch(() => {
        // Installation PWA non bloquante : l'admin reste utilisable sans SW.
      })
    }
  }, [])
  return null
}

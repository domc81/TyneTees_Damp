import type { MetadataRoute } from 'next'

// PWA manifest (Next metadata route). Colours from the brand theme in
// tailwind.config: navy-1000 background (#0d1520), brand-500 accent (#0c8ce9).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TTDP Surveys',
    short_name: 'TTDP',
    description: 'Tyne Tees Damp Proofing — on-site survey wizard (works offline)',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0d1520',
    theme_color: '#0c8ce9',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}

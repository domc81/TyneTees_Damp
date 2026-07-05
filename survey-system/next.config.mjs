import withSerwistInit from '@serwist/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '')],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Exclude Supabase functions from Next.js build (they're Deno, not TS)
  typescript: {
    ignoreBuildErrors: true,
  },
}

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  // We register the SW ourselves in OfflineBootstrap (with beforeinstallprompt
  // handling), so disable Serwist's auto-registration.
  register: false,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development',
})

export default withSerwist(nextConfig)

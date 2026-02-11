/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig

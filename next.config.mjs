/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    let backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || 'https://digmaniparamedical-backend.vercel.app'
    
    if (backendUrl.endsWith('/')) {
      backendUrl = backendUrl.slice(0, -1)
    }
    if (backendUrl.endsWith('/api/v1')) {
      backendUrl = backendUrl.replace('/api/v1', '')
    }

    return [
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/uploads/:path*`,
      },
      {
        source: '/api/v1/:path*',
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ]
  },
}

export default nextConfig


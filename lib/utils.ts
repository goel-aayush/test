import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBackendImageUrl(path: string | undefined | null): string {
  if (!path) return '/placeholder.svg'

  let cleanPath = path

  // Cloudinary blocks direct raw file access for free/untrusted accounts.
  // Route PDF files through the backend proxy: /api/v1/media/view/notices/filename.pdf
  if (cleanPath.startsWith('https://res.cloudinary.com') && cleanPath.toLowerCase().endsWith('.pdf')) {
    // Extract category and filename from Cloudinary URL
    // URL pattern: https://res.cloudinary.com/{cloud}/{type}/upload/{version}/arpi_uploads/{category}/{filename}.pdf
    const match = cleanPath.match(/arpi_uploads\/([^/]+)\/([^/]+\.pdf)$/i)
    if (match) {
      const [, category, filename] = match
      const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
      return `${backendBase}/api/v1/media/view/${category}/${filename}`
    }
    return cleanPath
  }

  // If path is full Cloudinary URL, return as-is
  if (cleanPath.startsWith('https://res.cloudinary.com')) return cleanPath

  const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

  if (cleanPath.startsWith(backendBase)) {
    cleanPath = cleanPath.replace(backendBase, '')
  }

  if (!cleanPath.startsWith('/') && !cleanPath.startsWith('http://') && !cleanPath.startsWith('https://')) {
    cleanPath = '/' + cleanPath
  }

  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath
  }

  if (cleanPath.startsWith('/api/v1/media/view/')) {
    return `${backendBase}${cleanPath}`
  }

  if (cleanPath.startsWith('/uploads/')) {
    return `${backendBase}${cleanPath}`
  }

  // Local static images from public folder
  return cleanPath
}


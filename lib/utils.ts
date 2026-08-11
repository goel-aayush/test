import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBackendImageUrl(path: string | undefined | null): string {
  if (!path) return '/placeholder.svg'

  let cleanPath = path

  // Cloudinary blocks direct raw file access for free/untrusted accounts.
  // Route PDF files through the backend proxy (Next.js rewrites handle proxying)
  if (cleanPath.startsWith('https://res.cloudinary.com') && cleanPath.toLowerCase().endsWith('.pdf')) {
    const match = cleanPath.match(/arpi_uploads\/([^/]+)\/([^/]+\.pdf)$/i)
    if (match) {
      const [, category, filename] = match
      return `/api/v1/media/view/${category}/${filename}`
    }
    return cleanPath
  }

  // Full Cloudinary URL — return as-is
  if (cleanPath.startsWith('https://res.cloudinary.com')) return cleanPath

  // Strip backend base URL if present to get relative path
  const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
  if (cleanPath.startsWith(backendBase)) {
    cleanPath = cleanPath.replace(backendBase, '')
  }

  if (!cleanPath.startsWith('/') && !cleanPath.startsWith('http://') && !cleanPath.startsWith('https://')) {
    cleanPath = '/' + cleanPath
  }

  // External URLs — return as-is
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath
  }

  // /api/v1/... and /uploads/... — return relative, Next.js rewrites proxy to backend
  return cleanPath
}


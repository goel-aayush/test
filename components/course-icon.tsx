import {
  TestTubes,
  Bandage,
  Stethoscope,
  ScanLine,
  Accessibility,
  ShieldPlus,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  TestTubes,
  Bandage,
  Stethoscope,
  ScanLine,
  Accessibility,
  ShieldPlus,
}

export function CourseIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Stethoscope
  return <Icon className={cn('size-6', className)} aria-hidden="true" />
}

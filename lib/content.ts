import type { Testimonial } from '@/components/testimonial-card'

export const testimonials: Testimonial[] = [
  {
    name: 'Priya Kumari',
    course: 'Lab Technician (DMLT)',
    quote:
      'The lab practicals at ARPI gave me real confidence. I got a job at a diagnostic centre in Gaya within a month of finishing my course.',
    image: '/images/student-1.png',
  },
  {
    name: 'Rahul Kumar',
    course: 'X-Ray Technician',
    quote:
      'Teachers here explain everything patiently and the imaging equipment training was hands-on. Highly recommend for anyone from a small town like me.',
    image: '/images/student-2.png',
  },
  {
    name: 'Amit Ranjan',
    course: 'Health Sanitary Inspector',
    quote:
      'I was already working but wanted a recognised certificate. The flexible schedule and supportive faculty made it possible to upskill.',
    image: '/images/student-3.png',
  },
]

export type Notice = {
  date: string
  title: string
  tag: 'Admission' | 'Exam' | 'Event' | 'Notice'
}

export const notices: Notice[] = [
  { date: '2026-07-20', title: 'Admissions open for 2026–27 batch — limited seats', tag: 'Admission' },
  { date: '2026-07-15', title: 'Scholarship applications now being accepted', tag: 'Notice' },
  { date: '2026-07-05', title: 'Free career counselling camp this Saturday', tag: 'Event' },
  { date: '2026-06-28', title: 'Semester practical exam schedule released', tag: 'Exam' },
]

export const stats = [
  { icon: 'CalendarDays', value: 'Est. 2021', label: 'Trusted since' },
  { icon: 'BookOpen', value: '6+', label: 'Paramedical courses' },
  { icon: 'Users', value: '1,200+', label: 'Students trained' },
  { icon: 'Briefcase', value: '85%', label: 'Placement assistance' },
]

export type Faculty = {
  name: string
  role: string
  qualification: string
  image: string
  type: 'teaching' | 'non-teaching'
}

export const faculty: Faculty[] = [
  {
    name: 'Dr. Alok Ranjan',
    role: 'Director',
    qualification: 'MBBS, MD — 20+ years in medical education',
    image: '/images/faculty-director.png',
    type: 'teaching',
  },
  {
    name: 'Mr. Sanjeev Kumar',
    role: 'Principal',
    qualification: 'M.Sc. Medical Lab Technology',
    image: '/images/faculty-principal.png',
    type: 'teaching',
  },
  {
    name: 'Dr. Neha Sharma',
    role: 'HOD — Physiotherapy',
    qualification: 'BPT, MPT (Ortho)',
    image: '/images/faculty-1.png',
    type: 'teaching',
  },
  {
    name: 'Mr. Ravi Prakash',
    role: 'Lecturer — Radiology',
    qualification: 'B.Sc. Radiology & Imaging',
    image: '/images/faculty-2.png',
    type: 'teaching',
  },
]

export const nonTeaching = [
  { name: 'Sunita Devi', role: 'Administrative Officer' },
  { name: 'Manoj Kumar', role: 'Lab Attendant' },
  { name: 'Rekha Kumari', role: 'Hostel Warden' },
  { name: 'Deepak Sharma', role: 'Accounts & Admissions' },
]

export type Facility = {
  title: string
  description: string
  image: string
}

export const facilities: Facility[] = [
  {
    title: 'Modern Laboratories',
    description:
      'Well-equipped pathology, microbiology and radiology labs for hands-on training with real instruments.',
    image: '/images/facility-lab.png',
  },
  {
    title: 'Library & Study Hall',
    description:
      'A quiet, well-stocked library with medical reference books, journals and dedicated reading space.',
    image: '/images/facility-library.png',
  },
  {
    title: 'Hostel Accommodation',
    description:
      'Safe, clean and affordable hostel facilities for outstation students with warden supervision.',
    image: '/images/facility-hostel.png',
  },
  {
    title: 'Transport Facility',
    description:
      'Institute bus service covering major routes across Gaya for easy and safe daily commute.',
    image: '/images/facility-transport.png',
  },
  {
    title: 'Smart Classrooms',
    description:
      'Bright, spacious classrooms with charts and teaching aids for interactive learning.',
    image: '/images/facility-classroom.png',
  },
  {
    title: 'Imaging & Practice Rooms',
    description:
      'Dedicated radiology and imaging practice rooms with a focus on radiation safety.',
    image: '/images/gallery-xray.png',
  },
]

export const gallery = [
  { src: '/images/campus-building.png', alt: 'ARPI campus building exterior in Gaya' },
  { src: '/images/facility-lab.png', alt: 'Students working in the medical laboratory' },
  { src: '/images/students-group.png', alt: 'Group of ARPI paramedical students in uniform' },
  { src: '/images/facility-library.png', alt: 'Institute library and reading hall' },
  { src: '/images/facility-classroom.png', alt: 'Smart classroom at ARPI' },
  { src: '/images/gallery-xray.png', alt: 'X-ray and radiology practice room' },
  { src: '/images/facility-hostel.png', alt: 'Student hostel accommodation' },
  { src: '/images/facility-transport.png', alt: 'Institute transport bus service' },
]

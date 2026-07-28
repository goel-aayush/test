export type Course = {
  slug: string
  name: string
  shortName: string
  icon: string
  duration: string
  eligibility: string
  // NOTE: Update `fee` with the official published amount per course.
  fee: string
  seats: string
  tagline: string
  overview: string
  subjects: string[]
  careers: string[]
  recognition: string
}

export const courses: Course[] = [
  {
    slug: 'medical-lab-technician',
    name: 'Diploma in Medical Lab Technician (DMLT)',
    shortName: 'Lab Technician',
    icon: 'TestTubes',
    duration: '2 Years',
    eligibility: '10+2 (Science) or equivalent',
    fee: 'Contact for fee details',
    seats: '60 seats / batch',
    tagline: 'Master pathology, diagnostics and lab diagnostics.',
    overview:
      'The DMLT program trains you to run clinical laboratory tests that doctors depend on for diagnosis — from blood and urine analysis to microbiology and biochemistry. Hands-on lab practice is at the core of this course, preparing you for immediate employment in diagnostic centres and hospitals.',
    subjects: [
      'Human Anatomy & Physiology',
      'Clinical Pathology & Haematology',
      'Biochemistry',
      'Microbiology & Immunology',
      'Blood Banking & Transfusion',
      'Lab Instrumentation & Quality Control',
    ],
    careers: [
      'Medical Lab Technician',
      'Pathology Lab Assistant',
      'Blood Bank Technician',
      'Diagnostic Centre Technician',
      'Research Lab Assistant',
    ],
    recognition: 'Curriculum aligned with recognised paramedical council norms.',
  },
  {
    slug: 'medical-dresser',
    name: 'Certificate in Medical Dresser',
    shortName: 'Medical Dresser',
    icon: 'Bandage',
    duration: '1 Year',
    eligibility: '10th pass or equivalent',
    fee: 'Contact for fee details',
    seats: '40 seats / batch',
    tagline: 'Wound care, first aid and clinical assistance.',
    overview:
      'The Medical Dresser certificate equips you with practical skills in wound dressing, first aid, injections, and basic patient care. It is ideal for candidates who want a short, job-ready qualification to work alongside doctors and nurses.',
    subjects: [
      'First Aid & Emergency Care',
      'Wound Dressing & Bandaging',
      'Basic Human Anatomy',
      'Injection & Medication Handling',
      'Infection Control & Hygiene',
      'Patient Handling & Ethics',
    ],
    careers: [
      'Medical Dresser',
      'OPD Assistant',
      'Clinic Attendant',
      'First-Aid Responder',
      'Nursing Support Staff',
    ],
    recognition: 'Short-duration certificate with strong local job demand.',
  },
  {
    slug: 'ot-assistant',
    name: 'Diploma in OT Assistant (Operation Theatre Technician)',
    shortName: 'OT Assistant',
    icon: 'Stethoscope',
    duration: '2 Years',
    eligibility: '10+2 (Science) or equivalent',
    fee: 'Contact for fee details',
    seats: '40 seats / batch',
    tagline: 'Support surgical teams inside the operation theatre.',
    overview:
      'Operation Theatre technicians are essential members of every surgical team. This diploma trains you in sterilisation, surgical instruments, anaesthesia support and theatre management so you can confidently assist surgeons before, during and after procedures.',
    subjects: [
      'Operation Theatre Techniques',
      'Sterilisation & Asepsis',
      'Surgical Instruments & Setup',
      'Anaesthesia Support',
      'Patient Positioning & Monitoring',
      'Biomedical Waste Management',
    ],
    careers: [
      'OT Technician',
      'Surgical Assistant',
      'CSSD Technician',
      'Anaesthesia Technician',
      'Hospital Theatre Staff',
    ],
    recognition: 'Practical training in a simulated operation-theatre setup.',
  },
  {
    slug: 'x-ray-technician',
    name: 'Diploma in X-Ray / Radiology Technician',
    shortName: 'X-Ray Technician',
    icon: 'ScanLine',
    duration: '2 Years',
    eligibility: '10+2 (Science) or equivalent',
    fee: 'Contact for fee details',
    seats: '40 seats / batch',
    tagline: 'Operate imaging equipment for accurate diagnosis.',
    overview:
      'Learn to operate X-ray, ultrasound and modern imaging equipment safely and accurately. This diploma covers radiographic techniques, radiation safety and image processing, preparing you for high-demand roles in hospitals and diagnostic imaging centres.',
    subjects: [
      'Radiographic Techniques',
      'Radiological Anatomy',
      'Radiation Physics & Safety',
      'Imaging Equipment Operation',
      'Ultrasound & CT Basics',
      'Film / Digital Image Processing',
    ],
    careers: [
      'X-Ray Technician',
      'Radiology Technician',
      'CT / MRI Assistant',
      'Imaging Centre Technician',
      'Ultrasound Assistant',
    ],
    recognition: 'Includes radiation-safety oriented practical modules.',
  },
  {
    slug: 'physiotherapy',
    name: 'Diploma in Physiotherapy',
    shortName: 'Physiotherapy',
    icon: 'Accessibility',
    duration: '2 Years',
    eligibility: '10+2 (Science) or equivalent',
    fee: 'Contact for fee details',
    seats: '40 seats / batch',
    tagline: 'Help patients recover movement and strength.',
    overview:
      'Physiotherapy technicians assist in rehabilitation, pain management and recovery through exercise and physical therapy. This diploma blends anatomy, therapeutic techniques and hands-on clinical practice to prepare you for rewarding work in hospitals, clinics and rehab centres.',
    subjects: [
      'Human Anatomy & Kinesiology',
      'Exercise Therapy',
      'Electrotherapy',
      'Orthopaedic & Neuro Rehabilitation',
      'Therapeutic Techniques',
      'Clinical Practice & Ethics',
    ],
    careers: [
      'Physiotherapy Assistant',
      'Rehabilitation Technician',
      'Sports Recovery Assistant',
      'Clinic Physio Support',
      'Home-Care Physio Aide',
    ],
    recognition: 'Clinical rotation-based practical training.',
  },
  {
    slug: 'health-sanitary-inspector',
    name: 'Certificate in Health Sanitary Inspector (HSI)',
    shortName: 'Health Sanitary Inspector',
    icon: 'ShieldPlus',
    duration: '1 Year',
    eligibility: '10+2 or equivalent',
    fee: 'Contact for fee details',
    seats: '40 seats / batch',
    tagline: 'Public health, sanitation and disease prevention.',
    overview:
      'The Health Sanitary Inspector certificate prepares you for public-health roles focused on sanitation, water safety, food hygiene and disease control. It is a strong choice for candidates seeking roles with municipal bodies, NGOs and health departments.',
    subjects: [
      'Environmental Sanitation',
      'Water & Food Hygiene',
      'Communicable Disease Control',
      'Vital Statistics & Public Health',
      'Waste Management',
      'Health Education & Fieldwork',
    ],
    careers: [
      'Health Sanitary Inspector',
      'Public Health Worker',
      'Sanitation Supervisor',
      'Food Safety Assistant',
      'NGO Health Coordinator',
    ],
    recognition: 'Field-oriented public-health training.',
  },
]

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug)
}

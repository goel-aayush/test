export const blogCategories = [
  'Career Guidance',
  'Course Info',
  'Admission Tips',
  'Student Success Stories',
] as const

export type BlogCategory = (typeof blogCategories)[number]

/**
 * Body content is authored as typed blocks instead of an MDX toolchain so the
 * collection stays type-safe, renders reliably, and matches this site's
 * data-driven pattern. Swap in a CMS/MDX source later without changing the UI.
 */
export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }

export type BlogPost = {
  title: string
  slug: string
  category: BlogCategory
  author: string
  authorPhoto: string
  publishDate: string // ISO date
  featuredImage: string
  excerpt: string
  body: ContentBlock[]
  relatedCourseSlug?: string
  readingTime: number // minutes, computed
}

const AUTHOR_TEAM = 'ARPI Academic Team'
const PHOTO_TEAM = '/uploads/blog/author-arpi-team.png'

type RawPost = Omit<BlogPost, 'readingTime'>

const rawPosts: RawPost[] = [
  {
    title: 'DMLT Salary Guide: What Freshers Actually Earn',
    slug: 'dmlt-salary-guide-freshers',
    category: 'Career Guidance',
    author: AUTHOR_TEAM,
    authorPhoto: PHOTO_TEAM,
    publishDate: '2025-11-10',
    featuredImage: '/uploads/blog/dmlt-salary-guide.png',
    relatedCourseSlug: 'medical-lab-technician',
    excerpt:
      'An honest look at what a Diploma in Medical Lab Technician (DMLT) fresher earns in Bihar and across India — plus the factors that push your salary up.',
    body: [
      {
        type: 'paragraph',
        text: 'One of the first questions every student asks before joining a Diploma in Medical Lab Technician (DMLT) course is simple: how much will I actually earn when I finish? It is a fair question, and it deserves an honest answer rather than an inflated number designed to sell a course. In this guide we break down realistic starting salaries for DMLT freshers, explain why the range is so wide, and show you exactly what you can do to move to the higher end of it.',
      },
      { type: 'heading', text: 'What a DMLT fresher realistically earns' },
      {
        type: 'paragraph',
        text: 'For a fresh DMLT graduate in Bihar and similar regions, a typical starting salary falls between ₹10,000 and ₹20,000 per month. Small diagnostic labs and collection centres in smaller towns usually start at the lower end, while established hospitals, larger diagnostic chains and metro-city labs pay more. Anyone promising a fixed ₹40,000 salary to a fresher with no experience is not being straight with you — that level of pay comes with years of experience or a bachelor’s degree, not on day one.',
      },
      {
        type: 'paragraph',
        text: 'The reason the range is so wide is that "lab technician" covers very different working conditions. A technician running routine blood and urine tests in a small clinic is paid differently from one operating advanced biochemistry analysers in a tertiary hospital, even though both hold a DMLT.',
      },
      { type: 'heading', text: 'What decides where you land in that range' },
      {
        type: 'list',
        items: [
          'Location: metro and district-hospital jobs pay more than small-town collection centres.',
          'Employer type: large hospitals and reputed diagnostic chains pay more than single-doctor clinics.',
          'Shift and workload: night shifts, blood-bank duty and emergency-lab roles often carry allowances.',
          'Practical skill: technicians confident on modern analysers and sample handling get hired faster and negotiate better.',
          'Certifications: extra training in phlebotomy, histopathology or quality control adds value.',
        ],
      },
      { type: 'heading', text: 'How your salary grows over time' },
      {
        type: 'paragraph',
        text: 'The starting salary is only the entry point. With two to three years of hands-on experience, many DMLT holders move into the ₹20,000–₹35,000 range, especially if they specialise. Progressing to a B.Sc in Medical Lab Technology unlocks senior technician and lab-supervisor roles, and government lab-technician posts add the security of a fixed pay scale, allowances and long-term stability.',
      },
      {
        type: 'quote',
        text: 'Treat your first job as paid training. The technician who learns every machine in the lab in year one is the one running the department in year four.',
        cite: 'ARPI placement mentor',
      },
      { type: 'heading', text: 'How to reach the higher end faster' },
      {
        type: 'list',
        items: [
          'Master sample collection and machine operation during your practical training — employers pay for confidence.',
          'Build a clean track record of accuracy; lab work is a trust profession.',
          'Keep upgrading: a B.Sc MLT or a specialised certificate visibly changes your pay band.',
          'Be open to relocating for your first two years — early experience in a busy lab compounds quickly.',
        ],
      },
      { type: 'heading', text: 'The bottom line' },
      {
        type: 'paragraph',
        text: 'A DMLT will not make you rich overnight, but it opens a stable, respected healthcare career with a clear ladder upward and demand that keeps growing as diagnostics expand across India. If you enter with realistic expectations and commit to your practical skills, the salary follows. If you are considering the course, look closely at the curriculum and the hands-on lab practice on offer — that is what actually determines your first paycheque.',
      },
    ],
  },
  {
    title: 'Career Scope After Diploma in Physiotherapy in Bihar',
    slug: 'career-scope-physiotherapy-bihar',
    category: 'Course Info',
    author: AUTHOR_TEAM,
    authorPhoto: PHOTO_TEAM,
    publishDate: '2025-11-18',
    featuredImage: '/uploads/blog/physiotherapy-career-scope.png',
    relatedCourseSlug: 'physiotherapy',
    excerpt:
      'Where a Diploma in Physiotherapy can take you in Bihar — the roles, the employers, the growth path, and why demand for rehabilitation support is rising.',
    body: [
      {
        type: 'paragraph',
        text: 'Physiotherapy has quietly become one of the most in-demand areas of healthcare. As lifestyle-related conditions, road accidents, sports injuries and an ageing population all increase, so does the need for trained people who can help patients recover movement, manage pain and rebuild strength. A Diploma in Physiotherapy is a practical entry point into this field, and in a state like Bihar the scope is genuinely wide. Here is an honest map of where the qualification can take you.',
      },
      { type: 'heading', text: 'What the role actually involves' },
      {
        type: 'paragraph',
        text: 'A physiotherapy diploma holder works as part of a rehabilitation team, assisting in exercise therapy, electrotherapy, post-surgery recovery and day-to-day patient care. You are the person who guides a patient through their recovery exercises, sets up therapy equipment, and tracks progress. It is hands-on, people-facing work that suits candidates who are patient, encouraging and physically active.',
      },
      { type: 'heading', text: 'Roles you can take up' },
      {
        type: 'list',
        items: [
          'Physiotherapy Assistant in hospitals and clinics',
          'Rehabilitation Technician in recovery and orthopaedic centres',
          'Sports Recovery Assistant with academies and fitness centres',
          'Home-care physio aide for elderly and post-operative patients',
          'Support staff in private physiotherapy practices',
        ],
      },
      { type: 'heading', text: 'Where the jobs are in Bihar' },
      {
        type: 'paragraph',
        text: 'Demand is not limited to big cities. District hospitals, orthopaedic and physiotherapy clinics, old-age and rehabilitation homes, sports academies, and a fast-growing home-care sector all need trained physiotherapy support. Because many patients now prefer therapy at home, home-visit physiotherapy has become a real and flexible earning avenue, especially for those willing to build a local reputation.',
      },
      { type: 'heading', text: 'Realistic starting salary' },
      {
        type: 'paragraph',
        text: 'A fresher physiotherapy diploma holder in Bihar can typically expect ₹10,000–₹20,000 per month to start, depending on the setting. Clinic and home-care roles at the lower end grow steadily as you build patients and reputation, while hospital roles offer more structured pay. As always, this is a starting point that varies by location, employer and experience — not a fixed guarantee.',
      },
      { type: 'heading', text: 'The growth path' },
      {
        type: 'paragraph',
        text: 'The single most powerful move for a physiotherapy diploma holder is to progress to a Bachelor of Physiotherapy (BPT). This upgrades you to a licensed practitioner who can assess and treat patients independently, and it dramatically changes your earning potential. Beyond that, you can specialise in orthopaedic, neurological or sports physiotherapy and eventually run your own practice.',
      },
      {
        type: 'quote',
        text: 'Physiotherapy rewards consistency. The diploma gets you into the room; your results with patients build the career.',
        cite: 'ARPI faculty',
      },
      { type: 'heading', text: 'Is it the right choice for you?' },
      {
        type: 'paragraph',
        text: 'If you enjoy working closely with people, want a healthcare career that does not require becoming a doctor, and are prepared to keep learning, physiotherapy is a strong and future-proof choice. Start with the diploma to build clinical confidence, then use the BPT route to climb. The demand is real, the work is meaningful, and in Bihar the field still has plenty of room to grow.',
      },
    ],
  },
  {
    title: '10th Pass vs 12th Pass: Which Paramedical Course Should You Choose',
    slug: '10th-vs-12th-pass-paramedical-course',
    category: 'Admission Tips',
    author: AUTHOR_TEAM,
    authorPhoto: PHOTO_TEAM,
    publishDate: '2025-11-25',
    featuredImage: '/uploads/blog/10th-vs-12th-paramedical.png',
    relatedCourseSlug: 'medical-dresser',
    excerpt:
      'Confused about which paramedical course fits your qualification? Here is a clear, honest guide to choosing the right course after 10th or 12th.',
    body: [
      {
        type: 'paragraph',
        text: 'A common worry among students in Bihar is whether their current qualification limits their paramedical options. The good news: whether you have completed 10th or 12th, there is a genuine, job-oriented paramedical path open to you. The key is choosing the course that matches both your eligibility and your long-term goals. This guide lays out the options clearly so you can decide with confidence.',
      },
      { type: 'heading', text: 'If you have passed 10th' },
      {
        type: 'paragraph',
        text: 'After 10th, the fastest route into healthcare is a short certificate course. These are designed to make you job-ready quickly, with a strong focus on practical skills rather than heavy theory. They are ideal if you want to start earning sooner and prefer hands-on work.',
      },
      {
        type: 'list',
        items: [
          'Certificate in Medical Dresser — wound care, first aid, injections and clinical assistance in about a year.',
          'Entry-level support roles that let you gain real hospital experience early.',
          'A stepping stone: you can upgrade to a diploma later once you complete 12th.',
        ],
      },
      { type: 'heading', text: 'If you have passed 12th' },
      {
        type: 'paragraph',
        text: 'With a 12th pass — especially with science — a wider set of diploma courses opens up. These run longer (usually two years), go deeper, and generally lead to higher starting salaries and clearer growth ladders.',
      },
      {
        type: 'list',
        items: [
          'Diploma in Medical Lab Technician (DMLT) — diagnostics and pathology.',
          'Diploma in X-Ray / Radiology Technician — medical imaging.',
          'Diploma in OT Assistant — operation-theatre and surgical support.',
          'Diploma in Physiotherapy — rehabilitation and recovery.',
          'Certificate in Health Sanitary Inspector — public health and sanitation.',
        ],
      },
      { type: 'heading', text: 'How to actually choose' },
      {
        type: 'paragraph',
        text: 'Do not pick a course only because a friend chose it. Ask yourself three questions: What kind of work do I enjoy — labs, imaging, patient care, or fieldwork? What starting salary and growth am I aiming for? And how much time and fee can I commit right now? Match your honest answers to the course, not the other way around.',
      },
      {
        type: 'quote',
        text: 'The best paramedical course is the one you will actually finish and enjoy working in — not the one that sounds most impressive.',
        cite: 'ARPI admission counsellor',
      },
      { type: 'heading', text: 'A 10th pass is not a dead end' },
      {
        type: 'paragraph',
        text: 'Many successful healthcare workers started with a certificate after 10th, gained experience, completed 12th alongside or after, and then upgraded to a diploma or degree. Your first course does not lock your ceiling — it opens the door. What matters is starting on a recognised, practical course and building from there.',
      },
      { type: 'heading', text: 'Talk to a counsellor before you decide' },
      {
        type: 'paragraph',
        text: 'Every student’s situation is different — your marks, your interests, your finances and your family circumstances all matter. Before enrolling anywhere, speak to an admission counsellor who can look at your specific case and recommend a realistic path. A short, honest conversation now can save you years of taking the wrong course.',
      },
    ],
  },
  {
    title: 'Govt Job Opportunities for Paramedical Diploma Holders',
    slug: 'govt-jobs-paramedical-diploma-holders',
    category: 'Career Guidance',
    author: AUTHOR_TEAM,
    authorPhoto: PHOTO_TEAM,
    publishDate: '2025-12-02',
    featuredImage: '/uploads/blog/govt-jobs-paramedical.png',
    relatedCourseSlug: 'health-sanitary-inspector',
    excerpt:
      'Government jobs remain a top goal for paramedical students. Here is where the opportunities are, who can apply, and how to prepare.',
    body: [
      {
        type: 'paragraph',
        text: 'For many families in Bihar, a government job represents stability, respect and security. The encouraging reality is that paramedical diploma and certificate holders have a real and growing set of government opportunities — across health departments, hospitals, railways, defence and municipal bodies. This guide explains where those jobs are and how to position yourself for them.',
      },
      { type: 'heading', text: 'Why government demand for paramedics is rising' },
      {
        type: 'paragraph',
        text: 'Public health infrastructure is expanding. New primary health centres, upgraded district hospitals, diagnostic labs and imaging facilities all need trained technicians and support staff to run. Every new lab needs technicians, every new scan centre needs radiographers, and every sanitation drive needs inspectors. That structural demand is what makes paramedical qualifications valuable in the government sector.',
      },
      { type: 'heading', text: 'Where the government jobs are' },
      {
        type: 'list',
        items: [
          'State health departments and district hospitals — lab technicians, OT technicians, radiographers.',
          'Primary Health Centres (PHCs) and Community Health Centres — technicians and health workers.',
          'Municipal corporations and panchayats — Health Sanitary Inspectors and sanitation supervisors.',
          'Railway medical units and ESIC hospitals — a range of paramedical support roles.',
          'Defence and paramilitary medical services — technicians across specialities.',
        ],
      },
      { type: 'heading', text: 'The Health Sanitary Inspector advantage' },
      {
        type: 'paragraph',
        text: 'Among paramedical qualifications, the Health Sanitary Inspector (HSI) certificate has a particularly strong link to government roles, because sanitation and public-health enforcement are largely run by municipal and state bodies. For students specifically targeting a sarkari naukri, HSI is worth a serious look alongside the clinical diplomas.',
      },
      { type: 'heading', text: 'How to prepare while you study' },
      {
        type: 'list',
        items: [
          'Keep your documents and certificates in order from day one — government applications are paperwork-heavy.',
          'Follow official recruitment boards and department notifications regularly; deadlines are strict.',
          'Build strong practical skills — many posts include a skill or practical test.',
          'Prepare basic general-awareness and reasoning, which feature in many recruitment exams.',
          'Gain private-sector experience in the meantime; it strengthens your profile and pays the bills while you apply.',
        ],
      },
      {
        type: 'quote',
        text: 'Government selection rewards preparation and patience. Keep your skills sharp and your paperwork ready, and apply consistently.',
        cite: 'ARPI career desk',
      },
      { type: 'heading', text: 'A realistic mindset' },
      {
        type: 'paragraph',
        text: 'Government recruitment can be competitive and the timelines unpredictable. The smartest approach is to treat it as one strong track among several: build experience in the private sector, keep upgrading your qualifications, and apply for government posts steadily as they open. That way you are earning and growing while you pursue the security of a government role — instead of waiting idle for a single result.',
      },
      { type: 'heading', text: 'Start with the right foundation' },
      {
        type: 'paragraph',
        text: 'Whichever government route you target, it begins with a recognised, practical paramedical qualification and genuine hands-on skill. Choose your course with the end goal in mind, and speak to a counsellor about which diploma or certificate best aligns with the government opportunities you are aiming for.',
      },
    ],
  },
  {
    title: 'From Gaya to a City Diagnostic Lab: Priya’s DMLT Journey',
    slug: 'student-success-priya-dmlt-journey',
    category: 'Student Success Stories',
    author: AUTHOR_TEAM,
    authorPhoto: PHOTO_TEAM,
    publishDate: '2025-12-08',
    featuredImage: '/uploads/blog/success-priya-dmlt.png',
    relatedCourseSlug: 'medical-lab-technician',
    excerpt:
      'A student success story: how a DMLT graduate from Gaya built the practical skills and confidence to land a full-time lab technician role.',
    body: [
      {
        type: 'paragraph',
        text: 'Every course page lists salaries and job roles, but nothing explains the value of a paramedical qualification better than a real student journey. This is the story of a DMLT graduate from Gaya — shared here as a representative example of the path our students take from enrolment to employment.',
      },
      { type: 'heading', text: 'Starting with doubts' },
      {
        type: 'paragraph',
        text: 'Like many students, Priya joined the Diploma in Medical Lab Technician programme unsure whether a diploma would really lead anywhere. She had finished her 12th in science, could not immediately afford a longer degree, and wanted a course that would make her employable quickly. The DMLT fit — two years, strongly practical, and directly linked to a growing field.',
      },
      { type: 'heading', text: 'The turning point: hands-on practice' },
      {
        type: 'paragraph',
        text: 'What changed things for her was the lab time. Instead of only reading about tests, she spent months actually collecting samples, running blood and urine analyses, handling instruments and learning quality control. By her final semester she was comfortable with the everyday work of a real diagnostic lab — and that confidence is exactly what employers look for.',
      },
      {
        type: 'quote',
        text: 'In my interview they did not ask me to recite theory. They asked if I could run the tests and handle samples correctly. Because of my practical training, I could say yes — and mean it.',
        cite: 'DMLT graduate, Gaya',
      },
      { type: 'heading', text: 'Landing the first role' },
      {
        type: 'paragraph',
        text: 'After completing the diploma, she started as a lab technician at a busy diagnostic centre. The starting salary was modest, as it honestly is for most freshers, but the role gave her something more valuable in the first year: exposure to a high volume of tests and a range of equipment. That experience is now setting her up for a supervisory track and a planned B.Sc in Medical Lab Technology.',
      },
      { type: 'heading', text: 'What her journey teaches new students' },
      {
        type: 'list',
        items: [
          'Take practical training seriously — it is what actually gets you hired.',
          'Accept a realistic first salary as paid experience, not a final destination.',
          'Say yes to variety early; the more tests and machines you learn, the faster you rise.',
          'Plan your next upgrade (a B.Sc or specialisation) from the start.',
        ],
      },
      { type: 'heading', text: 'Your story could be next' },
      {
        type: 'paragraph',
        text: 'The pattern behind stories like this is not luck — it is a recognised course, genuine hands-on practice, and a realistic, committed mindset. If you are considering a career in medical lab technology, the same path is open to you. Explore the course, ask about the practical training, and take the first step.',
      },
    ],
  },
]

function estimateReadingTime(body: ContentBlock[]) {
  const words = body.reduce((count, block) => {
    if (block.type === 'paragraph' || block.type === 'heading') {
      return count + block.text.split(/\s+/).length
    }
    if (block.type === 'quote') {
      return count + block.text.split(/\s+/).length
    }
    if (block.type === 'list') {
      return count + block.items.join(' ').split(/\s+/).length
    }
    return count
  }, 0)
  return Math.max(1, Math.round(words / 200))
}

export const posts: BlogPost[] = rawPosts
  .map((p) => ({ ...p, readingTime: estimateReadingTime(p.body) }))
  .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

export function getAllPosts() {
  return posts
}

export function getPostsByCategory(category: BlogCategory) {
  return posts.filter((p) => p.category === category)
}

export function getPostsByCourse(courseSlug: string) {
  return posts.filter((p) => p.relatedCourseSlug === courseSlug)
}

export function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

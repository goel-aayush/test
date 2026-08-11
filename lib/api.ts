import { Course, courses, getCourse } from './courses'
import { BlogPost, getAllPosts, getPost } from './blog'
import { testimonials, faculty, facilities, gallery, notices, Faculty, Facility, Notice } from './content'
import type { Testimonial } from '@/components/testimonial-card'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function fetchFromAPI<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.warn(`API request to ${endpoint} failed with status ${res.status}. Using fallback.`);
      return fallbackData;
    }
    const json = await res.json();
    if (json.success && json.data !== undefined) {
      return json.data as T;
    }
    return fallbackData;
  } catch (error) {
    console.warn(`API request to ${endpoint} failed. Using fallback data. Error:`, error);
    return fallbackData;
  }
}

export async function getCoursesFromAPI(): Promise<Course[]> {
  return fetchFromAPI<Course[]>('/courses', courses);
}

export async function getCourseBySlugFromAPI(slug: string): Promise<Course | null> {
  const fallback = getCourse(slug) || null;
  return fetchFromAPI<Course | null>(`/courses/${slug}`, fallback);
}

export async function getBlogsFromAPI(): Promise<BlogPost[]> {
  return fetchFromAPI<BlogPost[]>('/blog', getAllPosts());
}

export async function getBlogBySlugFromAPI(slug: string): Promise<BlogPost | null> {
  const fallback = getPost(slug) || null;
  return fetchFromAPI<BlogPost | null>(`/blog/${slug}`, fallback);
}

export async function getNoticesFromAPI(): Promise<Notice[]> {
  return fetchFromAPI<Notice[]>('/notices?limit=100', notices);
}

export async function getTestimonialsFromAPI(): Promise<Testimonial[]> {
  return fetchFromAPI<Testimonial[]>('/testimonials', testimonials);
}

export async function getFacultyFromAPI(): Promise<Faculty[]> {
  return fetchFromAPI<Faculty[]>('/faculty', faculty);
}

export async function getGalleryFromAPI(): Promise<{ src: string; alt: string }[]> {
  return fetchFromAPI<{ src: string; alt: string }[]>('/gallery', gallery);
}

export async function getFaqsFromAPI(section?: string): Promise<any[]> {
  const query = section ? `?section=${section}` : '';
  return fetchFromAPI<any[]>(`/faqs${query}`, []);
}

export async function getFacilitiesFromAPI(): Promise<Facility[]> {
  return fetchFromAPI<Facility[]>('/facilities', facilities);
}

export async function getSettingsFromAPI(): Promise<any> {
  return fetchFromAPI<any>('/settings', null);
}


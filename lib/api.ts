const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function fetchFromAPI<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds (ISR)
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

export async function getCoursesFromAPI() {
  return fetchFromAPI('/courses', []);
}

export async function getCourseBySlugFromAPI(slug: string) {
  return fetchFromAPI(`/courses/${slug}`, null);
}

export async function getBlogsFromAPI() {
  return fetchFromAPI('/blog', []);
}

export async function getBlogBySlugFromAPI(slug: string) {
  return fetchFromAPI(`/blog/${slug}`, null);
}

export async function getNoticesFromAPI() {
  return fetchFromAPI('/notices', []);
}

export async function getTestimonialsFromAPI() {
  return fetchFromAPI('/testimonials', []);
}

export async function getFacultyFromAPI() {
  return fetchFromAPI('/faculty', []);
}

export async function getGalleryFromAPI() {
  return fetchFromAPI('/gallery', []);
}

export async function getFaqsFromAPI(section?: string) {
  const query = section ? `?section=${section}` : '';
  return fetchFromAPI(`/faqs${query}`, []);
}

export async function getFacilitiesFromAPI() {
  return fetchFromAPI('/facilities', []);
}

export async function getSettingsFromAPI() {
  return fetchFromAPI('/settings', null);
}

export async function fetchJSON<T>(url: string, errorMessage: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(errorMessage || 'Failed to fetch data');
  }
  return response.json();
}
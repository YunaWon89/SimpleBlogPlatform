const API_URL = "https://realworld.habsida.net/api";

export async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}
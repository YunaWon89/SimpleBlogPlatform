const API_URL = "https://realworld.habsida.net/api";

export async function fetchArticles(limit: number, offset: number) {
  const res = await fetch(
    `${API_URL}/articles?limit=${limit}&offset=${offset}`
  );

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}

export async function fetchArticle(slug: string) {
  const res = await fetch(`${API_URL}/articles/${slug}`);

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}
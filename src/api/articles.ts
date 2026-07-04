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
export async function createArticle(
  token: string,
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }
) {
  const response = await fetch("https://realworld.habsida.net/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ article }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function updateArticle(
  token: string,
  slug: string,
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }
) {
  const response = await fetch(
    `https://realworld.habsida.net/api/articles/${slug}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function favoriteArticle(token: string, slug: string) {
  const response = await fetch(
    `https://realworld.habsida.net/api/articles/${slug}/favorite`,
    {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data.article;
}

export async function unfavoriteArticle(token: string, slug: string) {
  const response = await fetch(
    `https://realworld.habsida.net/api/articles/${slug}/favorite`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data.article;
}

export async function fetchTags() {
  const response = await fetch(
    "https://realworld.habsida.net/api/tags"
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to load tags");
  }

  return data.tags;
}


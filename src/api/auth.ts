const API_URL = "https://realworld.habsida.net/api";

export async function registerUser(user: {
  username: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}

export async function loginUser(user: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}

export async function getCurrentUser(token: string) {
  const res = await fetch(`${API_URL}/user`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}

export async function updateUser(
  token: string,
  user: {
    username: string;
    email: string;
    password?: string;
    image?: string;
  }
) {
  const res = await fetch(`${API_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ user }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}
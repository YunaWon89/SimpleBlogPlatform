const API_URL = "https://realworld.habsida.net/api";

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: { email, password },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  // 🔥 сохраняем
  localStorage.setItem("token", data.user.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

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
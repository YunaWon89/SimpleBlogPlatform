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

export async function updateUser(
  token: string,
  user: {
    username: string;
    email: string;
    bio?: string;
    password?: string;
    image?: string;
  }
) {
  const response = await fetch(`${API_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ user }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function followUser(username: string, token: string) {
  const res = await fetch(
    `https://realworld.habsida.net/api/profiles/${username}/follow`,
    {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export async function unfollowUser(username: string, token: string) {
  const res = await fetch(
    `https://realworld.habsida.net/api/profiles/${username}/follow`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
// src/utils/auth.js
export async function fetchCurrentUser() {
  try {
    const res = await fetch("/api/auth/refresh", {
      method: "GET",
      credentials: "include", // important: sends HttpOnly cookie
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user; // {id, username, email}
  } catch (err) {
    console.error(err);
    return null;
  }
}

const API = "http://localhost:3001/projects";

export async function getProjects() {
  const token = localStorage.getItem("token");

  const res = await fetch(API, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  return res.json();
}

export async function createProject(name) {
  const token = localStorage.getItem("token");

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name, category: "default" })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create project");
  }

  return res.json();
}

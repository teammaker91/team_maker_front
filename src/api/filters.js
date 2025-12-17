const API_URL = "http://localhost:3001";

export const getFilters = async () => {
  try {
    const res = await fetch(`${API_URL}/filters`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

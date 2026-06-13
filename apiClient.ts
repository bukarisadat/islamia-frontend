const BASE_URL = import.meta.env.VITE_API_URL || '';

console.log('BASE_URL =', BASE_URL);

async function fetchJson(path: string, body?: any) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export const apiClient = {
  getItems: () => fetchJson('/api/items'),
  createItem: (item: { name: string }) => fetchJson('/api/items', item),
};
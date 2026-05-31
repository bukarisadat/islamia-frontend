const BASE_URL = import.meta.env.VITE_API_URL || '';

async function fetchJson(path: string, body?: any) {
  const res = await fetch(`${BASE_URL}${path}`, {

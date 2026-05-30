const BASE = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/api`
  : '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const getTasks = () => request('/tasks');

export const createTask = (name) =>
  request('/tasks', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });

export const deleteTask = (id) =>
  request(`/tasks/${id}`, { method: 'DELETE' });
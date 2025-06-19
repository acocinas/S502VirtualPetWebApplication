const API_URL = 'http://localhost:8080/api/v1/auth/login';
const REGISTER_URL = 'http://localhost:8080/api/v1/auth/register';

export async function login(username: string, password: string): Promise<any> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login fallido');
  }

  return response.json();
}

export async function register(username: string, password: string): Promise<any> {
  const response = await fetch(REGISTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Registro fallido');
  }

  try {
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (e) {
    return {};
  }
}

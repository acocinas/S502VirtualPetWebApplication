const API_URL = 'http://localhost:8080/api/v1/auth/login';


export async function login(username, password) {
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

  return response.json(); // Aquí recibimos el JWT si todo va bien
}

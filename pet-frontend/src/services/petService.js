const API_URL = 'http://localhost:8080/api/v1/pets';

export async function getAllPets() {
  const token = localStorage.getItem('token');

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Error al obtener las mascotas');
  }

  return response.json();
}

export async function createPet(petData) {
  const token = localStorage.getItem('token');

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(petData)
  });

  if (!response.ok) {
    throw new Error('Error al crear la mascota');
  }

  return response.json();
}

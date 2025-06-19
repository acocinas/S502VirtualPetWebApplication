const API_URL = 'http://localhost:8080/api/v1/pets';

interface PetData {
  name: string;
  developerType: 'FRONTEND' | 'BACKEND';
  habitatType: string;
  accessoryType: string;
  // puedes añadir más campos si los tienes definidos
}

export async function getAllPets(): Promise<any> {
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

export async function createPet(petData: PetData): Promise<any> {
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

export async function patchHabitat(petId: number, habitatType: string): Promise<any> {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/${petId}/habitat`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ newHabitat: habitatType }) // 🔧 Campo corregido
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el hábitat');
  }

  return response.json();
}

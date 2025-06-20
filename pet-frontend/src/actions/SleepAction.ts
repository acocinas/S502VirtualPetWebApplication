// src/actions/SleepAction.ts
const API_URL = 'http://localhost:8080/api/v1/pets';
import sleepImage from '../assets/descansar.png';

export const sleepPet = async (petId: number): Promise<any> => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/${petId}/action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      action: 'sleep',
      parameter: null
    })
  });

  if (!response.ok) {
    throw new Error('Error al realizar la acción de dormir');
  }

  return response.json();
};

export const sleepImageIcon = sleepImage;


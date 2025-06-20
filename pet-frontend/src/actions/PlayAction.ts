const API_URL = 'http://localhost:8080/api/v1/pets';
import playImage from '../assets/ps.png';

export const playPet = async (petId: number): Promise<any> => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/${petId}/action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      action: 'play',
      parameter: null
    })
  });

  if (!response.ok) {
    throw new Error('Error al realizar la acción de jugar');
  }

  return response.json();
};

export const playImageIcon = playImage;

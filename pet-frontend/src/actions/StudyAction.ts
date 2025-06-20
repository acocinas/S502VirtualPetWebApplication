const API_URL = 'http://localhost:8080/api/v1/pets';

export async function studyPet(petId: number, stackName: string): Promise<any> {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/${petId}/action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      action: 'study',
      parameter: stackName
    })
  });

  if (!response.ok) {
    throw new Error('Error al estudiar');
  }

  return response.json();
}

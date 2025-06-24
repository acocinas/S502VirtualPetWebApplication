// src/services/actions/StudyAction.ts
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
    let errorMessage = 'No se pudo estudiar.';
    try {
      const errorBody = await response.json();
      console.log("BODY DEL ERROR", errorBody);
      errorMessage = errorBody?.message || errorMessage;
    } catch (e) {
      console.warn('No se pudo interpretar el error como JSON:', e);
    }
    console.log("Lanzando error con mensaje:", errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
}

import { useEffect, useState } from 'react';
import { getAllPets } from '../services/petService';

function AdminPets() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllPets()
      .then(data => setPets(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>🐾 Mascotas del sistema (vista admin)</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pets.length > 0 ? (
        <ul>
          {pets.map(pet => (
            <li key={pet.id}>{pet.name} – {pet.developerType}</li>
          ))}
        </ul>
      ) : (
        <p>No hay mascotas disponibles.</p>
      )}
    </div>
  );
}

export default AdminPets;

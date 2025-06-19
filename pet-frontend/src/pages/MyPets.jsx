import { useEffect, useState } from 'react';
import { getAllPets } from '../services/petService';
import PetCard from '../components/PetCard';

function MyPets() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    getAllPets()
      .then(data => {
        const userPets = data.filter(pet => pet.ownerUsername === username);
        setPets(userPets);
      })
      .catch(err => setError(err.message));
  }, [username]);

  return (
    <div>
      <h2>🐶 Mis Mascotas ({username})</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pets.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {pets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      ) : (
        <p>No tienes mascotas registradas.</p>
      )}
    </div>
  );
}

export default MyPets;

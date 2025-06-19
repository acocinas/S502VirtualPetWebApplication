import { useEffect, useState } from 'react';
import { getAllPets } from '../services/petService';
import PetCard from '../components/PetCard';

interface Stack {
  stackName: string;
  studyPoints: number;
}

interface Pet {
  id: number;
  name: string;
  developerType: 'FRONTEND' | 'BACKEND';
  habitatType: string;
  accessoryType: string;
  knowledge: number;
  levelKnowledge: number;
  happiness: number;
  energy: number;
  stacks?: Stack[];
  ownerUsername: string;
}

const MyPets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<string>('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    getAllPets()
      .then(data => {
        const userPets = data.filter((pet: Pet) => pet.ownerUsername === username);
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
};

export default MyPets;

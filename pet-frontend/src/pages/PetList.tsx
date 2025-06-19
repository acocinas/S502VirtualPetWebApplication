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
}

const PetList: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getAllPets()
      .then(data => setPets(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>🐾 Todas las Mascotas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pets.length > 0 ? (
        <div>
          {pets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      ) : (
        <p>No hay mascotas disponibles.</p>
      )}
    </div>
  );
};

export default PetList;

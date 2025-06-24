import { useEffect, useState } from 'react';
import { getAllPets } from '../services/petService';
import { Pet } from '../types/Pet';
import PetPreviewCard from '../components/PetPreviewCard';
import collageBg from '../assets/wallpapers/collage_habitats.png';

const PetList: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getAllPets()
      .then(data => setPets(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${collageBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <h2 style={{ color: '#fff' }}>🐾 Todas las Mascotas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          justifyItems: 'center',
        }}
      >
        {pets.map(pet => (
          <PetPreviewCard key={pet.id} pet={pet} showOwner={true} />
        ))}
      </div>
    </div>
  );
};

export default PetList;

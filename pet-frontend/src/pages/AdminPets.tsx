import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPets } from '../services/petService';
import { Pet } from '../types/Pet';
import PetPreviewCard from '../components/PetPreviewCard';
import collageBg from '../assets/wallpapers/collage_habitats.png';

const AdminPets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllPets()
      .then((data) => setPets(data))
      .catch((err) => setError(err.message));
  }, []);

  const handleReturnHome = () => {
    navigate('/home');
  };

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
      <button
        onClick={handleReturnHome}
        style={{
          backgroundColor: '#444',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        🔙 Volver
      </button>

      <h2 style={{ color: '#fff' }}>🐾 Todas las mascotas </h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
          gap: '6px',
          marginTop: '2rem',
        }}
      >
        {pets.map((pet) => (
          <PetPreviewCard key={pet.id} pet={pet} showOwner={true} />
        ))}
      </div>
    </div>
  );
};

export default AdminPets;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPets } from '../services/petService';
import { Pet } from '../types/Pet';
import PetPreviewCard from '../components/PetPreviewCard';
import collageBg from '../assets/wallpapers/collage_habitats.png';

const MyPets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<string>('');
  const username = localStorage.getItem('username') || 'Usuario';
  const navigate = useNavigate();

  useEffect(() => {
    getAllPets()
      .then((data) => {
        const userPets = data.filter((pet: Pet) => pet.ownerUsername === username);
        setPets(userPets);
      })
      .catch((err) => setError(err.message));
  }, [username]);

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
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <button
        onClick={handleReturnHome}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: '#444',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        ← Volver
      </button>

      <h2 style={{ color: '#fff', marginBottom: '1rem' }}>🐶 Mascotas de {username}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
          gap: '6px',
          justifyItems: 'center',
        }}
      >
        {pets.map((pet) => (
          <PetPreviewCard key={pet.id} pet={pet} showOwner={true} />
        ))}
      </div>
    </div>
  );
};

export default MyPets;

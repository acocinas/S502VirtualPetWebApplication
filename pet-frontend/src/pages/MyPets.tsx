import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPets } from '../services/petService';
import PetCard from '../components/PetCard';
import { Pet } from '../types/Pet';
import collageBg from '../assets/wallpapers/collage_habitats.png'; // asegúrate que esté bien importado

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

  const handlePetUpdated = (updatedPet: Pet) => {
    setPets((prev) => prev.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet)));
  };

  const handleReturnHome = () => {
    navigate('/home');
  };

  const handleCreatePet = () => {
    navigate('/create-pet');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/');
  };

  if (pets.length === 0) {
    return (
      <div
        style={{
          backgroundImage: `url(${collageBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
          height: '100vh',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '2rem',
            borderRadius: '1rem',
            textAlign: 'center',
            boxShadow: '0 0 15px rgba(0,0,0,0.3)',
            width: '300px',
            color: '#222',
          }}
        >
          <h2>Mascotas de {username}</h2>
          <p style={{ fontWeight: 'bold' }}>¡¡¡ Ohh!!!</p>
          <p>¡¡ No tienes mascotas registradas !!!</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button
              onClick={handleCreatePet}
              style={{
                padding: '0.5rem 1rem',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '0.5rem',
                backgroundColor: '#007bff',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Crear Mascota
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 1rem',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '0.5rem',
                backgroundColor: '#333',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              🔒 Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>🐶 Mascotas de {username}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {pets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            onPetUpdated={handlePetUpdated}
            onReturnHome={handleReturnHome}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPets;

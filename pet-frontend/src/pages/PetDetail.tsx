import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getPetById } from '../services/petService';
import PetCard from '../components/PetCard';
import { Pet } from '../types/Pet';

const PetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [pet, setPet] = useState<Pet | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      getPetById(parseInt(id))
        .then((data) => setPet(data))
        .catch((err) => setError(err.message));
    }
  }, [id]);

  const handlePetUpdated = (updatedPet: Pet) => {
    setPet(updatedPet);
  };

  const handleReturnHome = () => {
    const returnTo = location.state?.returnTo || '/mypets';
    navigate(returnTo);
  };

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  if (!pet) {
    return <p>Cargando mascota...</p>;
  }

  return (
    <PetCard
      pet={pet}
      onPetUpdated={handlePetUpdated}
      onReturnHome={handleReturnHome}
    />
  );
};

export default PetDetail;

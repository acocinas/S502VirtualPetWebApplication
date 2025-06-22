import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPets } from '../services/petService';
import PetCard from '../components/PetCard';
import { Pet } from '../types/Pet'; // Asegúrate de importar correctamente el tipo

const AdminPets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllPets()
      .then(data => setPets(data))
      .catch(err => setError(err.message));
  }, []);

  const handlePetUpdated = (updatedPet: Pet) => {
    setPets(prev =>
      prev.map(p => (p.id === updatedPet.id ? updatedPet : p))
    );
  };

  const handleReturnHome = () => {
    navigate('/home');
  };

  return (
    <div>
      <button onClick={handleReturnHome}>🔙 Volver</button>
      <h2>🐾 Mascotas del sistema (vista admin)</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pets.length > 0 ? (
        <div>
          {pets.map(pet => (
            <PetCard
              key={pet.id}
              pet={pet}
              onPetUpdated={handlePetUpdated}
              onReturnHome={handleReturnHome}
            />
          ))}
        </div>
      ) : (
        <p>No hay mascotas disponibles.</p>
      )}
    </div>
  );
};

export default AdminPets;

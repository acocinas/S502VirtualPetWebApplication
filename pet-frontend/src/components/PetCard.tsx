import React, { useState, useEffect } from 'react';
import conejo from '../assets/conejo.png';
import pollito from '../assets/pollito.png';
import habitatImages from '../assets/habitatImages';
import HabitatSelector from './HabitatSelector';
import EatButton from './EatButton';
import SleepButton from './SleepButton';
import PlayButton from './PlayButton';
import StudyButton from './StudyButton';
import { getPetById, patchHabitat, deletePet } from '../services/petService';
import { Pet } from '../types/Pet';
import { studyPet } from '../actions/StudyAction';

interface Props {
  pet: Pet;
  onPetUpdated: (updatedPet: Pet) => void;
  onReturnHome: () => void; // callback para volver al menú principal
}

const PetCard: React.FC<Props> = ({ pet, onPetUpdated, onReturnHome }) => {
  const [localPet, setLocalPet] = useState(pet);
  const [habitat, setHabitat] = useState(pet.habitatType);

  useEffect(() => {
    setLocalPet(pet);
    setHabitat(pet.habitatType);
  }, [pet]);

  const getImage = (): string | undefined => {
    if (localPet.developerType === 'FRONTEND') return conejo;
    if (localPet.developerType === 'BACKEND') return pollito;
    return undefined;
  };

  const image = getImage();
  const backgroundImage = habitatImages[habitat];

  const refreshPet = async () => {
    try {
      const freshPet = await getPetById(localPet.id);
      setLocalPet(prev => ({ ...prev, ...freshPet }));
      onPetUpdated(freshPet);
    } catch (error) {
      console.error('Error al actualizar la mascota', error);
    }
  };

  const handleHabitatChange = async (newHabitat: string) => {
    try {
      const updatedPet = await patchHabitat(localPet.id, newHabitat);
      setHabitat(updatedPet.habitatType);
      setLocalPet(updatedPet);
    } catch (error) {
      alert('Error al cambiar el hábitat');
      console.error(error);
    }
  };

  const handleStudy = async (stackName: string) => {
    try {
      const updatedPet = await studyPet(localPet.id, stackName);
      setLocalPet(updatedPet);
      onPetUpdated(updatedPet);
    } catch (error) {
      alert('Error al estudiar');
    }
  };

const handleDelete = async () => {
  const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta mascota?');
  if (!confirmDelete) return;

  try {
    await deletePet(localPet.id);
    alert('Mascota eliminada correctamente');
    setTimeout(() => {
      onReturnHome();
    }, 200); // pequeña pausa para evitar que el render tras redirigir cause error
  } catch (error: any) {
    console.error('Error al eliminar la mascota:', error);
    const msg = error?.response?.status === 403
      ? 'No tienes permisos para eliminar esta mascota.'
      : 'No se pudo eliminar la mascota';
    alert(msg);
  }
};


  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: 'calc(100vh - 50px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Botón cerrar sesión */}
      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        }}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
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
        🔒 Cerrar sesión
      </button>

      {/* Botón volver */}
      <button
        onClick={onReturnHome}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
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

      {image && (
        <img
          src={image}
          alt={localPet.name}
          style={{
            width: '220px',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      )}

      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          maxWidth: '40vw',
        }}
      >
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{localPet.name}</h3>
        <p>👨‍💻 Tipo de Desarrollador: {localPet.developerType}</p>
        <p>📍 Hábitat: {habitat}</p>
        <HabitatSelector
          petId={localPet.id}
          currentHabitat={habitat}
          onHabitatChange={handleHabitatChange}
        />

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1rem 0' }}>
          <EatButton petId={localPet.id} onActionCompleted={refreshPet} />
          <SleepButton petId={localPet.id} onActionCompleted={refreshPet} />
          <PlayButton petId={localPet.id} onActionCompleted={refreshPet} />
          {localPet.stacks && (
            <StudyButton
              availableStacks={localPet.stacks.map(stack => stack.stackName)}
              stacks={localPet.stacks}
              onStudy={handleStudy}
            />
          )}
        </div>

        <p>🧸 Accesorio: {localPet.accessoryType}</p>
        <p>📚 Conocimiento: {localPet.knowledge}</p>
        <p>🧠 Nivel: {localPet.levelKnowledge}</p>
        <p>😊 Felicidad: {localPet.happiness}</p>
        <p>⚡ Energía: {localPet.energy}</p>

        {localPet.stacks && localPet.stacks.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h4>📚 Stacks:</h4>
            <ul>
              {localPet.stacks.map((stack, index) => (
                <li key={index}>
                  {stack.stackName} ({stack.studyPoints} puntos)
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Botón eliminar mascota */}
        <button
          onClick={handleDelete}
          style={{
            marginTop: '1.5rem',
            backgroundColor: '#b00020',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          🗑️ Eliminar mascota
        </button>
      </div>
    </div>
  );
};

export default PetCard;

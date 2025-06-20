import React, { useState, useEffect } from 'react';
import conejo from '../assets/conejo.png';
import pollito from '../assets/pollito.png';
import habitatImages from '../assets/habitatImages';
import HabitatSelector from './HabitatSelector';
import EatButton from './EatButton';
import SleepButton from './SleepButton';
import PlayButton from './PlayButton';
import { getPetById, patchHabitat } from '../services/petService';
import { Pet, Stack } from '../types/Pet';

interface Props {
  pet: Pet;
  onPetUpdated: (updatedPet: Pet) => void;
}

const PetCard: React.FC<Props> = ({ pet, onPetUpdated }) => {
  const [localPet, setLocalPet] = useState(pet);
  const [habitat, setHabitat] = useState(pet.habitatType);
  useEffect(() => {
  setLocalPet(pet);
  setHabitat(pet.habitatType);
}, [pet]);
console.log('[PROP] pet recibida del padre:', pet);
console.log('[STATE] localPet:', localPet);


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
      onPetUpdated(freshPet); // ✅ actualiza el padre
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
      }}
    >
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

        <div style={{ display: 'flex', gap: '1.2rem', margin: '1rem 0' }}>
          <EatButton petId={localPet.id} onActionCompleted={refreshPet} />
          <SleepButton petId={localPet.id} onActionCompleted={refreshPet} />
          <PlayButton petId={localPet.id} onActionCompleted={refreshPet} />
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
      </div>
    </div>
  );
};

export default PetCard;

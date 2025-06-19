import React, { useState } from 'react';
import conejo from '../assets/conejo.png';
import pollito from '../assets/pollito.png';
import habitatImages from '../assets/habitatImages';
import HabitatSelector from './HabitatSelector';

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

interface Props {
  pet: Pet;
}

const PetCard: React.FC<Props> = ({ pet }) => {
  const [habitat, setHabitat] = useState(pet.habitatType);

  const getImage = (): string | undefined => {
    if (pet.developerType === 'FRONTEND') return conejo;
    if (pet.developerType === 'BACKEND') return pollito;
    return undefined;
  };

  const image = getImage();
  const backgroundImage = habitatImages[habitat];

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        marginBottom: '1rem',
        borderRadius: '10px',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      <h3>{pet.name}</h3>

      {image && (
        <img src={image} alt={pet.name} style={{ maxWidth: '200px' }} />
      )}

      <p>👨‍💻 Tipo de Desarrollador: {pet.developerType}</p>
      <p>📍 Hábitat: {habitat}</p>
      <HabitatSelector
        petId={pet.id}
        currentHabitat={habitat}
        onHabitatChange={setHabitat}
      />
      <p>🧸 Accesorio: {pet.accessoryType}</p>
      <p>📚 Conocimiento: {pet.knowledge}</p>
      <p>🧠 Nivel: {pet.levelKnowledge}</p>
      <p>😊 Felicidad: {pet.happiness}</p>
      <p>⚡ Energía: {pet.energy}</p>

      {pet.stacks && pet.stacks.length > 0 && (
        <div>
          <h4>📚 Stacks:</h4>
          <ul>
            {pet.stacks.map((stack, index) => (
              <li key={index}>
                {stack.stackName} ({stack.studyPoints} puntos)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PetCard;

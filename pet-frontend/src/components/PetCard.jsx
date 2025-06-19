
import React from 'react';
import conejo from '../assets/conejo.png';
import pollito from '../assets/pollito.png';

function PetCard({ pet }) {
  const getImage = () => {
    if (pet.developerType === 'FRONTEND') return conejo;
    if (pet.developerType === 'BACKEND') return pollito;
    return null;
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      marginBottom: '1rem',
      borderRadius: '10px',
    }}>
      <h3>{pet.name}</h3>
      <img src={getImage()} alt={pet.name} style={{ maxWidth: '200px' }} />
      <p>👨‍💻 Tipo de Desarrollador: {pet.developerType}</p>
      <p>📍 Hábitat: {pet.habitatType}</p>
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
              <li key={index}>{stack.stackName} ({stack.studyPoints} puntos)</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PetCard;

import React from 'react';
import { playPet, playImageIcon } from '../actions/PlayAction';
import { Pet } from '../types/Pet';

interface Props {
  petId: number;
  onActionCompleted: (updatedPet: Pet) => void;
}

const PlayButton: React.FC<Props> = ({ petId, onActionCompleted }) => {
  const handleClick = async () => {
    try {
      const updatedPet = await playPet(petId); // ✅ recibe mascota actualizada
      onActionCompleted(updatedPet);           // ✅ se la pasa al padre
    } catch (error) {
      alert('Error al jugar');
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
    >
      <img
        src={playImageIcon}
        alt="Jugar"
        title="Jugar y aumentar felicidad"
        style={{ width: '50px' }}
      />
    </button>
  );
};

export default PlayButton;

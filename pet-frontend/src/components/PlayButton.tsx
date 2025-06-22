import React from 'react';
import playIcon from '../assets/action_buttons/ps.png';
import { playPet } from '../actions/PlayAction';
import { Pet } from '../types/Pet';

interface Props {
  petId: number;
  onActionCompleted: (updatedPet: Pet) => void;
}

const PlayButton: React.FC<Props> = ({ petId, onActionCompleted }) => {
  const handleClick = async () => {
    try {
      const updatedPet = await playPet(petId);
      onActionCompleted(updatedPet);
    } catch (error) {
      alert('Error al jugar');
    }
  };

  return (
    <button onClick={handleClick} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
      <img
        src={playIcon}
        alt="Jugar"
        title="Jugar y aumentar felicidad"
        style={{ width: '50px' }}
      />
    </button>
  );
};

export default PlayButton;

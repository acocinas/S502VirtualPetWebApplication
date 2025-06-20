// src/components/SleepButton.tsx
import React from 'react';
import { sleepPet, sleepImageIcon } from '../actions/SleepAction';
import { Pet } from '../types/Pet';

interface Props {
  petId: number;
  onActionCompleted: (updatedPet: Pet) => void;
}


const SleepButton: React.FC<Props> = ({ petId, onActionCompleted }) => {
  const handleClick = async () => {
    try {
      const updatedPet = await sleepPet(petId);
      onActionCompleted(updatedPet);

    } catch (error) {
      alert('Error al dormir');
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
    >
      <img
        src={sleepImageIcon}
        alt="Dormir"
        title="Restaura energía y felicidad"
        style={{ width: '50px' }}
      />
    </button>
  );
};

export default SleepButton;

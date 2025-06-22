// src/components/EatButton.tsx
import React from 'react';
import burgerIcon from '../assets/action_buttons/burger.png';
import { eatPet } from '../actions/EatAction';
import { Pet } from '../types/Pet';

interface Props {
  petId: number;
  onActionCompleted: (updatedPet: Pet) => void;
}

const EatButton: React.FC<Props> = ({ petId, onActionCompleted }) => {
  const handleClick = async () => {
    try {
      const updatedPet = await eatPet(petId); // ✅ obtenemos la mascota actualizada
      onActionCompleted(updatedPet);          // ✅ la pasamos al padre
    } catch (error) {
      alert('Error al comer');
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        marginTop: '1rem',
      }}
      title="Comer"
    >
      <img src={burgerIcon} alt="Comer" style={{ width: '50px', height: '50px' }} />
    </button>
  );
};

export default EatButton;

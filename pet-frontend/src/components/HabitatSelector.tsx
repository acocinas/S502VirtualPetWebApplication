import React, { useState } from 'react';
import { patchHabitat } from '../services/petService';

interface Props {
  petId: number;
  currentHabitat: string;
  onHabitatChange: (newHabitat: string) => void;
}

const habitatOptions = ['WORKSPACE', 'SOCIAL_ZONE', 'REST_ZONE', 'WELLNESS_ZONE'];

const HabitatSelector: React.FC<Props> = ({ petId, currentHabitat, onHabitatChange }) => {
  const [selected, setSelected] = useState(currentHabitat);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHabitat = e.target.value;
    setSelected(newHabitat);

    try {
      await patchHabitat(petId, newHabitat);
      onHabitatChange(newHabitat); // notifica al componente padre para actualizar el fondo
    } catch (error) {
      console.error('Error updating habitat:', error);
    }
  };

  return (
    <div>
      <label htmlFor={`habitat-${petId}`}>Change Habitat:</label>
      <select id={`habitat-${petId}`} value={selected} onChange={handleChange}>
        {habitatOptions.map((habitat) => (
          <option key={habitat} value={habitat}>
            {habitat.replace('_', ' ')}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HabitatSelector;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pet } from '../types/Pet';
import frontendImg from '../assets/pets/conejo.png';
import backendImg from '../assets/pets/pollito.png';

type Props = {
  pet: Pet;
  showOwner?: boolean;
};

const PetPreviewCard: React.FC<Props> = ({ pet, showOwner = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/mypets/${pet.id}`);
  };

  const petImage = pet.developerType === 'FRONTEND' ? frontendImg : backendImg;

  return (
    <div
      onClick={handleClick}
      style={{
        width: '80px',
        height: '100px',
        borderRadius: '8px',
        backgroundColor: 'rgba(255,255,255,0.8)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        gap: '4px',
        padding: '6px',
      }}
    >
      <img
        src={petImage}
        alt="pet"
        style={{ width: '40px', height: '40px', objectFit: 'contain' }}
      />
      <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
        {pet.name}
      </span>
      {showOwner && (
        <span style={{ fontSize: '8px', color: '#333', textAlign: 'center' }}>
          {pet.ownerUsername}
        </span>
      )}
    </div>
  );
};

export default PetPreviewCard;

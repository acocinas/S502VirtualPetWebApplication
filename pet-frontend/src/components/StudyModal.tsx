// src/components/StudyModal.tsx
import React from 'react';

interface Props {
  stacks: string[];
  onSelect: (stackName: string) => void;
  onClose: () => void;
}

const StudyModal: React.FC<Props> = ({ stacks, onSelect, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        minWidth: '300px',
        maxWidth: '80vw'
      }}>
        <h3>Selecciona un stack para estudiar</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
          {stacks.map((stack, index) => (
            <button
              key={index}
              onClick={() => onSelect(stack)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {stack}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          style={{ marginTop: '1.5rem', backgroundColor: '#aaa', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default StudyModal;

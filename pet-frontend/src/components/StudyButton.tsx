// src/components/StudyButton.tsx
import React, { useState } from 'react';
import studyIcon from '../assets/action_buttons/study.png';
import allStacks from '../constants/allStacks';
import { Stack } from '../types/Pet';
import { toast } from 'react-toastify';

interface Props {
  availableStacks: string[];
  stacks: Stack[];
  onStudy: (stackName: string) => Promise<void>;
}

const StudyButton: React.FC<Props> = ({ onStudy }) => {
  const [showPanel, setShowPanel] = useState(false);

  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

  const handleStudyClick = async (stackName: string) => {
    try {
      await onStudy(stackName);
    } catch (err: any) {
      console.error("Error completo recibido:", err);
      const backendMessage = err?.message;
      const finalMessage = backendMessage
        ? `😓 No puedes estudiar: ${backendMessage}`
        : '😓 Tu mascota no puede estudiar ahora';
      toast.error(finalMessage);
    } finally {
      setShowPanel(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={togglePanel} style={{ background: 'none', border: 'none' }}>
        <img src={studyIcon} alt="Estudiar" style={{ width: '50px' }} />
      </button>

      {showPanel && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.9)',
            padding: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            zIndex: 1000,
          }}
        >
          {allStacks.map((stack) => (
            <button
              key={stack.name}
              onClick={() => handleStudyClick(stack.name)}
              style={{
                background: 'transparent',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              <img src={stack.image} alt={stack.name} style={{ width: '40px', height: '40px' }} />
              <span>{stack.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyButton;

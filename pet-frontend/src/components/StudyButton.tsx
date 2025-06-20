// src/components/StudyButton.tsx
import React, { useState } from 'react';
import studyIcon from '../assets/study.png';
import allStacks from '../constants/allStacks';
import { Stack } from '../types/Pet';

interface Props {
  availableStacks: string[];
  stacks: Stack[];
  onStudy: (stackName: string) => void;
}

const StudyButton: React.FC<Props> = ({ onStudy }) => {
  const [showPanel, setShowPanel] = useState(false);

  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

  const handleStudyClick = (stackName: string) => {
    onStudy(stackName);
    setShowPanel(false);
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

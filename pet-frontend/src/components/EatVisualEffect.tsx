import React from 'react';
import burger from '../assets/action_buttons/burger.png';

interface Props {
  visible: boolean;
}

const EatVisualEffect: React.FC<Props> = ({ visible }) => {
  if (!visible) return null;

  return (
    <img
      src={burger}
      alt="Burger effect"
      style={{
        position: 'absolute',
        bottom: '25%',
        left: '20%',
        width: '100px',
        height: 'auto',
        zIndex: 4,
        pointerEvents: 'none',
      }}
    />
  );
};

export default EatVisualEffect;

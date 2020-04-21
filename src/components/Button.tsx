import React from 'react';

export type Props = {
  label: string;
  onPress: () => void;
}

export const Button: React.FC<Props> = ({label, onPress}) => {
  return (
    <button
      className={'cta'}
      onClick={(e) => {
      e.preventDefault();
      onPress()
    }}>
      {label}
    </button>
  )
}

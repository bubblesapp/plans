import React from 'react';

export type Props = {
  id: string;
  onChange: (name: string) => void;
}

export const PersonInput: React.FC<Props> = ({id, onChange}) => {
  return (
    <input type={'text'} name={id} />
  )
}

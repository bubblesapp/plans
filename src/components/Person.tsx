import React from 'react';

export type Props = {
  name: string;
}

export const Person: React.FC<Props> = ({name}) => {
  return (
    <p className={'person'}>{name}</p>
  )
}

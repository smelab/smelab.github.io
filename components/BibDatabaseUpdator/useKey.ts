import { useState } from 'react';

export function useKey() {
  const [key, setKey] = useState('');

  return [key, setKey] as const;
}

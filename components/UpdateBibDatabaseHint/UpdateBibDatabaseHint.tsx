'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { BsHeartFill } from 'react-icons/bs';

export function UpdateBibDatabaseHint() {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const router = useRouter();

  return (
    <span
      onMouseDown={() =>
        (timeoutRef.current = setTimeout(() => {
          router.push('/data');
        }, 1500))
      }
      onMouseUp={() =>
        timeoutRef.current &&
        (timeoutRef.current = clearTimeout(timeoutRef.current) as undefined)
      }
    >
      <BsHeartFill color="red" />
    </span>
  );
}

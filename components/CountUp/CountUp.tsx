'use client';

import { useEffect, useState } from 'react';
import ReactCountUp from 'react-countup';

interface IProps {
  count: number;
}

export function CountUp({ count }: IProps) {
  const [start, setStart] = useState(count);

  useEffect(() => {
    setStart(0);
  });

  return <ReactCountUp end={count} duration={2} start={start} />;
}

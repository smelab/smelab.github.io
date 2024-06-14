'use client';

import { useBetween } from 'use-between';
import { useKey } from '../useKey';

export function KeyFiller() {
  const [key] = useBetween(useKey);

  return <input name="privatekey" value={key} readOnly hidden />;
}

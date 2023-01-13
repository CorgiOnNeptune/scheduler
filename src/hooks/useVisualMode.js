import { useEffect, useState } from 'react';

export default function useVisualMode(mode) {
  const [current, setCurrent] = useState({ mode: 'FIRST' });

  return { mode };
}

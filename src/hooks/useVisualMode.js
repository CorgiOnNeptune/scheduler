import { useEffect, useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      history.pop();
    }

    setMode(newMode);
    setHistory([...history, newMode]);
  };

  const back = () => {
    if (history.length <= 1) return;

    history.pop();
    setMode(history[history.length - 1]);
  };

  console.log('history ➡️ ', `${history}`);
  console.log('mode ➡️ ', `${mode}`);

  return { mode, transition, back };
}

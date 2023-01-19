import { useState } from 'react';

/**
 * Hook to determine visual mode of AppointmentItems
 * @param {string} initial initial mode on declaration
 * @returns {{mode: string, transition: function, back: function}}
 */
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(newMode);
      setHistory((prev) => [...prev.slice(0, prev.length - 1), mode]);
      return;
    }

    setMode(newMode);
    setHistory([...history, newMode]);
  };

  const back = () => {
    if (history.length === 1) return;

    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
  };

  return { mode, transition, back };
}

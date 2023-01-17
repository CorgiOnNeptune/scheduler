import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    console.log('newMode; ', newMode);
    if (replace) {
      setMode(newMode);
      setHistory((prev) => [...prev.slice(0, prev.length - 1), mode]);
      return;
    }

    setMode(newMode);
    setHistory([...history, newMode]);
  }

  function back() {
    if (history.length === 1) return;

    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
  }

  return { mode, transition, back };
}

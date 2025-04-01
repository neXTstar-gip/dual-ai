// components/TypingText.js
import { useState, useEffect, useRef } from 'react';

export default function TypingText({ text, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    intervalRef.current = setInterval(() => {
      setDisplayedText(prev => prev + text[i]);
      i++;
      if (i === text.length) {
        clearInterval(intervalRef.current);
        if (onComplete) onComplete();
      }
    }, 50); // Adjust kecepatan sesuai selera
    return () => clearInterval(intervalRef.current);
  }, [text, onComplete]);

  const stopTyping = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <span>{displayedText}</span>
      <button onClick={stopTyping} className="ml-2 text-red-500">Stop</button>
    </div>
  );
}

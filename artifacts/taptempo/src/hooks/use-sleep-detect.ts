import { useState, useEffect, useRef } from 'react';

export function useSleepDetect() {
  const [state, setState] = useState<'idle' | 'active' | 'sleeping'>('idle');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const wake = () => {
    setState('active');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setState('sleeping');
    }, 5000); // 5 seconds of inactivity -> sleeping
  };

  const setSleeping = () => {
    setState('sleeping');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { state, wake, setSleeping };
}

'use client';
import GodSelection from '@/components/god-selection';
import { IGod } from '@/utils/types';
import { useEffect, useRef, useState } from 'react';
import Toast from './toast';

export default function PageLayout() {
  const [gods, setGods] = useState<IGod[]>([]);
  const [open, setOpen] = useState(false);
  const [toastInfo, setToastInfo] = useState<{
    variant: 'success' | 'error';
    description: string;
  }>({
    variant: 'success',
    description: '',
  });
  const timerRef = useRef(0);

  function onGodSelect(god: IGod) {
    if (gods.length >= 10) {
      setToastInfo({
        variant: 'error',
        description: 'updated',
      });
      setOpen(false);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setOpen(true);
      }, 100);
    } else {
      setGods((gods) => [...gods, god]);
    }
  }

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div>
      <Toast
        open={open}
        setOpen={setOpen}
        variant={toastInfo.variant}
        description={toastInfo.description}
      />
      {gods.length >= 1 ? null : (
        <GodSelection onSelect={(god) => onGodSelect(god)} />
      )}
    </div>
  );
}

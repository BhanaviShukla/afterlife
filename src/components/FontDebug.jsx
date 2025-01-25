'use client';
import { useEffect } from 'react';
import { serif } from '@/theme/fonts';

export function FontDebug() {
  useEffect(() => {
    console.log({
      serifVariableName: serif.variable,
      serifClassName: serif.className,
    });
  }, []);

  return null;
}
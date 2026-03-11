'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDark(isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="relative rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

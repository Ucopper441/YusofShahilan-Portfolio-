import React, { useState, useEffect } from 'react';

const BOOT_LINES = [
  'CLEMENTINE BIOS v3.2.1',
  'Copyright (C) 2024 Clementine Tech Industries',
  '',
  'Checking memory... 640K OK',
  'Detecting peripherals...',
  '  > Keyboard .............. [OK]',
  '  > Mouse ................ [OK]',
  '  > Display (CRT) ........ [OK]',
  '',
  'Loading CLEMOS v1.0...',
  '',
  'Initializing portfolio modules...',
  '  > home.exe ............. loaded',
  '  > about.exe ............ loaded',
  '  > achievements.exe ..... loaded',
  '  > certifications.exe ... loaded',
  '  > projects.exe ......... loaded',
  '  > stack.exe ............ loaded',
  '  > contact.exe .......... loaded',
  '',
  'System ready.',
  '',
];

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showLoadBar, setShowLoadBar] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (visibleLines < BOOT_LINES.length) {
      const delay = BOOT_LINES[visibleLines] === '' ? 100 : 60 + Math.random() * 50;
      const timer = setTimeout(() => {
        setVisibleLines(v => v + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else if (!showLoadBar) {
      setShowLoadBar(true);
      setTimeout(() => {
        setDone(true);
        setTimeout(() => onComplete(), 400);
      }, 1600);
    }
  }, [visibleLines, showLoadBar, onComplete]);

  return (
    <div className="boot-sequence" style={{
      opacity: done ? 0 : 1,
      transition: 'opacity 0.4s ease-out',
    }}>
      {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
        <div
          key={i}
          className="boot-line"
          style={{ animationDelay: `${i * 0.02}s` }}
        >
          {line || '\u00A0'}
        </div>
      ))}
      {visibleLines >= BOOT_LINES.length && !showLoadBar && (
        <span className="boot-cursor" />
      )}
      {showLoadBar && (
        <>
          <div className="boot-line" style={{ animationDelay: '0s' }}>
            Booting desktop environment...
          </div>
          <div className="loading-bar-container">
            <div className="loading-bar-fill" />
          </div>
        </>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';

export const DetectorPantalla = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const orientationQuery = window.matchMedia('(orientation: portrait)');

    const syncViewportState = () => {
      setIsSmallScreen(window.innerWidth < 480);
      setIsPortrait(orientationQuery.matches);
    };

    window.addEventListener('resize', syncViewportState);
    window.addEventListener('orientationchange', syncViewportState);
    orientationQuery.addEventListener('change', syncViewportState);
    syncViewportState();

    return () => {
      window.removeEventListener('resize', syncViewportState);
      window.removeEventListener('orientationchange', syncViewportState);
      orientationQuery.removeEventListener('change', syncViewportState);
    };
  }, []);

  const showKeyboardWarning = isSmallScreen;
  const showRotateWarning = !isSmallScreen && isPortrait;

  if (!showKeyboardWarning && !showRotateWarning) return null;

  const message = showKeyboardWarning
    ? 'Este juego solo se puede jugar con teclado.'
    : 'Rota la pantalla para poder jugar';

  const iconClass = showKeyboardWarning
    ? 'rotate-device-screen__icon rotate-device-screen__icon--keyboard'
    : 'rotate-device-screen__icon rotate-device-screen__icon--rotate';

  return (
    <div className="rotate-device-screen">
      <div className="rotate-device-screen__container">
        <div className={iconClass}></div>
        <p className="rotate-device-screen__text">{message}</p>
      </div>
    </div>
  );
};
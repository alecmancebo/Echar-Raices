import React, { useState, useEffect } from 'react';
import { Context } from '../../context/Context';

export const DetectorPantalla = () => {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Detectamos si el ancho es menor a 480px Y si está en modo vertical
      const isMobilePortrait = window.innerWidth < 480 && window.innerHeight > window.innerWidth;
      setIsPortrait(isMobilePortrait);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Comprobar al cargar

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="rotate-device-screen">
      <div className="rotate-container">
        {/* Usamos tu imagen de rotación */}
        <div className="rotate-icon"></div>
        <p>rota la pantalla para poder jugar</p>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * (24 - 12) + 12,
        delay: Math.random() * 2
      };
      setHearts(prev => [...prev.slice(-15), newHeart]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative overflow-hidden pt-12 pb-16 px-4 text-center">
      {hearts.map(heart => (
        <span
          key={heart.id}
          className="heart-particle text-rose-300"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            bottom: '0',
            animationDelay: `${heart.delay}s`
          }}
        >
          ❤️
        </span>
      ))}
      <h1 className="font-romantic text-6xl md:text-7xl text-rose-600 drop-shadow-sm mb-4">
        Escritor de Romances IA
      </h1>
      <p className="text-rose-500 font-medium max-w-lg mx-auto text-lg">
        Deixe a inteligência artificial transformar seus sentimentos em capítulos inesquecíveis.
      </p>
    </header>
  );
};

export default Header;

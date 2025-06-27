import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const BackgroundAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create floating particles
    const particles = [];
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full opacity-20';
      particle.style.width = Math.random() * 6 + 4 + 'px';
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 4)];
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      containerRef.current.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
    anime({
      targets: particles,
      translateX: () => anime.random(-100, 100),
      translateY: () => anime.random(-100, 100),
      scale: () => anime.random(0.5, 1.5),
      opacity: () => anime.random(0.1, 0.4),
      duration: () => anime.random(3000, 8000),
      easing: 'easeInOutSine',
      loop: true,
      direction: 'alternate'
    });

    // Cleanup
    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    />
  );
};

export default BackgroundAnimation;
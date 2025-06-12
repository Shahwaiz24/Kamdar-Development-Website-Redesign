import React, { useState, useEffect } from 'react'
import AppColor from '../utils/AppColor'

const PlayButton = ({ size = 'w-34 h-34', iconSize = 75 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate responsive sizes
  const getResponsiveSizes = () => {
    if (screenSize.width <= 640) { // Mobile
      return {
        buttonSize: 'w-20 h-20',
        iconSize: 40
      };
    } else if (screenSize.width <= 1024) { // Tablet
      return {
        buttonSize: 'w-28 h-28',
        iconSize: 55
      };
    } else { // Desktop
      return {
        buttonSize: 'w-34 h-34',
        iconSize: 75
      };
    }
  };

  const responsiveSizes = getResponsiveSizes();

  return (
    <div 
      className="relative group" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer ripple effect */}
      <div className={`absolute inset-0 rounded-full bg-white opacity-20 
                    transition-all duration-1000 ease-out scale-100
                    ${isHovered ? 'scale-[1.5] opacity-0' : 'scale-100 opacity-0'}`}>
      </div>
      
      {/* Second ripple */}
      <div className={`absolute inset-0 rounded-full bg-white opacity-30
                    transition-all duration-700 ease-out delay-100
                    ${isHovered ? 'scale-[1.3] opacity-0' : 'scale-100 opacity-0'}`}>
      </div>
      
      {/* Play button */}
      <button 
        className={`${responsiveSizes.buttonSize} bg-white opacity-80 backdrop-blur-sm rounded-full 
                flex items-center justify-center cursor-pointer shadow-lg
                transition-all duration-500 ease-out
                ${isHovered ? 'transform scale-110 opacity-95' : 'transform scale-100'}`}
        aria-label="Play video"
      >
        <svg 
          width={responsiveSizes.iconSize} 
          height={responsiveSizes.iconSize} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 ease-out"
        >
          <path 
            d="M8 5.14v14.72a1 1 0 001.5.86l10.48-7.36a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" 
            fill={AppColor.darkCharcoal} 
          />
        </svg>
      </button>
    </div>
  )
}

export default PlayButton 
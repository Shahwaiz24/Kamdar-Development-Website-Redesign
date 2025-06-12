import React, { useState, useEffect } from 'react'
import AppColor from '../utils/AppColor'

const ButtonComponent = ({ 
  label = 'Button',
  color = AppColor.primary,
  backgroundColor,
  width = 'auto',
  height = '40px',
  onClick,
  disabled = false,
  borderRadius = '4px',
  fontSize = '16px',
  className = '',
  style = {},
  type = 'button',
  hoverColor = AppColor.white,
  isHover = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0
  });
  
  const shouldApplyHover = isHover && isHovered;

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate responsive values
  const getResponsiveValues = () => {
    if (screenSize.width <= 640) { // Mobile
      return {
        padding: '0 12px',
        height: typeof height === 'string' && height.includes('px') 
          ? `${parseInt(height) * 0.85}px` 
          : height,
        fontSize: typeof fontSize === 'string' && fontSize.includes('px')
          ? `${Math.max(parseInt(fontSize) - 2, 12)}px`
          : fontSize
      };
    } else if (screenSize.width <= 1024) { // Tablet
      return {
        padding: '0 16px',
        height: typeof height === 'string' && height.includes('px') 
          ? `${parseInt(height) * 0.9}px` 
          : height,
        fontSize: typeof fontSize === 'string' && fontSize.includes('px')
          ? `${Math.max(parseInt(fontSize) - 1, 14)}px`
          : fontSize
      };
    } else { // Desktop
      return {
        padding: '0 20px',
        height: height,
        fontSize: fontSize
      };
    }
  };

  const responsiveValues = getResponsiveValues();

  return (
    <button
      type={type}
      className={`button-component ${className}`}
      style={{
        color,
        width,
        height: responsiveValues.height,
        borderRadius,
        fontSize: responsiveValues.fontSize,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.7 : 1,
        padding: responsiveValues.padding,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: shouldApplyHover ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        ...style
      }}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </button>
  )
}

export default ButtonComponent
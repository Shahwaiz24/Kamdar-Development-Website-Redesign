import React, { useState } from 'react'
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
  const shouldApplyHover = isHover && isHovered;

  return (
    <button
      type={type}
      className={`button-component ${className}`}
      style={{
        color,
        width,
        height,
        borderRadius,
        fontSize,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.7 : 1,
        padding: '0 20px',
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
import React, { useState, useEffect, useContext } from 'react'
import ButtonComponent from './ButtonComponent'
import AppColor from '../utils/AppColor'
import { AnimationContext } from '../utils/AnimationContext'

const NavbarComponent = () => {
  const [visible, setVisible] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [logoHovered, setLogoHovered] = useState(false);
  const { doorAnimationComplete } = useContext(AnimationContext);
  
  useEffect(() => {
    if (doorAnimationComplete) {
      setTimeout(() => {
        setAnimateIn(true);
      }, 300);
    }
    
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
      if (currentPosition > 400) {
        setVisible(false);
      }
    };
    
    const handleMouseMove = (e) => {
      if (e.clientY < 100 && scrollPosition > 400) {
        setVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [scrollPosition, doorAnimationComplete]);
  
  const navbarStyle = {
    transform: !doorAnimationComplete || !animateIn ? 'translateY(-100%)' : 
               !visible ? 'translateY(-100%)' : 'translateY(0)',
    transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  };

  const logoStyle = {
    transform: logoHovered ? 'scale(1.1)' : 'scale(1)',
    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'pointer'
  };

  return (
    <div className='bg-transparent px-[200px] py-[40px] z-50' style={navbarStyle}>
        <nav className='flex justify-between flex-row items-center'>
            <div 
              className='w-48 h-15'
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              style={logoStyle}
            >
                <img className='w-full h-full' src='./logo.png' alt="logo" />
            </div>
            <div className='flex flex-row items-center gap-10'>
                {["About Us", "Projects", "News"].map((e) => {
                    return (
                        <a 
                            href="" 
                            target='_blank' 
                            className='text-white font-[Lexend] font-[400] text-[20px] relative group'
                            key={e}
                        >
                            {e}
                            <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:w-full'></span>
                        </a>
                    );
                })}
            </div>
            <ButtonComponent 
                label="Contact Us"
                color={AppColor.black}
                width="140px"
                height="50px"
                fontSize="18px"
                borderRadius="8px"
                isHover={true}
                hoverColor={AppColor.white}
                style={{ 
                  fontWeight: "400", 
                  fontFamily: "Lexend",
                  background: AppColor.getGoldGradient(),
                  backgroundImage: AppColor.getGoldGradient()
                }}
            />
        </nav>
    </div>
  )
}

export default NavbarComponent
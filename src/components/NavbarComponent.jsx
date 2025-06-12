import React, { useState, useEffect, useContext } from 'react'
import ButtonComponent from './ButtonComponent'
import AppColor from '../utils/AppColor'
import { AnimationContext } from '../utils/AnimationContext'

const NavbarComponent = () => {
  const [visible, setVisible] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [logoHovered, setLogoHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      
      // Get the hero section height
      const heroSection = document.querySelector('.hero-section');
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
      
      // Hide navbar when scrolled past hero section
      if (currentPosition > heroHeight - 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };
    
    const handleMouseMove = (e) => {
      if (e.clientY < 100 && !visible) {
        setVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [scrollPosition, doorAnimationComplete, visible]);
  
  // Detect screen size
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth > 1024 : true
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Function to scroll to component
  const scrollToComponent = (componentId) => {
    const element = document.getElementById(componentId);
    if (element) {
      // Close mobile menu if open
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='bg-transparent fixed top-0 left-0 right-0 z-50' style={{
      ...navbarStyle,
      padding: isDesktop ? '40px 200px' : '20px 16px',
      maxWidth: '1920px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>
        <nav className='flex justify-between flex-row items-center'>
            <div 
              className={isDesktop ? 'w-48 h-15' : 'w-32 h-auto'}
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              style={logoStyle}
              onClick={() => scrollToComponent('hero-section')}
            >
                <img className='w-full h-full' src='./logo.png' alt="logo" />
            </div>
            
            {/* Desktop Navigation - Original Design */}
            {isDesktop ? (
              <>
                <div className='flex flex-row items-center gap-10'>
                    <a 
                        onClick={() => scrollToComponent('what-we-do')} 
                        className='text-white font-[Lexend] font-[400] text-[20px] relative group whitespace-nowrap cursor-pointer'
                    >
                        About Us
                        <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:w-full'></span>
                    </a>
                    <a 
                        onClick={() => scrollToComponent('our-projects')} 
                        className='text-white font-[Lexend] font-[400] text-[20px] relative group whitespace-nowrap cursor-pointer'
                    >
                        Projects
                        <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:w-full'></span>
                    </a>
                    <a 
                        onClick={() => scrollToComponent('why-choose-us')} 
                        className='text-white font-[Lexend] font-[400] text-[20px] relative group whitespace-nowrap cursor-pointer'
                    >
                        News
                        <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:w-full'></span>
                    </a>
                </div>
                <div onClick={() => scrollToComponent('register-now')}>
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
                        backgroundImage: AppColor.getGoldGradient(),
                        whiteSpace: 'nowrap',
                        cursor: 'pointer'
                      }}
                  />
                </div>
              </>
            ) : (
              /* Mobile Navigation */
              <div className="block lg:hidden">
                <button 
                  onClick={toggleMobileMenu}
                  className="text-white p-2"
                  aria-label="Toggle mobile menu"
                >
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {mobileMenuOpen ? (
                      <path 
                        d="M18 6L6 18M6 6l12 12" 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    ) : (
                      <path 
                        d="M4 6h16M4 12h16M4 18h16" 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>
                </button>
              </div>
            )}
        </nav>
        
        {/* Modernized Mobile Menu with Animation */}
        {!isDesktop && (
          <div 
            className={`absolute left-0 right-0 top-full backdrop-blur-lg transition-all duration-300 overflow-hidden ${
              mobileMenuOpen 
                ? 'max-h-[300px] opacity-100 border-t border-gray-800' 
                : 'max-h-0 opacity-0'
            }`}
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              boxShadow: mobileMenuOpen ? '0 10px 25px rgba(0, 0, 0, 0.2)' : 'none'
            }}
          >
            <div className="py-6 px-6 flex flex-col gap-5">
              <a 
                onClick={() => scrollToComponent('what-we-do')}
                className="text-white font-[Lexend] font-[400] text-xl py-2 relative overflow-hidden group cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-3 opacity-70">01</span>
                  <span>About Us</span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              
              <a 
                onClick={() => scrollToComponent('our-projects')}
                className="text-white font-[Lexend] font-[400] text-xl py-2 relative overflow-hidden group cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-3 opacity-70">02</span>
                  <span>Projects</span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              
              <a 
                onClick={() => scrollToComponent('why-choose-us')}
                className="text-white font-[Lexend] font-[400] text-xl py-2 relative overflow-hidden group cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-3 opacity-70">03</span>
                  <span>News</span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              
              <div className="mt-3" onClick={() => scrollToComponent('register-now')}>
                <ButtonComponent 
                  label="Contact Us"
                  color={AppColor.black}
                  width="100%"
                  height="50px"
                  fontSize="16px"
                  borderRadius="8px"
                  isHover={true}
                  hoverColor={AppColor.white}
                  style={{ 
                    fontWeight: "400", 
                    fontFamily: "Lexend",
                    background: AppColor.getGoldGradient(),
                    backgroundImage: AppColor.getGoldGradient(),
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default NavbarComponent
import React, { useState, useEffect, useRef } from 'react';
import "../index.css";
import { motion, useAnimation, useInView } from 'framer-motion';

const CeoMessageComponent = () => {
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showNameGlow, setShowNameGlow] = useState(false);
  const [startUnderlineAnimation, setStartUnderlineAnimation] = useState(false);
  const message = "We founded Kamdar with a simple belief; that real estate should stand the test of time, both in design and in trust. Every home we build is a reflection of that legacy."
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const nameControls = useAnimation();
  const glowControls = useAnimation();
  const underlineControls = useAnimation();
  
  // Start animations when the component comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      
      // Start typewriter effect after heading animation
      setTimeout(startTypewriter, 1500);
      
      // Sequence the name and glow animations
      setTimeout(() => {
        nameControls.start("visible");
        
        // Start glow effect after name appears
        setTimeout(() => {
          setShowNameGlow(true);
          glowControls.start("visible");
          
          // Start repeating underline animation after all animations are complete
          setTimeout(() => {
            setStartUnderlineAnimation(true);
          }, 2000);
        }, 1000);
      }, 3500);
    }
  }, [isInView, controls, nameControls, glowControls]);
  
  // Handle repeating underline animation
  useEffect(() => {
    const animateUnderline = async () => {
      if (startUnderlineAnimation) {
        while (true) {
          // Draw the line
          await underlineControls.start({
            width: "100%",
            transition: { duration: 0.8, ease: "easeInOut" }
          });
          
          // Pause at full width
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Erase the line
          await underlineControls.start({
            width: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          });
          
          // Pause before repeating
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
    };
    
    animateUnderline();
  }, [startUnderlineAnimation, underlineControls]);
  
  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setIsCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  // Typewriter effect
  const startTypewriter = () => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(message.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 50); // Speed of typing
    
    return () => clearInterval(typingInterval);
  };
  
  // Heading animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.2,
        ease: [0.1, 0.4, 0.2, 1]
      }
    }
  };
  
  // Name animation variants
  const nameVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1,
        ease: "easeOut"
      }
    }
  };
  
  // Glow effect for name
  const glowVariants = {
    hidden: { 
      textShadow: "0px 0px 0px rgba(255,255,255,0)" 
    },
    visible: { 
      textShadow: [
        "0px 0px 0px rgba(255,255,255,0)",
        "0px 0px 10px rgba(255,255,255,0.5)",
        "0px 0px 20px rgba(184,161,90,0.7)",
        "0px 0px 10px rgba(255,255,255,0.5)",
        "0px 0px 0px rgba(255,255,255,0)"
      ],
      transition: { 
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  };
  
  // Box hover animation
  const boxHoverVariants = {
    initial: {},
    hover: { 
      scale: 1.02,
      boxShadow: "0 15px 50px rgba(0, 0, 0, 0.95)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="w-full py-20 ceo-message-bg">
      {/* Content box with partial border at top */}
      <motion.div 
        ref={containerRef}
        className="ceo-message-box relative z-10"
        variants={boxHoverVariants}
        initial="initial"
        whileHover="hover"
      >
        {/* Right border element */}
        <span className="right-border-line"></span>
        <div className="text-center text-white mx-auto leading-none">
          <motion.h2 
            className="text-[80px] font-[400] font-['Luxurious_Roman'] text-white"
            variants={headingVariants}
            initial="hidden"
            animate={controls}
          >
            CEO MESSAGE
          </motion.h2>
          
          <div className="text-white text-[20px] font-['Lexend'] leading-tight tracking-wide font-[400] mt-[10px] px-20 max-w-[900px] mx-auto min-h-[80px]">
            {displayedText}
            {!isTypingComplete && (
              <span 
                className="inline-block w-[2px] h-[1.2em] bg-white ml-1 align-middle"
                style={{ opacity: isCursorVisible ? 1 : 0 }}
              ></span>
            )}
          </div>
          
          <div className="relative mt-[45px] mb-[5px]">
            <motion.h3 
              className="text-[55px] font-[400] font-['Luxurious_Roman'] tracking-tighter text-white relative z-10 inline-block"
              initial="hidden"
              animate={nameControls}
              variants={nameVariants}
            >
              YUSUF KAMDAR
            </motion.h3>
            
            {/* Separate glow effect that's triggered after the name appears */}
            {showNameGlow && (
              <motion.div
                className="absolute inset-0 z-0"
                initial="hidden"
                animate={glowControls}
                variants={glowVariants}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <span className="text-[55px] font-[400] font-['Luxurious_Roman'] tracking-tighter text-transparent">
                  YUSUF KAMDAR
                </span>
              </motion.div>
            )}
          </div>
          
          <div className="relative inline-block">
            <motion.p 
              className="text-[20px] font-[400] font-['Lexend'] tracking-wider text-white"
              variants={nameVariants}
              initial="hidden"
              animate={nameControls}
            >
              Chairman of Kamdar Developments
            </motion.p>
            <motion.div
              className="absolute -bottom-2 left-0 h-[1px] bg-[#B8A15A]"
              initial={{ width: 0 }}
              animate={underlineControls}
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CeoMessageComponent;
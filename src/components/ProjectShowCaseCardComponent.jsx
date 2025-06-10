import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation, animate } from 'framer-motion';

const ProjectShowCaseCardComponent = ({ image, title, subtitle, flipStartTime = 2000 }) => {
  const cardRef = useRef(null);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  // Significantly enhanced parallax effect for the image - increased range for more dramatic movement
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  // Add horizontal movement for extra dynamism
  const imageX = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  // Subtle scale effect as user scrolls
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.1, 1.05]);

  // Start the flip animation after initial animation completes using the provided flipStartTime
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationCompleted(true);
    }, flipStartTime);
    
    return () => clearTimeout(timer);
  }, [flipStartTime]);
  
  // Handle automatic flipping animation
  useEffect(() => {
    let interval;
    
    if (animationCompleted && !isHovered) {
      // Start the complete card flip animation immediately
      setIsFlipping(true);
      controls.start({
        rotateX: 360,  // Full flip
        transition: { 
          duration: 1.5, 
          ease: [0.645, 0.045, 0.355, 1.000],  // Cubic bezier for a more dramatic flip
        }
      }).then(() => {
        setIsFlipping(false);
      });
      
      // Run on a continuous cycle with a slightly random interval
      interval = setInterval(() => {
        if (!isHovered) {
          setIsFlipping(true);
          controls.start({
            rotateX: [0, 360],  // Complete 360 degree flip
            transition: { 
              duration: 1.5, 
              ease: [0.645, 0.045, 0.355, 1.000]
            }
          }).then(() => {
            setIsFlipping(false);
          });
        }
      }, 3000);
    } else if (isHovered) {
      setIsFlipping(false);
      controls.start({
        rotateX: 0,
        transition: { duration: 0.3, ease: "easeOut" }
      });
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [animationCompleted, isHovered, controls]);
  
  // Additional shadow animation for 3D effect
  const shadowOpacity = isFlipping ? 0.3 : 0.1;
  const shadowBlur = isFlipping ? "25px" : "10px";

  return (
    <div className="relative" style={{ perspective: '2000px', height: '400px', width: '100%' }}>
      <motion.div 
        ref={cardRef}
        className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer w-full h-full"
        animate={controls}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.3 }}
        style={{ 
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          boxShadow: `0 ${isFlipping ? '30px' : '15px'} ${shadowBlur} rgba(0, 0, 0, ${shadowOpacity})`,
          transition: 'box-shadow 0.3s ease'
        }}
      >
        {/* Front face */}
        <motion.div 
          className="absolute inset-0 backface-hidden rounded-lg overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Image with enhanced parallax effect */}
          <motion.div 
            className="w-full h-[120%]" 
            style={{ 
              y: imageY,
              x: imageX,
              scale: imageScale,
              transformOrigin: "center center"
            }}
          >
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Dark overlay gradient at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 to-transparent"></div>
          
          {/* Text content */}
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-[30px] font-[400] font-['Lexend'] mb-2">{title}</h3>
            <p className="text-[20px] font-[400] font-['Lexend'] text-gray-200">{subtitle}</p>
          </div>
        </motion.div>
        
        {/* Back face (same content but with different styling) */}
        <motion.div 
          className="absolute inset-0 backface-hidden rounded-lg overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)'
          }}
        >
          {/* Image with enhanced parallax effect */}
          <motion.div 
            className="w-full h-[120%]" 
            style={{ 
              y: imageY,
              x: imageX,
              scale: imageScale,
              transformOrigin: "center center"
            }}
          >
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Dark overlay gradient at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 to-transparent"></div>
          
          {/* Text content */}
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-[30px] font-[400] font-['Lexend'] mb-2">{title}</h3>
            <p className="text-[20px] font-[400] font-['Lexend'] text-gray-200">{subtitle}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectShowCaseCardComponent; 
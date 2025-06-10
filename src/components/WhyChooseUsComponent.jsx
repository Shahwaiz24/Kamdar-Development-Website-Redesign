import React, { useState, useRef, useEffect } from 'react';
import AppColor from '../utils/AppColor';
import { motion, useAnimation, useInView } from 'framer-motion';

const WhyChooseUsComponent = () => {
  const [hoveredFeatureId, setHoveredFeatureId] = useState(null);
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  // Start the animations when the component comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const features = [
    {
      id: 1,
      title: 'Innovative designs',
      icon: "./innovative_designs_icon.png",
    },
    {
      id: 2,
      title: 'Superior quality',
      icon: "./quality_icon.png",
    },
    {
      id: 3,
      title: 'Community focus',
      icon: "./community_focus.png",
    },
    {
      id: 4,
      title: 'Unmatched expertise',
      icon:"./expertise_icon.png",
    },
    {
      id: 5,
      title: 'Sustainable practices',
      icon: "./practices_icon.png",
    },
    {
      id: 6,
      title: 'Customer-centric approach',
      icon: "./approach_icon.png",
    },
  ];
  
  // Variants for sequential reveal animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  // Get row based on feature id (1-3 is top row, 4-6 is bottom row)
  const getRowDelay = (id) => {
    return id <= 3 ? 0 : 0.2;
  };
  
  // Feature item animation variants
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (id) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: getRowDelay(id),
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    })
  };
  
  // Floating animation variants for icons
  const floatingIconVariants = (id) => ({
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        delay: id * 0.2 % 1, // Staggered delays for each icon
      }
    }
  });

  return (
    <div className="w-full py-20 px-[200px] relative" style={{ marginTop: '-50px' }}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="./why_choose_us_bg.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        
        {/* Main dark overlay */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.75)'
          }}
        ></div>
        
        {/* Top gradient fade */}
        <div 
          className="absolute top-0 left-0 right-0 h-40" 
          style={{ 
            background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
          }}
        ></div>
        
        {/* Bottom gradient fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-40" 
          style={{ 
            background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
          }}
        ></div>
      </div>
      
      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-24">
          <motion.h2 
            className="text-[130px] font-[400] font-['Luxurious_Roman'] text-white tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            WHY CHOOSE US
          </motion.h2>
        </div>
        
        {/* Features Grid */}
        <motion.div 
          ref={gridRef}
          className="grid grid-cols-3 gap-y-24"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.id} 
              className="flex flex-col items-center"
              variants={featureVariants}
              custom={feature.id}
              onHoverStart={() => setHoveredFeatureId(feature.id)}
              onHoverEnd={() => setHoveredFeatureId(null)}
              style={{ 
                opacity: hoveredFeatureId === null || hoveredFeatureId === feature.id ? 1 : 0.3,
                transition: 'opacity 0.4s ease-out',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="mb-5"
                variants={floatingIconVariants(feature.id)}
                animate="animate"
              >
                <motion.img 
                  src={feature.icon} 
                  alt={feature.title} 
                  className="w-25 h-25 object-contain"
                  style={{ filter: 'brightness(0) invert(0.7) sepia(1) saturate(1.5) hue-rotate(5deg)' }}
                  animate={hoveredFeatureId === feature.id ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.div>
              <motion.h3 
                className="text-[25px] font-[400] font-['Lexend'] text-white text-center"
                whileHover={{ scale: 1.05 }}
              >
                {feature.title}
              </motion.h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUsComponent;
import React, { useState, useRef, useEffect } from 'react';
import "../index.css";
import AppColor from '../utils/AppColor';
import ButtonComponent from './ButtonComponent';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const RegisterNowComponent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    enquiryType: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  const formControls = useAnimation();
  
  // Start animations when component comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      // Start form animations after the side images have animated in
      setTimeout(() => {
        formControls.start('visible');
      }, 700);
    }
  }, [isInView, controls, formControls]);

  // Auto-clear error messages after 2 seconds
  useEffect(() => {
    if (Object.keys(formErrors).length > 0) {
      const timer = setTimeout(() => {
        setFormErrors({});
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [formErrors]);
  
  // Reset form after 5 seconds of thank you message
  useEffect(() => {
    let timer;
    
    if (formSubmitted) {
      timer = setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          emailAddress: '',
          enquiryType: '',
          message: ''
        });
        
        // Restart animations after form reset
        setTimeout(() => {
          formControls.start('visible');
        }, 100);
      }, 5000);
    }
    
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [formSubmitted, formControls]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;
    
    // Check required fields
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
      isValid = false;
    }
    
    if (!formData.emailAddress.trim()) {
      errors.emailAddress = 'Email address is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      errors.emailAddress = 'Email address is invalid';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Set form as submitted to show thank you message
      setFormSubmitted(true);
    }
  };
  
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  // Letter bounce animation for heading
  const letterVariants = {
    hidden: { 
      y: -100, 
      opacity: 0,
      scale: 0.5
    },
    visible: i => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: i * 0.05,
        duration: 0.5
      }
    })
  };
  
  // Side images animation variants with breathing effect
  const leftImageVariants = {
    hidden: { x: -200, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.8
      }
    }
  };
  
  const rightImageVariants = {
    hidden: { x: 200, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.8,
        delay: 0.2 
      }
    }
  };
  
  // Breathing animation variants - FIXED: Reduced scale to prevent layout shift
  const breathingVariants = {
    initial: { scale: 1 },
    breathing: {
      scale: [1, 1.015, 1], // Increased from 1.005 to 1.015 for more visible effect
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  // Form fields animation variants
  const formFieldVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: i => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.7 + (i * 0.1),
        duration: 0.4
      }
    })
  };
  
  // Thank you message animation variants
  const thankYouVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  // Split text for heading animation
  const headingText = "REGISTER NOW";

  // Display either form or thank you message based on submission state
  const renderContent = () => {
    if (formSubmitted) {
      return (
        <motion.div 
          className="text-center text-white self-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          <motion.h2 
            className="text-[50px] font-['Luxurious_Roman'] mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.1, 1],
              opacity: 1,
              transition: { duration: 0.5 } 
            }}
          >
            Thank You!
          </motion.h2>
          <motion.p 
            className="text-[24px] font-['Lexend']"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          >
            Your registration has been submitted successfully.
          </motion.p>
          <motion.p 
            className="text-[18px] font-['Lexend'] mt-4 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4 } }}
          >
            We'll be in touch with you shortly.
          </motion.p>
        </motion.div>
      );
    }
    
    return (
      <div className="w-full max-w-max">
        {/* Header */}
        <div className="text-center text-white mb-10">
          <div className="overflow-hidden">
            <h1 className="text-[120px] font-[400] tracking-tighter font-['Luxurious_Roman'] mb-1 flex justify-center">
              {headingText.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate={formControls}
                  className="inline-block"
                  style={{
                    display: 'inline-block',
                    backgroundImage: 'linear-gradient(90deg, #B8A15A 0%, #DBCA85 50%, #B8A15A 100%)',
                    backgroundSize: '200% auto',
                    color: 'transparent',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    animation: 'gradient 3s linear infinite'
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
          </div>
          <motion.p 
            className="font-['Lexend'] text-[25px] font-[400] leading-px tracking-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={formControls}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Send an enquiry by filling in the form below
          </motion.p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* First row - Name fields */}
          <div className="grid grid-cols-2 gap-5">
            <motion.div
              variants={formFieldVariants}
              custom={0}
              initial="hidden"
              animate={formControls}
            >
              <div className="relative">
                <motion.input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('firstName')}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 font-['Lexend'] text-[18px] font-[400] bg-transparent border-gray-400 border rounded-lg text-white placeholder-white focus:outline-none"
                  whileFocus={{ 
                    boxShadow: "0 0 0 2px rgba(184,161,90,0.5)"
                  }}
                  style={{
                    borderColor: focusedField === 'firstName' ? '#B8A15A' : formErrors.firstName ? 'red' : 'rgb(156 163 175)',
                    transition: 'border-color 0.3s ease'
                  }}
                />
                {formErrors.firstName && (
                  <motion.p 
                    className="text-red-500 text-sm mt-1 font-['Lexend']"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {formErrors.firstName}
                  </motion.p>
                )}
              </div>
            </motion.div>
            
            <motion.div
              variants={formFieldVariants}
              custom={1}
              initial="hidden"
              animate={formControls}
            >
              <div className="relative">
                <motion.input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('lastName')}
                  onBlur={handleBlur}
                  className="w-full px-5 py-4 font-['Lexend'] text-[18px] font-[400] bg-transparent border border-gray-400 rounded-lg text-white placeholder-white focus:outline-none"
                  whileFocus={{ 
                    boxShadow: "0 0 0 2px rgba(184,161,90,0.5)" 
                  }}
                  style={{
                    borderColor: focusedField === 'lastName' ? '#B8A15A' : formErrors.lastName ? 'red' : 'rgb(156 163 175)',
                    transition: 'border-color 0.3s ease'
                  }}
                />
                {formErrors.lastName && (
                  <motion.p 
                    className="text-red-500 text-sm mt-1 font-['Lexend']"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {formErrors.lastName}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </div>
          {/* Second row - Contact fields */}
          <div className="grid grid-cols-2 gap-5">
            <motion.div
              variants={formFieldVariants}
              custom={2}
              initial="hidden"
              animate={formControls}
            >
              <div className="relative">
                <motion.input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('phoneNumber')}
                  onBlur={handleBlur}
                  className="w-full px-5 py-4 font-['Lexend'] text-[18px] font-[400] bg-transparent border border-gray-400 rounded-lg text-white placeholder-white focus:outline-none"
                  whileFocus={{ 
                    boxShadow: "0 0 0 2px rgba(184,161,90,0.5)" 
                  }}
                  style={{
                    borderColor: focusedField === 'phoneNumber' ? '#B8A15A' : formErrors.phoneNumber ? 'red' : 'rgb(156 163 175)',
                    transition: 'border-color 0.3s ease'
                  }}
                />
                {formErrors.phoneNumber && (
                  <motion.p 
                    className="text-red-500 text-sm mt-1 font-['Lexend']"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {formErrors.phoneNumber}
                  </motion.p>
                )}
              </div>
            </motion.div>
            
            <motion.div
              variants={formFieldVariants}
              custom={3}
              initial="hidden"
              animate={formControls}
            >
              <div className="relative">
                <motion.input
                  type="email"
                  name="emailAddress"
                  placeholder="Email address"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('emailAddress')}
                  onBlur={handleBlur}
                  className="w-full px-5 py-4 font-['Lexend'] text-[18px] font-[400] bg-transparent border border-gray-400 rounded-lg text-white placeholder-white focus:outline-none"
                  whileFocus={{ 
                    boxShadow: "0 0 0 2px rgba(184,161,90,0.5)" 
                  }}
                  style={{
                    borderColor: focusedField === 'emailAddress' ? '#B8A15A' : formErrors.emailAddress ? 'red' : 'rgb(156 163 175)',
                    transition: 'border-color 0.3s ease'
                  }}
                />
                {formErrors.emailAddress && (
                  <motion.p 
                    className="text-red-500 text-sm mt-1 font-['Lexend']"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {formErrors.emailAddress}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Enquiry Type dropdown */}
          <motion.div
            variants={formFieldVariants}
            custom={4}
            initial="hidden"
            animate={formControls}
          >
            <select
              name="enquiryType"
              value={formData.enquiryType}
              onChange={handleInputChange}
              onFocus={() => handleFocus('enquiryType')}
              onBlur={handleBlur}
              className="w-full px-5 py-4 font-['Lexend'] text-[18px] font-[400] bg-transparent border border-gray-400 border-white rounded-lg text-white text-sm focus:outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 25px center',
                backgroundColor: 'transparent',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '25px',
                borderColor: focusedField === 'enquiryType' ? '#B8A15A' : 'rgb(156 163 175)',
                transition: 'border-color 0.3s ease'
              }}
            >
              <option value="" className="bg-black text-gray-400">Enquiry Type</option>
              <option value="sales" className="bg-black text-white">Sales Enquiry</option>
              <option value="rental" className="bg-black text-white">Rental Enquiry</option>
              <option value="general" className="bg-black text-white">General Enquiry</option>
              <option value="investment" className="bg-black text-white">Investment Enquiry</option>
            </select>
          </motion.div>

          {/* Message textarea */}
          <motion.div
            variants={formFieldVariants}
            custom={5}
            initial="hidden"
            animate={formControls}
          >
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              onFocus={() => handleFocus('message')}
              onBlur={handleBlur}
              className="w-full px-5 py-4 font-['Lexend'] text-[18px] font-[400] bg-transparent border border-gray-400 rounded-lg text-white placeholder-white focus:outline-none resize-none"
              style={{
                borderColor: focusedField === 'message' ? '#B8A15A' : 'rgb(156 163 175)',
                transition: 'border-color 0.3s ease'
              }}
            />
          </motion.div>

          {/* Submit button */}
          <motion.div 
            className="pt-2"
            variants={formFieldVariants}
            custom={6}
            initial="hidden"
            animate={formControls}
          >
            <div onClick={handleSubmit}>
              <ButtonComponent 
                label="Submit"
                color={AppColor.black}
                width="130px"
                height="50px"
                fontSize="20px"
                borderRadius="8px"
                isHover={true}
                hoverColor={AppColor.white}
                style={{ 
                  fontWeight: "500", 
                  fontFamily: "Lexend",
                  background: AppColor.getGoldGradient(),
                  backgroundImage: AppColor.getGoldGradient()
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      {/* Left side images - overlapping/staggered - FIXED POSITIONING */}
      <motion.div 
        className="absolute left-0 top-12 z-10"
        variants={leftImageVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Gradient overlay for left side */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-30 bg-gradient-to-r from-black to-transparent"></div>
        
        {/* Top left image - smaller architectural view */}
        <motion.div 
          className="w-60 h-150 rounded-tr-2xl rounded-br-2xl overflow-hidden shadow-2xl transform rotate-0 relative z-10 image-fade-left"
          whileHover={{ scale: 1.03, transition: { duration: 0.3 } }} // Increased hover scale for better effect
          animate="breathing"
          variants={breathingVariants}
        >
          <img 
            src="https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Modern apartment terrace"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Bottom left image - large building view, overlapping */}
        <motion.div 
          className="w-70 h-85 rounded-2xl overflow-hidden shadow-2xl transform rotate-0 -mt-60 ml-25 relative z-20 image-fade-left"
          whileHover={{ scale: 1.03, transition: { duration: 0.3 } }} // Increased hover scale for better effect
          animate="breathing"
          variants={{
            ...breathingVariants,
            breathing: {
              ...breathingVariants.breathing,
              transition: {
                ...breathingVariants.breathing.transition,
                delay: 1 // Offset breathing cycle
              }
            }
          }}
        >
          <img 
            src="./register_now_img_1.jpg" 
            alt="High-rise residential building"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Right side images - overlapping/staggered - FIXED POSITIONING */}
      <motion.div 
        className="absolute right-0 top-16 z-10"
        variants={rightImageVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Gradient overlay for right side */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-30 bg-gradient-to-l from-black to-transparent"></div>
        
        {/* Top right image - building exterior, positioned higher */}
        <motion.div 
          className="w-60 h-150 rounded-tl-2xl rounded-bl-2xl overflow-hidden shadow-2xl transform rotate-0 relative z-10 image-fade-right"
          whileHover={{ scale: 1.03, transition: { duration: 0.3 } }} // Increased hover scale for better effect
          animate="breathing"
          variants={breathingVariants}
        >
          <img 
            src="./hero_img.jpg" 
            alt="Modern residential complex"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Bottom right image - interior bedroom, overlapping and larger */}
        <motion.div 
          className="w-100 h-55 rounded-2xl overflow-hidden shadow-2xl transform -rotate-0 -mt-40 -ml-50 relative z-20 image-fade-right"
          whileHover={{ scale: 1.03, transition: { duration: 0.3 } }} // Increased hover scale for better effect
          animate="breathing"
          variants={{
            ...breathingVariants,
            breathing: {
              ...breathingVariants.breathing,
              transition: {
                ...breathingVariants.breathing.transition,
                delay: 2 // Different offset for varied breathing effect
              }
            }
          }}
        >
          <img 
            src="./register_now_img_2.jpg" 
            alt="Luxury bedroom interior"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Center form section */}
      <div className="flex justify-center min-h-screen px-4 relative z-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default RegisterNowComponent;
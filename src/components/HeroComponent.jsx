import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlayButton from './PlayButton'
import { AnimationContext } from '../utils/AnimationContext'

const HeroComponent = ({ setDoorAnimationComplete }) => {
  const [animationComplete, setAnimationComplete] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [startDoorAnimation, setStartDoorAnimation] = useState(false)
  const [doorAnimationComplete, setDoorAnimationCompleteLocal] = useState(false)

  useEffect(() => {
    const imageTimer = setTimeout(() => {
      setShowImage(true)
    }, 400) 
    const doorTimer = setTimeout(() => {
      setStartDoorAnimation(true)
    }, 2200)
    const completeTimer = setTimeout(() => {
      setDoorAnimationCompleteLocal(true)
      setDoorAnimationComplete(true)
      setAnimationComplete(true)
    }, 3500) 
  
    return () => {
      clearTimeout(imageTimer)
      clearTimeout(doorTimer)
      clearTimeout(completeTimer)
    }
  }, [setDoorAnimationComplete])

  useEffect(() => {
    // Define preventTouch function outside the if statement so it's accessible in the cleanup function
    const preventTouch = (e) => {
      if (!animationComplete) {
        e.preventDefault()
      }
    }
    
    if (!animationComplete) {
      // Stronger prevention of scrolling and interactions during animation
      document.body.style.overflow = 'hidden'
      document.body.style.pointerEvents = 'none'
      
      // Prevent any kind of touch interactions too
      document.addEventListener('touchmove', preventTouch, { passive: false })
      document.addEventListener('touchstart', preventTouch, { passive: false })
    } else {
      document.body.style.overflow = 'auto'
      document.body.style.pointerEvents = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
      document.body.style.pointerEvents = 'auto'
      document.removeEventListener('touchmove', preventTouch, { passive: false })
      document.removeEventListener('touchstart', preventTouch, { passive: false })
    }
  }, [animationComplete])

  return (
    <div className="relative w-full h-screen">
      {!doorAnimationComplete ? (
        <AnimatePresence>
          {/* Left door half */}
          <motion.div
            key="left-door"
            initial={{ x: 0 }}
            animate={startDoorAnimation ? { x: '-100%' } : { x: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 0
            }}
            className="absolute top-0 left-0 w-1/2 h-full z-50 overflow-hidden"
            style={{ 
              originX: 0,
              backfaceVisibility: 'hidden', // Fix for visual tearing
              WebkitBackfaceVisibility: 'hidden', // For Safari
              transform: 'translateZ(0)', // Force GPU acceleration
              WebkitTransform: 'translateZ(0)' // For Safari
            }}
          >
            <motion.div 
              className="w-[200%] h-full"
              initial={{ opacity: 1 }}
              animate={{ opacity: showImage ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              style={{
                backfaceVisibility: 'hidden', // Fix for visual tearing
                WebkitBackfaceVisibility: 'hidden', // For Safari
                transform: 'translateZ(0)', // Force GPU acceleration
                WebkitTransform: 'translateZ(0)' // For Safari
              }}
            >
              <div className="relative w-full h-full">
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: showImage ? 0 : 1 }}
                  transition={{ duration: 0.8 }}
                />
                <img
                  src="./door_img.png"
                  alt="KAMDAX Building Left" 
                  className="w-[200%] h-full object-cover"
                  style={{ 
                    objectPosition: "left",
                    backfaceVisibility: 'hidden', // Fix for visual tearing
                    WebkitBackfaceVisibility: 'hidden', // For Safari
                    transform: 'translateZ(0)', // Force GPU acceleration
                    WebkitTransform: 'translateZ(0)' // For Safari
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right door half */}
          <motion.div
            key="right-door"
            initial={{ x: 0 }}
            animate={startDoorAnimation ? { x: '100%' } : { x: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 0 
            }}
            className="absolute top-0 left-1/2 w-1/2 h-full z-50 overflow-hidden"
            style={{
              originX: 0,
              backfaceVisibility: 'hidden', // Fix for visual tearing
              WebkitBackfaceVisibility: 'hidden', // For Safari
              transform: 'translateZ(0)', // Force GPU acceleration
              WebkitTransform: 'translateZ(0)' // For Safari
            }}
          >
            <motion.div 
              className="w-[200%] h-full ml-[-100%]"
              initial={{ opacity: 1 }}
              animate={{ opacity: showImage ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              style={{
                backfaceVisibility: 'hidden', // Fix for visual tearing
                WebkitBackfaceVisibility: 'hidden', // For Safari
                transform: 'translateZ(0)', // Force GPU acceleration
                WebkitTransform: 'translateZ(0)' // For Safari
              }}
            >
              <div className="relative w-full h-full">
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: showImage ? 0 : 1 }}
                  transition={{ duration: 0.8 }}
                />
                <img
                  src="./door_img.png"
                  alt="KAMDAX Building Right" 
                  className="w-[200%] h-full object-cover"
                  style={{ 
                    objectPosition: "right",
                    backfaceVisibility: 'hidden', // Fix for visual tearing
                    WebkitBackfaceVisibility: 'hidden', // For Safari
                    transform: 'translateZ(0)', // Force GPU acceleration
                    WebkitTransform: 'translateZ(0)' // For Safari
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      ) : null}

      <AnimatePresence>
        {doorAnimationComplete && (
          <motion.div
            key="actual-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-[95vh]"
          >
            <img
              src="./hero_img.jpg"
              alt="KAMDAX Building" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeroComponent
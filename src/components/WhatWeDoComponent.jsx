import React, { useEffect, useState, useRef } from 'react'
import '../style.css'
import AppColor from '../utils/AppColor'
import { motion, useAnimation, useInView } from 'framer-motion'

const WhatWeDoComponent = () => {
  const [count40, setCount40] = useState(0)
  const [count500, setCount500] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [showParticles, setShowParticles] = useState(false)
  
  const ref = useRef(null)
  const hrRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()
  
  const headingLine1Part1 = "We develop "
  const headingHighlight = "quality"
  const headingLine1Part2 = ""
  const headingLine2 = "infrastructure and real"
  const headingLine3 = "estate projects"
  
  const headingText = `${headingLine1Part1}${headingHighlight}${headingLine1Part2}\n${headingLine2}\n${headingLine3}`
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
      
      let count = 0
      const interval40 = setInterval(() => {
        count += 1
        setCount40(count)
        if (count >= 40) clearInterval(interval40)
      }, 50)
      
      let count2 = 0
      const interval500 = setInterval(() => {
        count2 += 10
        setCount500(count2)
        if (count2 >= 500) clearInterval(interval500)
      }, 40)
      
      let i = 0
      const typeInterval = setInterval(() => {
        setDisplayedText(headingText.substring(0, i))
        i++
        if (i > headingText.length) {
          clearInterval(typeInterval)
          setTimeout(() => {
            setShowParticles(true)
          }, 500)
        }
      }, 20)
      
      return () => {
        clearInterval(interval40)
        clearInterval(interval500)
        clearInterval(typeInterval)
      }
    }
  }, [isInView, controls, headingText])
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  
  const waveVariants = {
    hidden: { x: -5, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        repeat: Infinity, 
        repeatType: "mirror", 
        duration: 2,
        ease: "easeInOut"
      }
    }
  }
  
  const topParticles = Array.from({ length: 20 }, (_, i) => ({
    id: `top-${i}`,
    isTop: true
  }))
  
  const bottomParticles = Array.from({ length: 20 }, (_, i) => ({
    id: `bottom-${i}`,
    isTop: false
  }))
  
  const getParticleVariants = (isTop) => {
    return {
      hidden: { 
        x: isTop ? -50 : window.innerWidth + 50, 
        y: isTop ? -20 : 580,
        opacity: 0,
        rotate: 0
      },
      visible: { 
        x: isTop ? window.innerWidth + 50 : -50, 
        y: isTop ? -20 : 580,
        opacity: [0, 1, 1, 0],
        rotate: isTop ? 360 : -360,
        transition: { 
          duration: 6 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 3,
          ease: "linear"
        }
      }
    }
  }

  const gradientStyle = {
    background: `linear-gradient(
      to right,
      #976e2c 0%,
      #f9d77f 25%,
      #e6b850 50%,
      #976e2c 75%,
      #f9d77f 100%
    )`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    animation: 'gradientShift 3s linear infinite',
  };

  return (
    <div className='w-full py-5 px-[200px] relative overflow-hidden' ref={ref}>
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
        `}
      </style>
      
      {showParticles && topParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          variants={getParticleVariants(true)}
          initial="hidden"
          animate="visible"
          style={{
            width: `${5 + Math.random() * 5}px`,
            height: `${5 + Math.random() * 5}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle at center, #f9d77f, #976e2c)',
            filter: 'blur(1px)',
            zIndex: 10
          }}
        />
      ))}
      
      {showParticles && bottomParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          variants={getParticleVariants(false)}
          initial="hidden"
          animate="visible"
          style={{
            width: `${6 + Math.random() * 6}px`,
            height: `${6 + Math.random() * 6}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle at center, #f9d77f, #976e2c)',
            filter: 'blur(1px)',
            zIndex: 10
          }}
        />
      ))}
      
      <h1 className="text-[130px] font-[400] font-['Luxurious_Roman'] text-white leading-[110px] tracking-[-0.05em]">
        {displayedText.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {i === 0 ? (
              <>
                {headingLine1Part1.substring(0, displayedText.indexOf(headingLine1Part1) + headingLine1Part1.length)}
                {displayedText.includes(headingHighlight) && (
                  <span style={gradientStyle}>
                    {headingHighlight.substring(0, displayedText.indexOf(headingLine1Part1) + displayedText.length - headingLine1Part1.length)}
                  </span>
                )}
                {headingLine1Part2.substring(0, Math.max(0, displayedText.length - (headingLine1Part1.length + headingHighlight.length)))}
              </>
            ) : (
              line
            )}
            {i < 2 && <br/>}
          </React.Fragment>
        ))}
      </h1>
      <motion.div 
        className='pt-[10px] flex flex-row gap-15'
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className='flex flex-col relative'>
          <h1 
            className="text-[100px] font-['Lexend'] font-[400] text-transparent m-0 p-0 leading-none z-10"
            style={{
              background: AppColor.getGoldGradient(),
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text'
            }}
          >
            {count40}+
          </h1>
          <motion.p 
            className="text-white text-[20px] font-['Lexend'] font-[400] mt-[-0px] p-0"
            variants={waveVariants}
          >
            Years of experience
          </motion.p>
        </div>
        <div className='flex flex-col relative'>
          <h1 
            className="text-[100px] font-['Lexend'] font-[400] text-transparent m-0 p-0 leading-none z-10"
            style={{
              background: AppColor.getGoldGradient(),
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text'
            }}
          >
            {count500}+
          </h1>
          <motion.p 
            className="text-white text-[20px] font-['Lexend'] font-[400] mt-[-0px] p-0"
            variants={waveVariants}
          >
            properties
          </motion.p>
        </div>
      </motion.div>
      <hr ref={hrRef} className='my-[150px] border-t-[1.5px] border-white opacity-50' />
    </div>
  )
}

export default WhatWeDoComponent
import React, { useState, useEffect } from 'react'
import NavbarComponent from '../components/NavbarComponent'
import HeroComponent from '../components/HeroComponent'
import { AnimationContext } from '../utils/AnimationContext'
import WhatWeDoComponent from '../components/WhatWeDoComponent'
import OurProjectsComponent from '../components/OurProjectsComponent'
import WhyChooseUsComponent from '../components/WhyChooseUsComponent'
const Home = () => {
  const [doorAnimationComplete, setDoorAnimationComplete] = useState(false)
  const [mountKey, setMountKey] = useState(Date.now())
  
  useEffect(() => {
    setDoorAnimationComplete(false)
    setMountKey(Date.now())
  }, [])

  return (
    <AnimationContext.Provider value={{ doorAnimationComplete }}>
      <div className='relative w-full h-screen'>
        <HeroComponent 
          key={mountKey}
          setDoorAnimationComplete={setDoorAnimationComplete} 
        />
        <div className='absolute top-0 left-0 w-full'>
          <NavbarComponent />
        </div>
        <WhatWeDoComponent />
      <OurProjectsComponent />
      <WhyChooseUsComponent />
      </div>
    </AnimationContext.Provider>
  )
}

export default Home
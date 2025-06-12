import React, { useState, useEffect } from 'react'
import NavbarComponent from '../components/NavbarComponent'
import HeroComponent from '../components/HeroComponent'
import { AnimationContext } from '../utils/AnimationContext'
import WhatWeDoComponent from '../components/WhatWeDoComponent'
import OurProjectsComponent from '../components/OurProjectsComponent'
import WhyChooseUsComponent from '../components/WhyChooseUsComponent'
import CeoMessageComponent from '../components/CeoMessageComponent'
import RegisterNowComponent from '../components/RegisterNowComponent'

const Home = () => {
  const [doorAnimationComplete, setDoorAnimationComplete] = useState(false)
  const [mountKey, setMountKey] = useState(Date.now())
  
  useEffect(() => {
    setDoorAnimationComplete(false)
    setMountKey(Date.now())
  }, [])

  return (
    <AnimationContext.Provider value={{ doorAnimationComplete }}>
      <div className='relative w-full'>
        <div id="hero-section" className="hero-section">
          <HeroComponent 
            key={mountKey}
            setDoorAnimationComplete={setDoorAnimationComplete} 
          />
          <div className='absolute top-0 left-0 w-full'>
            <NavbarComponent />
          </div>
        </div>
        <div id="what-we-do">
          <WhatWeDoComponent />
        </div>
        <div id="our-projects">
          <OurProjectsComponent />
        </div>
        <div id="why-choose-us">
          <WhyChooseUsComponent />
        </div>
        <div id="ceo-message">
          <CeoMessageComponent />
        </div>
        <div id="register-now">
          <RegisterNowComponent />
        </div>
      </div>
    </AnimationContext.Provider>
  )
}

export default Home
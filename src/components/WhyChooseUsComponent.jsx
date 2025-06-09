import React from 'react';
import AppColor from '../utils/AppColor';

const WhyChooseUsComponent = () => {
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
          <h2 className="text-[130px] font-[400] font-['Luxurious_Roman'] text-white tracking-wider">
            WHY CHOOSE US
          </h2>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-y-24">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center">
              <div className="mb-5">
                <img 
                  src={feature.icon} 
                  alt={feature.title} 
                  className="w-25 h-25 object-contain"
                  style={{ filter: 'brightness(0) invert(0.7) sepia(1) saturate(1.5) hue-rotate(5deg)' }}
                />
              </div>
              <h3 className="text-[25px] font-[400] font-['Lexend'] text-white text-center">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsComponent;
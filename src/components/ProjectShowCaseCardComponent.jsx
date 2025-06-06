import React from 'react';

const ProjectShowCaseCardComponent = ({ image, title, subtitle }) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300" style={{ height: '400px', width: '100%' }}>
      {/* Image */}
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
      />
      
      {/* Dark overlay gradient at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 to-transparent"></div>
      
      {/* Text content */}
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-[30px] font-[400] font-['Lexend'] mb-2">{title}</h3>
        <p className="text-[20px]  font-[400] font-['Lexend'] text-gray-200">{subtitle}</p>
      </div>
    </div>
  );
};

export default ProjectShowCaseCardComponent; 
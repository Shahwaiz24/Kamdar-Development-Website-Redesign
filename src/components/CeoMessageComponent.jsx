import React from 'react';
import "../index.css";

const CeoMessageComponent = () => {
  return (
    <div className="w-full py-30 ceo-message-bg">
      {/* Content box with partial border at top */}
      <div className="ceo-message-box">
        {/* Right border element */}
        <span className="right-border-line"></span>
        
        {/* Heading */}
        <h2 className="text-center text-[65px] font-[300] font-['Lexend'] text-white mb-10">
          CEO MESSAGE
        </h2>
        
        {/* Quote */}
        <p className="text-center text-white text-[20px] font-['Lexend'] font-[300] leading-relaxed mb-12 px-24 max-w-[900px] mx-auto">
          We founded Kamdar with a simple belief: that real estate should stand the test of time, both in design and in trust. Every home we build is a reflection of that legacy.
        </p>
        
        {/* Name and title */}
        <div className="text-center">
          <h3 className="text-[28px] font-[400] font-['Lexend'] text-white tracking-wider mb-1">
            YUSUF KAMDAR
          </h3>
          <p className="text-[16px] font-[300] font-['Lexend'] text-gray-300">
            Chairman of Kamdar Developments
          </p>
        </div>
      </div>
    </div>
  );
};

export default CeoMessageComponent;
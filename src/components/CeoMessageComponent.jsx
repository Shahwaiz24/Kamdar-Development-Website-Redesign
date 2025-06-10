import React from 'react';
import "../index.css";

const CeoMessageComponent = () => {
  return (
    <div className="w-full py-20 ceo-message-bg">
      {/* Content box with partial border at top */}
      <div className="ceo-message-box">
        {/* Right border element */}
        <span className="right-border-line"></span>
        <div className="text-center text-white mx-auto leading-none">
          <h2 className="text-[80px] font-[400] font-['Luxurious_Roman'] text-white">
            CEO MESSAGE
          </h2>
          <p className="text-white text-[20px] font-['Lexend'] leading-tight tracking-wide font-[400] mt-[10px]  px-20 max-w-[900px] mx-auto">
          We founded Kamdar with a simple belief; that real estate should stand the test of time, both in design and in trust. Every home we build is a reflection of that legacy.”
          </p>
          <h3 className="text-[55px] mt-[45px] mb-[5px] font-[400] font-['Luxurious_Roman'] tracking-tighter text-white ">
            YUSUF KAMDAR
          </h3>
          <p className="text-[20px] font-[400] font-['Lexend'] tracking-wider  text-white ">
            Chairman of Kamdar Developments
          </p>


        </div>
        
        {/* Heading */}
        {/* <div className="text-center mb-1">
          <h2 className="text-[100px] font-[400] font-['Luxurious_Roman'] text-white">
            CEO MESSAGE
          </h2>
        </div>
        
        Quote */}
        {/* <div className="text-center mb-[20px]">
          <p className="text-white text-[20px] font-['Lexend'] font-[400]  px-20 max-w-[750px] mx-auto">
            We founded Kamdar with a simple belief: that real estate should stand the test of time, both in design and in trust. Every home we build is a reflection of that legacy.
          </p>
        </div>
         */}
        {/* Name and title */}
        {/* <div className="text-center">
          <h3 className="text-[50px] font-[400] font-['Luxurious_Roman'] text-white ">
            YUSUF KAMDAR
          </h3>
          <p className="text-[20px] font-[400] font-['Lexend'] text-gray-300 ">
            Chairman of Kamdar Developments
          </p>
        </div>
      
       */}
      </div>
    </div>
  );
};

export default CeoMessageComponent;
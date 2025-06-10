import React, { useState } from 'react';
import "../index.css";
import AppColor from '../utils/AppColor';
import ButtonComponent from './ButtonComponent';

const RegisterNowComponent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    enquiryType: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Left side images - overlapping/staggered */}
      <div className="absolute left-0 top-12">
        {/* Gradient overlay for left side */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-30 bg-gradient-to-r from-black to-transparent"></div>
        
        {/* Top left image - smaller architectural view */}
        <div className="w-60 h-150 rounded-tr-2xl rounded-br-2xl overflow-hidden shadow-2xl transform rotate-0 relative z-10 image-fade-left">
          <img 
            src="https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Modern apartment terrace"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Bottom left image - large building view, overlapping */}
        <div className="w-70 h-85 rounded-2xl overflow-hidden shadow-2xl transform rotate-0 -mt-60 ml-25 relative z-20 image-fade-left">
          <img 
            src="./register_now_img_1.jpg" 
            alt="High-rise residential building"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right side images - overlapping/staggered */}
      <div className="absolute right-0 top-16">
        {/* Gradient overlay for right side */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-30 bg-gradient-to-l from-black to-transparent"></div>
        
        {/* Top right image - building exterior, positioned higher */}
        <div className="w-60 h-150 rounded-tl-2xl rounded-bl-2xl overflow-hidden shadow-2xl transform rotate-0 relative z-10 image-fade-right">
          <img 
            src="./hero_img.jpg" 
            alt="Modern residential complex"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Bottom right image - interior bedroom, overlapping and larger */}
        <div className="w-100 h-55 rounded-2xl overflow-hidden shadow-2xl transform -rotate-0 -mt-40 -ml-50 relative z-20 image-fade-right">
          <img 
            src="./register_now_img_2.jpg" 
            alt="Luxury bedroom interior"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Center form section */}
      <div className="flex justify-center min-h-screen px-4 relative z-10">
        <div className="w-full max-w-max">
          {/* Header */}
          <div className="text-center text-white mb-10">
            <h1 className="text-[120px] font-[400] tracking-tighter font-['Luxurious_Roman'] mb-1">
              REGISTER NOW
            </h1>
            <p className="font-['Lexend'] text-[25px] font-[400] leading-px tracking-normal">
              Send an enquiry by filling in the form below
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* First row - Name fields */}
            <div className="grid grid-cols-2 gap-5">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 font-['Lexend'] text-[18px] font-[400] bg-transparent border-gray-400 border  rounded-lg text-white placeholder-white  focus:outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
              className="w-full px-5 py-4 font-['Lexend'] text-[18px] font-[400] bg-transparent border border-gray-400  rounded-lg text-white placeholder-white  focus:outline-none"
              />
            </div>

            {/* Second row - Contact fields */}
            <div className="grid grid-cols-2 gap-5">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-5 py-4 font-['Lexend'] text-[18px] font-[400] bg-transparent border border-gray-400  rounded-lg text-white placeholder-white  focus:outline-none"
              />
              <input
                type="email"
                name="emailAddress"
                placeholder="Email address"
                value={formData.emailAddress}
                onChange={handleInputChange}
               className="w-full px-5 py-4 font-['Lexend'] text-[18px]  font-[400] bg-transparent border border-gray-400  rounded-lg text-white placeholder-white  focus:outline-none"
             />
            </div>

            {/* Enquiry Type dropdown */}
            <select
              name="enquiryType"
              value={formData.enquiryType}
              onChange={handleInputChange}
              className="w-full px-5 py-4 font-['Lexend'] text-[18px] font-[400] bg-transparent border border-gray-400 border-white rounded-lg text-white text-sm focus:outline-none appearance-none cursor-pointer"
          
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 25px center',
                backgroundColor: 'transparent',
        
                backgroundRepeat: 'no-repeat',
                backgroundSize: '25px'
              }}
            >
              <option value="" className="bg-black text-gray-400">Enquiry Type</option>
              <option value="sales" className="bg-black text-white">Sales Enquiry</option>
              <option value="rental" className="bg-black text-white">Rental Enquiry</option>
              <option value="general" className="bg-black text-white">General Enquiry</option>
              <option value="investment" className="bg-black text-white">Investment Enquiry</option>
            </select>

            {/* Message textarea */}
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-5 py-4 font-['Lexend'] text-[18px] font-[400] bg-transparent border border-gray-400 rounded-lg text-white placeholder-white focus:outline-none resize-none"
            />

            {/* Submit button */}
            <div className="pt-2">
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
          </div>
      
      
      
        </div>
      </div>
    </div>
  );
};

export default RegisterNowComponent;
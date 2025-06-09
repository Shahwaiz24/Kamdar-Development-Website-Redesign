import React, { useState } from 'react'
import AppColor from '../utils/AppColor'
import ButtonComponent from './ButtonComponent'
import ProjectShowCaseCardComponent from './ProjectShowCaseCardComponent'

const OurProjectsComponent = () => {
  const sampleProjects = [
    {
      id: 1,
      image: './project_img_1.jpg',
      title: '105 Residencies By Kamdar',
      subtitle: 'JVC, Dubai'
    },
    {
      id: 2,
      image: './project_img_2.png',
      title: 'Meydan Villas',
      subtitle: 'Meydan, Dubai'
    },
    
  ]

  return (
    <div className='w-full pt-5 pb-[120px] px-[200px]'>
        <div className='flex flex-row justify-between items-center'>
            <h1 className="text-[130px] font-[400] font-['Luxurious_Roman'] text-white">Our Projects</h1>
            <ButtonComponent 
                label="View All Project"
                color={AppColor.black}
                width="190px"
                height="50px"
                fontSize="18px"
                borderRadius="8px"
                isHover={true}
                hoverColor={AppColor.white}
                style={{ 
                  fontWeight: "400", 
                  fontFamily: "Lexend",
                  background: AppColor.getGoldGradient(),
                  backgroundImage: AppColor.getGoldGradient()
                }}
            />
        </div>
        
        {/* Scrollable project showcase */}
        <div className="pt-[30px] overflow-hidden">
            <div className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide" 
                 style={{ 
                   scrollBehavior: 'smooth',
                   scrollSnapType: 'x mandatory',
                   WebkitOverflowScrolling: 'touch',
                   msOverflowStyle: 'none',
                   scrollbarWidth: 'none'
                 }}>
                
                {/* Using pairs of projects */}
                {Array.from({ length: Math.ceil(sampleProjects.length / 2) }, (_, index) => {
                    const startIndex = index * 2;
                    return (
                        <div key={`pair-${index}`} 
                             className="flex flex-row gap-10 min-w-full snap-start px-3"
                             style={{ scrollSnapAlign: 'center' }}>
                            {sampleProjects.slice(startIndex, startIndex + 2).map((project) => (
                                <div key={project.id} className="w-[calc(50%-20px)] flex-shrink-0">
                                    <ProjectShowCaseCardComponent
                                        image={project.image}
                                        title={project.title}
                                        subtitle={project.subtitle}
                                    />
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: Math.ceil(sampleProjects.length / 2) }, (_, index) => (
                    <button
                        key={`dot-${index}`}
                        className="h-2 w-2 rounded-full bg-gray-300 hover:bg-gray-500 transition-colors"
                        onClick={() => {
                            const container = document.querySelector('.snap-x');
                            if (container) {
                                const scrollWidth = container.scrollWidth;
                                const visibleWidth = container.clientWidth;
                                const totalPairs = Math.ceil(sampleProjects.length / 2);
                                const scrollPerPair = scrollWidth / totalPairs;
                                container.scrollTo({ 
                                    left: index * scrollPerPair,
                                    behavior: 'smooth'
                                });
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default OurProjectsComponent
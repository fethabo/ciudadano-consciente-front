import React, { useState } from 'react';
import { motion } from 'framer-motion';//eslint-disable-line

export default function AnimatedArrowButton({texto, hrefSection}){
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div 
      className="w-full flex justify-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <a 
        href={hrefSection} 
        className="relative cursor-pointer w-full flex justify-center"
      >
        {/* Container for both arrow and text */}
        <div className="relative items-center flex flex-col">
          <motion.div
            className="w-full top-full left-0 text-center mt-2"
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              opacity: isHovering ? 1 : 0,
              y: isHovering ? 0 : 5
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white font-medium whitespace-nowrap">
              {texto}
            </span>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ 
              scale: [1, 1.25, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 1024 1024"
              className={`transition-colors duration-300 ${isHovering ? 'text-orange-400' : 'text-gray-300'}`}
            >
              <path 
                fill="currentColor" 
                d="M831.872 340.864L512 652.672L192.128 340.864a30.59 30.59 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.59 30.59 0 0 0-42.752 0z"
              />
            </svg>
          </motion.div>
        </div>
      </a>
    </div>
  );
};
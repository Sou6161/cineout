// ScrollToTopButton.js

import React from 'react';
import { FaAngleUp } from 'react-icons/fa'; // Import the icon
import './BackToTop.css' // Add your CSS styles

const ScrollToTopButton = () => {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };

  return (
    <div className="scroll-to-top-button relative items-center" onClick={goToTop}>
      <FaAngleUp className="icon absolute items-center top-[1.3vh] left-[2vw] xsmall:left-[1.6vw] xsmall:text-[5.5vw] small:left-[1.3vw] small:text-[4.2vw] medium:left-[.8vw] medium:text-[3.5vw]  large:text-[2.5vw] xlarge:text-[2.2vw] 2xlarge:text-[1.7vw]  text-[8vw]" />
    </div>
  );
};

export default ScrollToTopButton;

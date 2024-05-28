// ScrollToTopButton.js

import React from 'react';
import { FaAngleUp } from 'react-icons/fa'; // Import the icon
import './BackToTop.css' // Add your CSS styles

const ScrollToTopButton = () => {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };

  return (
    <div className="scroll-to-top-button" onClick={goToTop}>
      <FaAngleUp className="icon relative top-1 left-1  text-[2vw]" />
    </div>
  );
};

export default ScrollToTopButton;

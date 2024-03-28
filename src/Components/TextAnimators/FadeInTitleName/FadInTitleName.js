import React, { useEffect, useRef } from "react";
import "./FadInTitleName.css"; // Import the CSS file for styling

const FadeInTitleName = ({ children }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      // Use a setTimeout to ensure the animation is applied after the component is mounted
      setTimeout(() => {
        textElement.classList.add("fade-in-name-animation"); // Add the fade-in class to trigger the animation
      }, 100); // You can adjust the delay (in milliseconds) according to your preference
    }
  }, []);

  return (
    <div className="fade-in-title">
      <div ref={textRef} className="fade-in-name">
        {children}
      </div>
    </div>
  );
};

export default FadeInTitleName;

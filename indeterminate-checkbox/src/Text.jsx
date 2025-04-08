import React, { useEffect, useRef, useState } from "react";

const Text = ({ text, duration }) => {
  const textRef = useRef({ endindex: 0, reverse: false });
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    let textInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (textRef.current.reverse) {
          if (textRef.current.endindex == 0) {
            textRef.current.reverse = false;
            return 0;
          }
          prev = textRef.current.endindex--;
          return prev;
        }
        if (!textRef.current.reverse) {
          if (textRef.current.endindex == text.length) {
            textRef.current.reverse = true;
            return text.length;
          }
          prev = textRef.current.endindex++;
          return prev;
        }
      });
    }, 100);
    console.log(textRef.current.endindex);

    return () => clearInterval(textInterval);
  }, [text, duration]);
  return (
    <div className="font-mono text-5xl text-blue-600 dark:text-blue-400">
      {text.slice(0, currentIndex)}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default Text;

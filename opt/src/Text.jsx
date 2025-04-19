import React, { useEffect, useRef, useState } from "react";

const Text = ({ duration = 300, text = "testing" }) => {
  const textRef = useRef({ reverse: false, index: 0 });
  const [displayText, setDispalyText] = useState("");

  useEffect(() => {
    const textTimer = setInterval(() => {
      const { index, reverse } = textRef.current;
      if (reverse) {
        if (index > 0) {
          textRef.current.index -= 1;
          setDispalyText(() => text.slice(0, index));
        } else {
          setDispalyText(() => text.slice(0, index));
          textRef.current.reverse = false;
        }
      } else {
        if (index < text.length) {
          textRef.current.index += 1;
          setDispalyText(() => text.slice(0, index));
        } else {
          setDispalyText(() => text.slice(0, index));
          textRef.current.reverse = true;
        }
      }
      return () => clearInterval(textTimer);
    }, duration);
  }, [duration, text]);
  console.log(displayText);

  return <div className="otp-heading">{displayText}|</div>;
};

export default Text;

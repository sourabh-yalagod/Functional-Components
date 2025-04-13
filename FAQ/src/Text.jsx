import React, { useEffect, useRef, useState } from "react";

const Text = ({ text, duration }) => {
  const [displayText, setDispalyText] = useState("");
  let textRef = useRef({ reverse: false, indice: 0 });
  useEffect(() => {
    const textInterval = setInterval(() => {
      const { indice, reverse } = textRef.current;
      if (reverse) {
        if (indice == 0) {
          textRef.current.reverse = false;
        } else {
          textRef.current.indice -= 1;
        }
      } else {
        if (indice === text.length) {
          textRef.current.reverse = true;
        } else {
          textRef.current.indice += 1;
        }
      }

      console.log(textRef.current.indice, textRef.current.reverse);

      setDispalyText(text.slice(0, textRef.current.indice));
      return () => clearInterval(textInterval);
    }, duration);
  }, []);
  return <div>{displayText}</div>;
};

export default Text;

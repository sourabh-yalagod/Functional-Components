import React, { useEffect, useRef, useState } from "react";
import Text from "./Text";
const OTP_LENGTH = 5;
const App = () => {
  const [otpInput, setOtpInput] = useState(new Array(OTP_LENGTH).fill(""));
  const otpInputRef = useRef([]);
  useEffect(() => {
    otpInputRef.current[0]?.focus();
  }, []);

  const handleInputChange = (inputEvent, currentIndex) => {
    const value = inputEvent?.target?.value?.slice(-1).trim();
    if (!/^[0-9]$/.test(value)) return;
    console.log(value);

    const cloneOtpInput = [...otpInput];
    cloneOtpInput[currentIndex] = value;
    setOtpInput(cloneOtpInput);
    if (value) {
      otpInputRef.current[currentIndex + 1]?.focus();
    }
  };
  const handleKeyUp = (keyEvent, currentIndex) => {
    if (keyEvent.key == "ArrowLeft") {
      otpInputRef.current[currentIndex - 1]?.focus();
    }
    if (keyEvent.key == "ArrowRight") {
      otpInputRef.current[currentIndex + 1]?.focus();
    }
    if (keyEvent.key === "Backspace") {
      if (otpInput[currentIndex]) {
        const cloneOtpInput = [...otpInput];
        cloneOtpInput[currentIndex] = "";
        setOtpInput(cloneOtpInput);
      } else {
        otpInputRef.current[currentIndex - 1]?.focus();
      }
    }
  };
  const handlePaste = (pasteEvent) => {
    pasteEvent.preventDefault();
    const pastedValue = pasteEvent.clipboardData
      .getData("text")
      .trim()
      .split("");
    const newArray = otpInput.map((input, index) => {
      return pastedValue[index] || "";
    });

    setOtpInput(newArray);
    const focusIndex = Math.min(newArray.length + 1, otpInput.length - 1);
    console.log(focusIndex);

    otpInputRef.current[focusIndex]?.focus();
  };

  return (
    <div className="container">
      <Text text="OPT Component" duration={250} />
      <div className="otp-container">
        {otpInput.map((otp, index) => (
          <input
            key={index}
            value={otp}
            ref={(inputElement) => (otpInputRef.current[index] = inputElement)}
            onChange={(e) => handleInputChange(e, index)}
            onKeyUp={(e) => handleKeyUp(e, index)}
            onPaste={handlePaste}
            type="text"
            className="otp-input"
          />
        ))}
      </div>
    </div>
  );
};

export default App;

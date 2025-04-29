import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);
  console.log(timer);
  const handleStop = () => {
    clearInterval(timerRef.current);
    setRunning(false);
  };
  const handleTimer = () => {
    if (running) return;
    setRunning(true);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        let { milliseconds, minutes, seconds } = prev;
        if (milliseconds > 0) {
          milliseconds -= 1;
        } else if (seconds > 0) {
          milliseconds = 99;
          seconds -= 1;
        } else if (minutes > 0) {
          milliseconds = 99;
          seconds = 59;
          minutes -= 1;
        } else {
          setRunning(false);
          clearInterval(timerRef.current);
          return { minutes: 0, seconds: 0, milliseconds: 0 };
        }
        return { minutes, seconds, milliseconds };
      }, 10);
    });
  };
  useEffect(() => {
    if (!timerRef.current) return;
    return clearInterval(timerRef.current);
  }, []);
  return (
    <div>
      <input
        type="number"
        placeholder="00"
        value={timer.minutes}
        onChange={(e) =>
          setTimer((prev) => {
            return { ...prev, minutes: e.target.value };
          })
        }
      />
      <input
        type="number"
        placeholder="00"
        value={timer.seconds}
        onChange={(e) =>
          setTimer((prev) => {
            return { ...prev, seconds: e.target.value };
          })
        }
      />
      <input
        type="number"
        placeholder="00"
        value={timer.milliseconds}
        onChange={(e) =>
          setTimer((prev) => {
            return { ...prev, milliseconds: e.target.value };
          })
        }
      />
      <button onClick={handleTimer}>Start</button>
      <button onClick={handleStop}>stop</button>
    </div>
  );
};

export default App;

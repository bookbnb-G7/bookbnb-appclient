import React, { useEffect, useState } from "react";

function useTimer(seconds, callback) {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(seconds);
  //console.log(timeLeft);
  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    if (timeLeft === seconds) {
      callback();
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  if (timeLeft <= 0) {
    setTimeLeft(seconds);
    callback();
  }
}

export default useTimer;

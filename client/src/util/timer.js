import { useEffect, useState } from "react";

const Timer = () => {
  /* Creating a state variable called timer and a function called setTimer. */
  const [timer, setTimer] = useState([0, 0, 0]);

  useEffect(() => {
    /* This is the code that is making the timer count up. */
    setTimeout(() => {
      /* Creating a new array with the same values as the timer array. */
      const countUpTimer = [...timer];
      /* This is checking if the seconds are less than 59. If they are, it will add 1 to the seconds. */
      if (countUpTimer[2] < 59) {
        countUpTimer[2] = countUpTimer[2] + 1;
        setTimer(countUpTimer);
      } /* This is checking if the minutes are less than 59. If they are, it will add 1 to the minutes. */ else if (
        countUpTimer[1] < 59
      ) {
        countUpTimer[2] = 0;
        countUpTimer[1] = countUpTimer[1] + 1;
        setTimer(countUpTimer);
      } /* This is checking if the minutes are greater than or equal to 59. If they are, it will set the
      minutes to 0, set the seconds to 0, and add 1 to the hours. */ else if (
        countUpTimer[1] >= 59
      ) {
        countUpTimer[1] = 0;
        countUpTimer[2] = 0;
        countUpTimer[0] = countUpTimer[0] + 1;
        setTimer(countUpTimer);
      }
    }, 1000);
  });
  return `${timer[0]} :${timer[1]} : ${timer[2]}`;
};

export default Timer;

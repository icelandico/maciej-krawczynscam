import React, { useEffect, useState } from 'react';
import './index.css';
import BgImg from './../../img/bg.jpg';

const calculateTimeLeft = () => {
  const difference = +new Date('18 Oct 2021') - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }
  return timeLeft;
}

export const WelcomePage = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const timerComponents = [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
        <span className="m-main__timer-value">
            {timeLeft[interval]} {interval}{" "}
          </span>
    );
  });

  return (
      <div className="main-welcome">
        <div className="main-welcome__container">
          <img className="main-welcome__hero" src={BgImg} />
        </div>
        <div className="main-welcome__info">
          <p className="main-welcome__info-text">Wróć i odbierz nagrodę za:</p>
        </div>
        <div className="main-welcome__timer">
          {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
      </div>
  );
}

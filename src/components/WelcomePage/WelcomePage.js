import React, { useEffect, useState } from 'react';
import './index.css';
import BgImg from './../../img/bg.jpg';

export const WelcomePage = ({ timeLeft }) => {
  const timerComponents = [];

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
          {timerComponents}
        </div>
      </div>
  );
}

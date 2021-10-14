import React, { useEffect, useState } from 'react';
import './App.css';
import { WelcomePage } from "./components/WelcomePage/WelcomePage";
import { Form } from "./components/Form/Form";

const calculateTimeLeft = () => {
  const difference = +new Date('14 Oct 2021 12:24') - +new Date();
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

function App() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = Object.keys(timeLeft).length > 0 && setTimeout(() => {
       setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="main-app">
      { Object.keys(timeLeft).length ? <WelcomePage timeLeft={timeLeft}/> : <Form /> }
    </div>
  );
}

export default App;

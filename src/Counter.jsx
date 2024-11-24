import React, { useState, useEffect } from 'react';

const Counter = () => {

  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('count');
    return savedCount !== null ? parseInt(savedCount, 10) : 0;
  });
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(1); 
  const [isCountingUp, setIsCountingUp] = useState(true); 
  const [laps, setLaps] = useState([]); 

 
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount + (isCountingUp ? step : -step));
      }, 1000);
    } else {
      clearInterval(interval);
    }


    return () => clearInterval(interval);
  }, [isRunning, step, isCountingUp]);

  
  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  
  const resetCounter = () => {
    setCount(0);
    setIsRunning(false);
    setLaps([]);
    setIsCountingUp(true);
  };

  
  const toggleCountDirection = () => {
    setIsCountingUp(prevState => !prevState);
  };


  const recordLap = () => {
    setLaps(prevLaps => [...prevLaps, count]);
  };

 
  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div>
      <h1>Counter: {formatTime(count)}</h1>
      
    
      <div>
        <label>
          Step Increment:
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Math.max(1, Number(e.target.value)))}
            min="1"
          />
        </label>
      </div>
      
      
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={resetCounter}>Reset</button>
      <button onClick={toggleCountDirection}>
        {isCountingUp ? 'Count Down' : 'Count Up'}
      </button>
      <button onClick={recordLap}>Record Lap</button>

     
      <div>
        <h2>Laps</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Counter;

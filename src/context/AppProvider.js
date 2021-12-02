import React, { useEffect, useState, useCallback } from 'react';
import { InputContext } from './InputProvider';
import { timeInSeconds, alertCountUp, alertCountDown } from '../utils/helpers';

// Sound and visual effects 
import confetti from "canvas-confetti"; 
import useSound from 'use-sound';
import roundChangeSound from '../sounds/round-change.wav';
import congratsSound from "../sounds/congrats.wav";


export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {

  // Import target rounds, run time, rest time from InputContext
  const { runHours, runMins, runSecs, 
           } = React.useContext(InputContext);

  // Document and fonts state
  // const [isReady, setIsReady ] = useState(false);
  const timers = [
    {
      type: 'XY',
      rounds: 3, 
      workSeconds: 90, 
    }, 
    {
      type: 'Stopwatch', 
      workSeconds: 120, 
    },
    {
      type: 'Tabata', 
      workSeconds: 120, 
      rounds: 8, 
      restSeconds: 110
    },  
    {
      type: 'Countdown',
      workSeconds: 180, 
    }
  ]; 

  const history = [
    {
      type: 'Countdown',
      workSeconds: 10, 
    }
  ]

  const addTimer = (timer) => {
    timers.push(timer);
    console.log(`hey: ${timer}`);
  }
  

  return (
    <AppContext.Provider value={{
            addTimer, timers
        }}>
          {children}
    </AppContext.Provider>

  );
};

export default AppProvider;

 
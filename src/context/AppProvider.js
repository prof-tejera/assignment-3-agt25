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
  const { timers } = React.useContext(InputContext);

  // Document and fonts state
  // const [isReady, setIsReady ] = useState(false);

  // The queue is originally filled with the user's configs 
  const [queue, setQueue] = React.useState(timers);


  const [newConfigs, setNewConfigs] = React.useState(false);

  const archived = [

  ]; 

  const [ history, setHistory] = React.useState(archived);

  const initialTimers = [
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

  

  
  async function removeTimer(id){
  
    // Assuming we don't remove it from the configs
    let filteredQueue = queue.filter((_, index) => index !== id);
    setQueue(filteredQueue);

  };

  async function archiveTimer(){

      if (queue.length !== 0) {
        // Archive the finished timer 
        let toArchive = queue[0]; 
        setHistory([...history, toArchive]);
      
        // Remove the finished timer 
        let filteredQueue = queue.filter((_, index) => index !== 0);
        setQueue(filteredQueue);
      };
  };
  
  

  return (
    <AppContext.Provider value={{
            removeTimer, archiveTimer, 
            queue, setQueue, 
            newConfigs, setNewConfigs,
            history, 

        }}>
          {children}
    </AppContext.Provider>

  );
};

export default AppProvider;

 
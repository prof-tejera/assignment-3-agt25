import React, { useState, useCallback, useEffect } from 'react';
import { AppContext } from './AppProvider';

export const InputContext = React.createContext({});

const InputProvider = ({ children }) => {

  const { setNewConfigs, queue, setQueue } = React.useContext(AppContext);

 
  const [homePage, setHomePage ] = useState(true);
  const [newVisit, setNewVisit ] = useState(true);
  const [timer, setTimerType ] = useState("Stopwatch");
  const [workSecs, setWorkSecs ] = useState(null);
  const [restSecs, setRestSecs ] = useState(null);
  const [rounds, setRounds ] = useState(null);

  const [totalTime, setTotalTime] = useState(0);

  
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
  
  async function addTimer(timer){
    timers.push(timer);
    
    setNewConfigs(true);
    calculateTotal(timer); 
    return null;
  }; 


  const calculateTotal = (timer) => {
    let totalTime; 

    let type = timer.type; 
    let work = timer.workSeconds;
    let rounds = timer.rounds;
    let rest = timer.restSeconds

    if (type === "XY") {
      totalTime = work * rounds; 
    } else if (type === "Tabata") {
      let compTimes = work + rest; 
      totalTime = compTimes * rounds; 
    } else {
      totalTime = work; 
    }; 

    setTotalTime(totalTime);
    
  }; 
  
  
    
  
  return (
    <InputContext.Provider value={{

           homePage, setHomePage,
           newVisit, setNewVisit, 

           timer, setTimerType, 
           timers, addTimer,
           workSecs, setWorkSecs, 
           restSecs, setRestSecs, 
           rounds, setRounds, 

           totalTime
            
        }}>
        
        {children}
    </InputContext.Provider>
  );
};

export default InputProvider;

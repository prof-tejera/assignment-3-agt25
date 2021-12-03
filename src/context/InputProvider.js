import React, { useState, useCallback, useEffect } from 'react';
import { AppContext } from './AppProvider';

export const InputContext = React.createContext({});

const InputProvider = ({ children }) => {

  const { setNewConfigs, queue, setQueue } = React.useContext(AppContext);

 
  const [homePage, setHomePage ] = useState(true);
  const [newVisit, setNewVisit ] = useState(true);
  const [timer, setTimerType ] = useState("Stopwatch");
  const [workSecs, setWorkSecs ] = useState(0);
  const [restSecs, setRestSecs ] = useState(0);
  const [rounds, setRounds ] = useState(0);

  
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
    console.log(`hey: ${timers}`);
    setNewConfigs(true);
   

    return null;
  }; 
  
  
    
  
  return (
    <InputContext.Provider value={{

           homePage, setHomePage,
           newVisit, setNewVisit, 

           timer, setTimerType, 
           timers, addTimer,
           workSecs, setWorkSecs, 
           restSecs, setRestSecs, 
           rounds, setRounds
            
        }}>
        
        {children}
    </InputContext.Provider>
  );
};

export default InputProvider;

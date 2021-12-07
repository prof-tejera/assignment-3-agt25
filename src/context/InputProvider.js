import React, { useState, useEffect } from 'react';
import { AppContext } from './AppProvider';

export const InputContext = React.createContext({});

const InputProvider = ({ children }) => {

  const { setNewConfigs, setRunning, setFinished } = React.useContext(AppContext);

 
  const [homePage, setHomePage ] = useState(true);
  const [newVisit, setNewVisit ] = useState(true);
  const [timer, setTimerType ] = useState("Stopwatch");
  const [workSecs, setWorkSecs ] = useState("");
  const [restSecs, setRestSecs ] = useState("");
  const [rounds, setRounds ] = useState(1);

  const [totalTime, setTotalTime] = useState(0);

  const [btnClicked, setBtnClicked] = useState("");

  

  
  const timers = [
    
  ]; 
  
  async function addTimer(timer){
    timers.push(timer);
    setNewConfigs(true);
    setFinished(false);
    calculateTotal(timer); 
    return null;
  }; 


  const calculateTotal = (timer) => {
    let newTotal; 

    let type = timer.type; 
    let work = parseInt(timer.workSeconds);
    let rounds = parseInt(timer.rounds);
    let rest = parseInt(timer.restSeconds);

    if (type === "XY") {
      newTotal = work * rounds; 
    } else if (type === "Tabata") {
      let compTimes = work + rest; 
      newTotal = compTimes * rounds; 
    } else {
      newTotal = work; 
    }; 

    setTotalTime(newTotal + totalTime);
  }; 
  
  
  useEffect(() => {
    if (btnClicked === "Start") {
      setRunning(true);


    }
  })

  

  
  
  return (
    <InputContext.Provider value={{

           homePage, setHomePage,
           newVisit, setNewVisit, 

           timer, setTimerType, 
           timers, addTimer,
           workSecs, setWorkSecs, 
           restSecs, setRestSecs, 
           rounds, setRounds, 

           totalTime, setBtnClicked, btnClicked,

          
        }}>
        
        {children}
    </InputContext.Provider>
  );
};

export default InputProvider;

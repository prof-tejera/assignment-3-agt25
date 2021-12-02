import React, { useState, useCallback, useEffect } from 'react';

export const InputContext = React.createContext({});

const InputProvider = ({ children }) => {

 
  const [homePage, setHomePage ] = useState(true);
  const [newVisit, setNewVisit ] = useState(true);
  const [timer, setTimerType ] = useState("Stopwatch");
  const [workSecs, setWorkSecs ] = useState(0);
  const [restSecs, setRestSecs ] = useState(0);
  const [rounds, setRounds ] = useState(0);

  
    
  
  return (
    <InputContext.Provider value={{

           homePage, setHomePage,
           newVisit, setNewVisit, 

           timer, setTimerType, 
           workSecs, setWorkSecs, 
           restSecs, setRestSecs, 
           rounds, setRounds
            
        }}>
        
        {children}
    </InputContext.Provider>
  );
};

export default InputProvider;

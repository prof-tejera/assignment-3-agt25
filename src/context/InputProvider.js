import React, { useState, useCallback, useEffect } from 'react';

export const InputContext = React.createContext({});

const InputProvider = ({ children }) => {

 
  // Target run time 
  const [runHours, setRunHours] = useState("00"); 
  const [runMins, setRunMins] = useState("00");
  const [runSecs, setRunSecs] = useState("00"); 

  // Target rest time 
  const [restHours, setRestHours] = useState("00"); 
  const [restMins, setRestMins] = useState("00"); 
  const [restSecs, setRestSecs] = useState("00"); 
  
  // Rounds
  const [targetRounds, setTargetRounds] = useState("00");

  // Input phases 
  const [isRunPhase, setIsRunPhase ] = useState(true);
  const [isRoundPhase, setIsRoundPhase ] = useState(false);
  const [isRestPhase, setIsRestPhase ] = useState(false);

  // Input buttons
  const [isRunEnabled, setIsRunEnabled] = useState(false);
  const [isRestEnabled, setIsRestEnabled] = useState(false);
  const [isRoundEnabled, setIsRoundEnabled] = useState(false);



  const handleTimeInput = useCallback((e) => {
    /************************************************
    * Handles both the run and rest time inputs
    ************************************************/

    // Save number input and id 
    let num = parseInt(e.value);
    const id = e.id;

    // If the input is whitespace, set the value to 0
    if (!num) {
        num = "0";
    };

    // Set run or rest time values
    if (id.includes("Hours")) {
        if (id.includes("run")) {
            setRunHours(num > 59 ? 59 : num);
        } else {
            setRestHours(num > 59 ? 59 : num);
        };
    } else if (id.includes("Min")) {
        if (id.includes("run")) {
            setRunMins(num > 59 ? 59 : num);
        } else {
            setRestMins(num > 59 ? 59 : num);
        };
    } else if (id.includes("Sec")) {
        if (id.includes("run")) {
            setRunSecs(num > 59 ? 59 : num);
        } else {
            setRestSecs(num > 59 ? 59 : num);
        };
    };
  }, [setRunHours, setRunMins, setRunSecs, 
      setRestHours, setRestMins, setRestSecs])


  const handleRoundInput = useCallback(
    (e) => {
        /**********************************
         * Handles round input;
         * updates the target rounds
         **********************************/
        let id = e.id;
        let num = parseInt(e.value); 
        setIsRunPhase(false); 
        setIsRoundPhase(true);
        
        if (id === "rounds") {
            setTargetRounds(num); 
        };
    },
    [setIsRunPhase, setIsRoundPhase, setTargetRounds],
  );


  const handleRestInput = (e) => {
    /**********************************
     * Handle rest time input 
     **********************************/
    setIsRoundPhase(false);
    setIsRestPhase(true); 

  };


  
  useEffect(() => {
    /*****************************************************************************
     * Enables the action button for the run and rest time phases 
     *****************************************************************************/
    setIsRunEnabled(runHours > 0 || runMins > 0 || runSecs > 0 ? true : false);
    setIsRestEnabled(restHours > 0 || restMins > 0 || restSecs > 0 ? true : false);

  }, [restHours, restMins, restSecs, 
      runHours, runMins, runSecs, 
      setIsRestEnabled, setIsRunEnabled, handleTimeInput ]);


  useEffect(() => {
    /****************************************************
     * Enables the action button for the round phase
     ****************************************************/
    setIsRoundEnabled(targetRounds > 0 ? true : false);
  }, [handleRoundInput, setIsRoundEnabled, targetRounds]);

  
  return (
    <InputContext.Provider value={{

            runHours, setRunHours, 
            runMins, setRunMins,
            runSecs, setRunSecs, 

            restHours, setRestHours, 
            restMins, setRestMins, 
            restSecs, setRestSecs, 

            targetRounds, setTargetRounds, 

            isRunPhase, setIsRunPhase,
            isRoundPhase, setIsRoundPhase,
            isRestPhase, setIsRestPhase,

            isRunEnabled, setIsRunEnabled,
            isRestEnabled, setIsRestEnabled, 
            isRoundEnabled, setIsRoundEnabled,

            handleTimeInput, handleRoundInput,
            handleRestInput
        }}>
        
        {children}
    </InputContext.Provider>
  );
};

export default InputProvider;

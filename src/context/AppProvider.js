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
          setRunHours, setRunMins, setRunSecs,
          restHours, restMins, restSecs, 
          setRestHours, setRestMins, setRestSecs,
          targetRounds, setTargetRounds, 
          setIsRunPhase, setIsRestPhase, setIsRoundPhase } = React.useContext(InputContext);

  // Document and fonts state
  const [isReady, setIsReady ] = useState(false);

  // Basic stats 
  const [timerType, setTimerType] = useState("Stopwatch");
  const [isInputPhase, setIsInputPhase ] = useState(false);
  const [isTimerShowing, setIsTimerShowing ] = useState(true);

  // Controls 
  const [isTimerRunning, setIsTimerRunning ] = useState(true);
  const [isTimerPaused, setIsTimerPaused ] = useState(false);
  const [isTimerStarted, setIsTimerStarted ] = useState(false);

  // Timer screen message helpers and progress bar data
  const [actionHelper, setActionHelper] = useState('Start New');
  const [actionBtn, setActionBtn ] = useState('New');

  // Progress bar 
  const [progressTime, setProgressTime ] = useState(0);
  const [currProgress, setCurrProgress ] = useState(0);

  // Forward / end functionality 
  const [isEndEnabled, setIsEndEnabled ] = useState(false);
  const [isEndNear, setIsEndNear ] = useState(false);
  const [isTimerEnd, setIsTimerEnd ] = useState(false);

  // Current stats 
  const [currHours, setCurrHours] = useState(0); 
  const [currMins, setCurrMins] = useState(0); 
  const [currSecs, setCurrSecs] = useState(0); 
  const [currRound, setCurrRound] = useState(1);
  const [currAction, setCurrAction ] = useState("Run"); 


  const [playNewRound] = useSound(roundChangeSound);
  const [playCongratsSound] = useSound(congratsSound);

  /****************************
   * TIMER METHODS BEGIN HERE
   ***************************/

   const isTimerEnding = useCallback(() => {
     /************************************************
      * Checks whether the timer ends within 5 seconds;
      * turns the timer text red to alert the user 
      * the timer is ending;
      *************************************************/
    let currTime = timeInSeconds(currHours, currMins, currSecs);
    
    if (timerType === "Stopwatch") {
      let targetTime = timeInSeconds(runHours, runMins, runSecs);
      if (targetTime - currTime <= 6 && targetTime - currTime !== 0) {
        setIsEndNear(true);
      } else {
        setIsEndNear(false);
      }; 
    } else {
      if (currTime <= 6 && currTime !== 0) {
        setIsEndNear(true);
      } else {
        setIsEndNear(false);
      };
    };
  }, [currHours, currMins, currSecs, runHours, runSecs, runMins, timerType]);


  const countDown = useCallback(() => {
       /*******************************************************
       * Used by "Countdown", "XY", and "Tabata"
       * stars at the user's inputted target values
       * and counts down to zero, where it ends the timer. 
       ******************************************************/
      if (isTimerEnd || isTimerPaused) return;
      isTimerEnding();

      // Conditionally handles the time hitting 0:0:0
      if (parseInt(currHours) === 0 && parseInt(currMins) === 0 
            && parseInt(currSecs) === 0) {
              
            // Handle XY 
            if (timerType === "XY") {
              // Handle XY interval loop 
              if (currRound < targetRounds) {
                playNewRound();
                setCurrRound(currRound + 1); 
                setCurrHours(runHours);
                setCurrMins(runMins); 
                setCurrSecs(runSecs);
              } else {
                // Handle end of XY  
                setIsTimerEnd(true);
              };
            } else if (timerType === "Tabata") {

              // Handle Tabata 
              if (currAction === "Run") {
                setCurrAction("Rest"); 
                setCurrHours(restHours);
                setCurrMins(restMins); 
                setCurrSecs(restSecs);
              } else if (currAction === "Rest") {
                  if (currRound < targetRounds) {
                    playNewRound();
                    setCurrRound(currRound + 1);
                    setCurrAction("Run"); 
                    setCurrHours(runHours);
                    setCurrMins(runMins); 
                    setCurrSecs(runSecs);
                  } else {
                    // Handle end of Tabata
                    setIsTimerEnd(true);
                  };
                };
              } else {
                // Handle end of Countdown
                setIsTimerEnd(true);
              };
      // Handles normal "decrement" time operations    
      } else if (currMins === 0 && currSecs === 0) {
          setCurrHours(currHours - 1);
          setCurrMins(59);
          setCurrSecs(59);
      } else if (currSecs === 0) {
          setCurrMins(currMins - 1);
          setCurrSecs(59);
      } else {
          setCurrSecs(currSecs - 1);
      };

    },
    [ currAction, currHours, currMins, currSecs, currRound, targetRounds,   
     runHours, runMins, runSecs, restHours, restMins, restSecs, 
     isTimerEnd, isTimerPaused, timerType, isTimerEnding, playNewRound ],
  );


  const countUp = useCallback(() => {
      /*******************************************************
       * Used by "Stopwatch"
       * stars at 0 (currValues)
       * and counts up to the target values (runSecs, etc.)
       ******************************************************/
      if (isTimerEnd || isTimerPaused) return;

      isTimerEnding();

      // Handle the stopwatch hitting the target time values
      if (currHours === parseInt(runHours) 
          && currMins === parseInt(runMins) 
          && currSecs === parseInt(runSecs)) {
          setIsTimerEnd(true);
          setActionBtn('New');
      } else if (currMins === 59 && currSecs === 59) {
          // Handle other normal increment operations
          setCurrHours(currHours + 1);
          setCurrMins(0);
          setCurrSecs(0);
      } else if (currSecs === 59) {
          setCurrMins(currMins + 1);
          setCurrSecs(0);
      } else {
          setCurrSecs(currSecs + 1);
      }
    },
    [currHours, currMins, currSecs, runHours, runMins, runSecs, isTimerPaused, isTimerEnd, isTimerEnding],
  );


  const endTimer = () => {
    /************************************
     * Manually ends the timer when the 
     * "end" button is clicked; 
     * (aka the forward functionality)
     *************************************/
    setIsTimerEnd(true);
    setIsEndNear(false);
    
    if (timerType !== "Stopwatch") {
        setCurrHours("00");
        setCurrMins("00");
        setCurrSecs("00");
        if (timerType === "XY" || timerType === "Tabata") {
          setCurrRound(targetRounds);
        }; 
    } else {
        setCurrHours(runHours);
        setCurrMins(runMins);
        setCurrSecs(runSecs);
    };  
  };


  const congrats = useCallback(() => {
    /********************************************
     * Confetti animation congratulates the user
     ********************************************/
    confetti({
      particleCount: 150,
      spread: 60
    });
    playCongratsSound();
  }, [playCongratsSound]); 


  const resetTimer = () => {
    /*********************************
     * Resets the timer state 
     *********************************/

    // Reset current values displaying
    setCurrHours(0);
    setCurrMins(0);
    setCurrSecs(0);
    setCurrRound(1);
    setCurrAction("Run");

    // Reset target values previously inputted 
    setRunHours(0); 
    setRunMins(0);
    setRunSecs(0);
    setRestHours(0);
    setRestMins(0);
    setRestSecs(0);
    setTargetRounds(0);

    // Reset current action helpers
    setIsTimerRunning(false);
    setIsTimerStarted(false);
    setIsTimerPaused(false);
    setIsInputPhase(false);
    setIsTimerShowing(true);
    setActionBtn("New");
    setActionHelper("Start New");
    setProgressTime(0);
    setCurrProgress(0);

    // Buttons
    setIsEndEnabled(false);
    setIsTimerEnd(false);
    setIsEndNear(false);

    // Phases
    setIsRunPhase(true);
    setIsRoundPhase(false);
    setIsRestPhase(false);
  };


  const handleActionButton = () => {
    /************************************************
     * Conditionally changes the action button;
     * Changes the current phase (timer or input);
     * Changes the controls (pause / not-paused); 
     ************************************************/
    switch(actionBtn) {
      case "New": 
        resetTimer();
        setIsTimerShowing(false);
        setIsInputPhase(true);
        setActionBtn("Pause");
        break;
      case "Start":
        setActionBtn("Pause");
        setIsTimerPaused(false);
        break;
      case "Pause": 
        setActionBtn("Start");
        setIsTimerPaused(true);
        break;
      default: 
        setActionBtn("New");
    };
  };
  
  /***************************
   * TIMER EFFECTS BEGIN HERE
  ****************************/
  
  // Switches current time values between run and rest
  useEffect(() => { 
    /************************************************************
     * Sets the current values to the target run / rest values; 
     * depends on the timer type. 
     * Only runs when the current action "currAction" is changed. 
     * Also changes the progress time to reflect run or rest
     ************************************************************/
    if (timerType !== "Stopwatch") {
      if (currAction.includes("Run")) {
        setCurrHours(parseInt(runHours));
        setCurrMins(parseInt(runMins));
        setCurrSecs(parseInt(runSecs));
        setProgressTime(timeInSeconds(runHours, runMins, runSecs));
      } else if (currAction.includes("Rest")) {
        setCurrHours(parseInt(restHours));
        setCurrMins(parseInt(restMins));
        setCurrSecs(parseInt(restSecs));
        setProgressTime(timeInSeconds(restHours, restMins, restSecs));
      };
    } else {
      // Stopwatch progress
      setProgressTime(timeInSeconds(runHours, runMins, runSecs));
    };
    
  }, [currAction, runHours, runSecs, runMins, 
      restHours, restMins, restSecs, timerType]); 


  // Effect for when the timer ends
  useEffect(() => {
    /********************************************************
     * Only triggered when the timer ends,
     * either automatically or manually (via the end button).
     * Congratulates the user
     ********************************************************/
    if (isTimerEnd) {
      congrats();
      setActionBtn("New"); 
      setIsTimerPaused(false);
      setCurrAction("Congrats");
      setActionHelper("You did it!");
      setCurrProgress(progressTime)
    }; 
  }, [isTimerEnd, progressTime, congrats]);


  // Effect that triggers 'count' ops
  useEffect(() => {
    /****************************************************
     * Announces the newly initiated timer;
     * calls the proper count method (count down or up);
     * clears the interval when unmounted
     ***************************************************/
    let intervalId; 
    if (isTimerStarted) {
        setIsInputPhase(false);
        setIsTimerShowing(true);
        setIsEndEnabled(true);

        // Handle the current timer 
        switch(timerType) {
          case "Stopwatch": 
            intervalId = setInterval(() => countUp(), 1000); 
            break;
          case "Countdown":
            // Pass in the targets here
            intervalId = setInterval(() => countDown(), 1000); 
            break;
          case "XY": 
            intervalId = setInterval(() => countDown(), 1000); 
            break;
          case "Tabata": 
            intervalId = setInterval(() => countDown(), 1000); 
            break;
          default: 
            setActionBtn("Stopwatch");
        }; 
        
    } 
    // Clear interval when app unmounts 
    return () => clearInterval(intervalId);

  }, [isTimerStarted, countDown, timerType, countUp, isTimerEnd, 
    runHours, runMins, runSecs, targetRounds, currRound ]);


  // Effect for the 'Input Phase'
  useEffect(() => {
    /*****************************
     * Returns to the timer screen 
     * after user exits inputs 
     *****************************/
    if (!isInputPhase) {
        setIsTimerShowing(true);
    }; 
  }, [isInputPhase]);


  // Effect for 'Pause'
  useEffect(() => {
    /**********************************
     * Handles pause operations;
     * pauses the progress bar, 
     * alerts the user they've paused. 
     ***********************************/
    if (isTimerStarted) {
      if (isTimerPaused) {
        setActionHelper("You've Paused!");
        setIsEndNear(false);
      } else if (isTimerEnd) {
        setIsEndNear(false);
      };
    };
      
  }, [isTimerPaused, isTimerStarted, isTimerEnd, progressTime, currAction]);


  // Effect for FOUT
  useEffect(() => {
    /************************************************
     * Checks if the fonts are ready; handles FOUT
     ***********************************************/
    document.fonts.ready.then(() => setIsReady(true));
  }, []); 


  // Effect for timer alerts 
  useEffect(() => {
    /***************************************************
     * Changes the current alerts (actionHelper) based
     * on the current time
     **************************************************/
    if (isTimerStarted && !isTimerPaused && !isTimerEnd) {
      let currTime = timeInSeconds(currHours, currMins, currSecs); 
      let targetTime;

      // Get the target time 
      if (currAction === "Run") {
        targetTime = timeInSeconds(runHours, runMins, runSecs)
      } else if (currAction === "Rest") {
        targetTime = timeInSeconds(restHours, restMins, restSecs);
      }; 
      
      if (timerType === "Stopwatch") {
        setActionHelper(alertCountUp(targetTime, currTime));
        setCurrProgress(currTime);
      } else {
        setActionHelper(alertCountDown(targetTime, currTime, currAction, timerType, currRound)); 
        setCurrProgress(targetTime - currTime);
      }; 
    }
  }, [setActionHelper, currHours, currMins, currSecs, currAction, currRound,
    runHours, runMins, runSecs, restHours, restMins, restSecs,
    isTimerStarted, isTimerPaused, isTimerEnd, timerType, currProgress]);
 

  return (
    <AppContext.Provider value={{
            isReady, 
            timerType, setTimerType, 
            isInputPhase, setIsInputPhase, 
            isTimerRunning, setIsTimerRunning, 
            isTimerShowing, setIsTimerShowing, 
            isTimerPaused, setIsTimerPaused, 
            currHours, setCurrHours, 
            currMins, setCurrMins, 
            currSecs, setCurrSecs, 
            currAction, setCurrAction,
            currRound, setCurrRound, 
            currProgress, setCurrProgress, 
            actionHelper, setActionHelper, 
            actionBtn, setActionBtn, 
            progressTime, setProgressTime,
            isTimerStarted, setIsTimerStarted, 
            isEndEnabled, setIsEndEnabled,
            isTimerEnd, setIsTimerEnd,
            isEndNear,
            resetTimer, endTimer, congrats, handleActionButton, alert
        }}>
          {children}
    </AppContext.Provider>

  );
};

export default AppProvider;

 
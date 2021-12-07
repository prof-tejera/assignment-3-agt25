import React, {useEffect, useState, useCallback} from 'react';
import {InputContext} from './InputProvider';
import {timeInSeconds, alertCountUp, alertCountDown} from '../utils/helpers';

// Sound and visual effects
import confetti from "canvas-confetti";
import useSound from 'use-sound';
import roundChangeSound from '../sounds/round-change.wav';
import congratsSound from "../sounds/congrats.wav";

export const AppContext = React.createContext({});

const AppProvider = ({children}) => {

    // Import target rounds, run time, rest time from InputContext
    const { timers, btnClicked, totalTime, setNewVisit } = React.useContext(InputContext);

    // Document and fonts state
    const [isReady, setIsReady] = useState(false);

    // The queue is originally filled with the user's configs
    const [queue, setQueue] = React.useState(timers);

    const [newConfigs, setNewConfigs] = React.useState(false);

    const [paused, setPaused] = React.useState(false);
    const [running, setRunning] = React.useState(false);
    const [currAction, setCurrAction] = React.useState("Work");

    const [currRound, setCurrRound] = React.useState(1);


    const [currElapsed, setCurrElapsed] = React.useState(0);

    const [finished, setFinished] = React.useState(false);

    const [currTime, setCurrTime] = React.useState(0);

    
    // on skip, add the total timers in the queue
    // curr Elapsed should be added to the total so far ? 
    // and it should be added to the totalElapsed once the timer is finished
    // and set to 0. 
    

    const [isTimerReady, setIsTimerReady ] = React.useState(false);

    const [currTimer, setCurrTimer ] = React.useState(0);

  
    // USED AS A SCHEMA
    const initialTimers = [
        {
            type: 'XY',
            rounds: 3,
            workSeconds: 90
        }, {
            type: 'Stopwatch',
            workSeconds: 120
        }, {
            type: 'Tabata',
            workSeconds: 120,
            rounds: 8,
            restSeconds: 110
        }, {
            type: 'Countdown',
            workSeconds: 180
        }
    ];

    const archiveTimer = useCallback(() => {
      console.log('finished!!!!');
       if (currTimer + 1 !== queue.length) {
         setCurrTimer(currTimer + 1);
         setFinished(false);
       } else {
         setFinished(true);
       }; 
      
    }, [finished, currTimer])

    
    
    

    useEffect(() => {
      if (finished) {
        archiveTimer(); 
      }

    }, [finished])


    useEffect(() => {
      if (queue) {
        if (queue.length > currTimer && finished) {
          setFinished(false);
          setCurrTimer(currTimer + 1);
        }
      }
      
    }, [queue])


    const countDown = useCallback(() => {
    
        if (paused || finished || queue.length === 0) return;
        
        // Call the end one Conditionally handles the time hitting 0:0:0
        if (currTime === 0) {
            if (queue[currTimer].type === "XY") {
                // Handle end of XY
                if (currRound < queue[currTimer].rounds) {
                    setCurrRound(currRound + 1);
                    setCurrTime(queue[currTimer].workSeconds)
                } else {
                    setFinished(true);
                };
            } else if (queue[currTimer].type === "Tabata") {
                // Handle end of Tabata
                if (currAction === "Work") {
                    setCurrAction("Rest");
                    setCurrTime(queue[currTimer].restSeconds)
                } else if (currAction === "Rest") {
                    if (currRound < queue[currTimer].rounds) {
                      setCurrRound(currRound + 1);
                      setCurrAction("Work");
                      setCurrTime(queue[currTimer].workSeconds)
                    } else {
                      setFinished(true);
                    }; 
                } else {
                    setFinished(true);
                };
            } else if (queue[currTimer].type === "Countdown") {
                // Handle end of countdown
                setFinished(true);
                console.log('FINISHED');
            }
        } else {
            setCurrTime(currTime - 1);
        };

    }, [currAction, currTime, currRound, queue, paused, finished]);



  


    


    const countUp = useCallback(() => {
        /*******************************************************
       * Used by "Stopwatch"
       * stars at 0 (currValues)
       * and counts up to the target values (runSecs, etc.)
       ******************************************************/
        if (finished || paused || queue.length === 0) return;
        
        // Handle the stopwatch hitting the target time values
        if (currTime !== parseInt(queue[currTimer].workSeconds)) {
            setCurrTime(currTime + 1);
            console.log(queue[currTimer].workSeconds)
            
        } else {
            setFinished(true);
        }

    }, [currAction, currTime, queue, paused, finished]);



    // Effect for FOUT
    useEffect(() => {
        /************************************************
        * Checks if the fonts are ready; handles FOUT
        ***********************************************/
        document.fonts.ready.then(() => setIsReady(true));
        
    }, []);

      // Populates the appropriate run / rest values when the currAction changes
      useEffect(() => {
        if (queue && running) {
          
          if (queue[currTimer].type === "XY" || queue[currTimer].type === "Tabata") {
              if (currAction === "Work") {
                  setCurrTime(queue[currTimer].workSeconds);
              } else if (currAction.includes("Rest")) {
                  setCurrTime(queue[currTimer].restSeconds); 
              } 
          } else if (queue[currTimer].type === "Stopwatch") {
            // Stopwatch starts at 0 
            setCurrAction("Work"); 
            setCurrTime(0);
          } else if (queue[currTimer].type === "Countdown") {
            setCurrTime(queue[currTimer].workSeconds);
            setCurrAction("Work");
          };
          setIsTimerReady(true);
        }
      }, [currAction, queue, running, isTimerReady, currTimer])
  

    useEffect(() => {
      let intervalId;

      if (running && queue && isTimerReady)  {
          let timerType = queue[currTimer].type;
          switch (timerType) {
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
                 setCurrAction("YEAH");
          };
      }
      // Clear interval when app unmounts
      return() => clearInterval(intervalId);

  }, [running, countDown, countUp, queue, isTimerReady])


    




    async function removeTimer(id) {
      /*********************************************************
       * Removes the intended timer from the queue after 
       * conditionally updating the currTimer's state. 
       **********************************************************/


      if (id === 0) {
        /*******************************************
        * Handle deletion of timer 0 
        * *****************************************/ 
        if (currTimer === 0) {
          if (queue.length > 1) {
            /* If 0 is the current timer, and there's one next to it, 
            set it back to 0 */ 
            setCurrTimer(0);
          } else {
            // If there's no other timers, delete 0 and reset the app
            setNewVisit(true);
            setRunning(false);
          };
        } else {
          setCurrTimer(currTimer - 1);
        };
      } else if (id === currTimer) {
       /*******************************************
       * Handle deletion of the current Timer 
       * *****************************************/ 
        if (currTimer + 1 < queue.length) {
           // If it's not the last timer, keep the previous index 
          setCurrTimer(currTimer);
        } else {
          // Else, go back an index 
          setCurrTimer(currTimer - 1);
        };
      } else {
        /*******************************************
       * Handle deletion of non-active timers
       * *****************************************/ 
        if (id + 1 <= queue.length) {
          setCurrTimer(currTimer);
        } else {
          setCurrTimer(currTimer - 1);
        };
      };
      

      // Delete the intended timer and set the update queue to state
      let filteredQueue = queue.filter((_, index) => index !== id);
      setQueue(filteredQueue);

    };

   

    

    return (
        <AppContext.Provider
            value={{
                isReady,
                removeTimer,
                archiveTimer,
                queue,
                setQueue,
                newConfigs,
                setNewConfigs,
                paused,
                setPaused,
                running,
                setRunning,

                currAction,
                setCurrAction,
                currRound,
                setCurrRound, 

                currTime, 
                setCurrTime, 
                finished,

                currTimer
                
            }}>
            {children}
        </AppContext.Provider>

    );
};

export default AppProvider;


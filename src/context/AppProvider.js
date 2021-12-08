import React, {useEffect, useState, useCallback} from 'react';
import {InputContext} from './InputProvider';

// Sound and visual effects 
import confetti from "canvas-confetti"; 
import useSound from 'use-sound';
import roundChangeSound from '../sounds/round-change.wav';
import congratsSound from "../sounds/congrats.wav";


export const AppContext = React.createContext({});

const AppProvider = ({children}) => {

    // Import stats from Input 
    const { timers, totalTime, setNewVisit, setTotalTime, homePage } = React.useContext(InputContext);

    // Document and fonts state
    const [isReady, setIsReady] = useState(false);
    const [newConfigs, setNewConfigs] = React.useState(false);
    const [isTimerReady, setIsTimerReady ] = React.useState(false);

    // The queue is originally filled with the user's configs
    const [queue, setQueue] = React.useState(timers);

    // Workout actions 
    const [paused, setPaused] = React.useState(false);
    const [running, setRunning] = React.useState(false);
    const [finished, setFinished] = React.useState(false);

    // Current stats 
    const [currAction, setCurrAction] = React.useState("Work");
    const [currRound, setCurrRound] = React.useState(1);
    const [currTime, setCurrTime] = React.useState(0);
    const [currTimer, setCurrTimer ] = React.useState(0);


    const [currElapsed, setCurrElapsed] = React.useState(0);
    const [totalElapsed, setTotalElapsed] = React.useState(0);
    const [workoutEnd, setWorkoutEnd] = React.useState(false);


    const [playNewRound] = useSound(roundChangeSound);
    const [playCongratsSound] = useSound(congratsSound);


    const congrats = () => {
      /********************************************
       * Confetti animation congratulates the user
       ********************************************/
      confetti({
        particleCount: 150,
        spread: 60
      });
     
    };

    
    const archiveTimer = useCallback(() => {

       if (currTimer + 1 !== queue.length) {
         playNewRound();
         setCurrTimer(currTimer + 1);
         setFinished(false);
         setCurrElapsed(0);
       } else {
         setFinished(true);
         setCurrAction("Congrats");
         setPaused(true);
         
       }; 
    }, [currTimer, queue, playNewRound])


    
    
    const skipTimer = useCallback(() => {
      let curr = queue[currTimer]; 
      let newElapsed = parseInt(totalElapsed) - parseInt(currElapsed);
      if (currTimer + 1 < queue.length) {
        if (curr.type === "Stopwatch" || curr.type === "Countdown") {
          newElapsed += parseInt(curr.workSeconds); 
        } else if (curr.type === "XY") {
          let xyTotal = parseInt(curr.workSeconds) * parseInt(curr.rounds);
          newElapsed += xyTotal;
        } else if (curr.type === "Tabata") {
          let tabataTotal = (parseInt(curr.workSeconds) + parseInt(curr.restSeconds));
          tabataTotal = tabataTotal * parseInt(curr.rounds);
          newElapsed += tabataTotal; 
        };
        // Update the total elapsed time
        setTotalElapsed(newElapsed);

        // Go to the next timer 
        setCurrTimer(currTimer + 1); 
      } else {
        if (curr.type === "Stopwatch") {
          console.log(`fhduhd${curr.workSeconds}`);
          setCurrTime(curr.workSeconds);
        } else {
          if (curr.type === "XY" || curr.type === "Tabata") {
            setCurrRound(curr.rounds);
          }; 
          setCurrTime(0); 
        };
        setFinished(true);
        setTotalElapsed(totalTime);
      }
      
    }, [queue, currTimer, currElapsed, totalElapsed, totalTime]); 



    const resetTimer = () => {
      console.log('Reset');
      setCurrTimer(0);
      setFinished(false);
      setPaused(false);
      setCurrRound(1);
    }; 
    
    
    useEffect(() => {
      /* Listen for each timer's end;
        Call the archive method */  
      if (finished) {
        archiveTimer(); 
      }
    })

    useEffect(() => {
      // Announce the actual end of the entire workout
      if (totalElapsed === totalTime && queue.length > 0 && homePage) {
        if (totalElapsed !== 0) {
          setWorkoutEnd(true);
          congrats();
          playCongratsSound();
        };
      }; 
    }, [totalElapsed, totalTime, homePage, playCongratsSound, queue])

    


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
            setCurrElapsed(currElapsed + 1);
            setTotalElapsed(totalElapsed + 1);
        };

    }, [currAction, currTime, currRound, queue, paused, finished, currTimer, currElapsed, totalElapsed]);



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
            setCurrElapsed(currElapsed + 1);
            setTotalElapsed(totalElapsed + 1);
        } else {
            setFinished(true);
        };

    }, [currTime, queue, paused, finished, currTimer, totalElapsed, currElapsed]);


    
    
    useEffect(() => {
        /* When the app loads, load the fonts; 
           gets rid of FOUT */
        document.fonts.ready.then(() => setIsReady(true));
    }, []);


      useEffect(() => {
        /*****************************************************************
         * Listens for action changes (rest, work); 
         * Switches the ative currTime conditionally;
         *****************************************************************/
        if (queue && running && !finished) {
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
      }, [currAction, queue, running, isTimerReady, currTimer, finished])
  

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

  }, [running, countDown, countUp, queue, isTimerReady, currTimer])


  

    async function removeTimer(id) {
      /*********************************************************
       * Removes the intended timer from the queue after 
       * conditionally updating the currTimer's state. 
       **********************************************************/

      // 0 1 2 3 
      if (id === 0 && queue.length === 1) {
        setNewVisit(true);
        setRunning(false);
        setFinished(false);
        setTotalTime(0);
      }; 

      if (currTimer === id) {
        // If we delete 2, and there's timers after it, keep the current index 
        if (queue.length > currTimer) {
          setCurrTimer(currTimer); 
        } else {
          setCurrTimer(currTimer - 1); 
        }
      } else if (currTimer < id) {
        setCurrTimer(currTimer); 
      } else if (currTimer > id) {
        setCurrTimer(currTimer - 1); 
      };
        
      // Delete the intended timer and set the update queue to state
      let filteredQueue = queue.filter((_, index) => index !== id);
      setQueue(filteredQueue);

    };


    return (
        <AppContext.Provider
            value={{
                isReady,
                newConfigs, setNewConfigs,

                queue, setQueue,
                paused, setPaused,
                running, setRunning,
                finished, setFinished,
                workoutEnd,

                currAction, setCurrAction,
                currRound, setCurrRound, 
                currTime, setCurrTime, 
                currTimer,
                totalElapsed, currElapsed,
                
                resetTimer,
                skipTimer, 
                removeTimer,
                archiveTimer,
            }}>
            {children}
        </AppContext.Provider>

    );
};

export default AppProvider;


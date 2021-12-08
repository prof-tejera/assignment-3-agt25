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
    const {timers, totalTime, setNewVisit, setTotalTime, homePage} = React.useContext(
        InputContext
    );

    // Document and fonts state
    const [isReady, setIsReady] = useState(false);
    const [newConfigs, setNewConfigs] = React.useState(false);
    const [isTimerReady, setIsTimerReady] = React.useState(false);

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
    const [currTimer, setCurrTimer] = React.useState(0);

    const [currElapsed, setCurrElapsed] = React.useState(0);
    const [totalElapsed, setTotalElapsed] = React.useState(0);
    const [workoutEnd, setWorkoutEnd] = React.useState(false);

    const [playNewRound] = useSound(roundChangeSound);
    const [playCongratsSound] = useSound(congratsSound);

    const [timerChange, setTimerChange] = React.useState(false);

   


    const congrats = () => {
        /********************************************************************************
       * Confetti animation congratulates the user; plays only at the end of a workout.
       ********************************************************************************/
        confetti({particleCount: 150, spread: 60});
    };


    const archiveTimer = useCallback(() => {
        /*****************************************************************************
         * If the current timer has finished and it is the last timer,
         * set the workout to complete.
         * If it is not the last timer, play a sound, move onto the next timer,
         * and announce the change.
         *****************************************************************************/
        if (currTimer + 1 !== queue.length) {
            setTimerChange(true);
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

    
    useEffect(() => {
        /********************************************************************************
       * When the timer has been changed, populate the initial values, rather than
       * anytime the queue or currTimer changes.
       * It listens for the 'timerChange' var so when there's delete operations
       * and the current timer hasn't changed but its index (currTimer) has,
       * we don't lose track of the current active values.
       * Example: Stopwatch is at 0:06, and we delete the timer before it,
       * we don't want to auto-populate the value of the current Stopwatch at 0:00.
       ********************************************************************************/
            if (timerChange && isTimerReady && queue) {
              if (queue[currTimer].finished === true) {
                populateFinishedVals(queue[currTimer]);
              } else {
                populateInitialVals(queue[currTimer]);
              };
              setTimerChange(false);
          }
    })

    


    const resetTimer = () => {
      /*******************************************************************************
       * Resets the current values and re-starts the entire workout as configured.
       * It does not include timers deleted from the queue mid-workout.
      ******************************************************************************/
        console.log('RESETTTTT');   
        let freshQueue = queue; 
        freshQueue.forEach((timer, index) => {
          timer.finished = false; 
        }); 

        setQueue(freshQueue); 
        setCurrTimer(0);
        setFinished(false);
        setPaused(false);
        setCurrRound(1);
        setCurrElapsed(0);
        setTotalElapsed(0);
        setTimerChange(true);
        setWorkoutEnd(false);
    };


    useEffect(() => {
        /*************************************************************************
         * Listens for each individual timer's end; calls the archive method.
         *************************************************************************/
        if (finished) {
            archiveTimer();
        };
    });

    useEffect(() => {
      if (queue && isTimerReady) {
        if (currTimer + 1 === queue.length && queue[currTimer].finished) {
          setWorkoutEnd(true);
        } else {
          setWorkoutEnd(false);
        }
      }
      
    }, [queue, currTimer, isTimerReady])


    useEffect(() => {
       /*************************************************************************
        * Handles the end of the workout; congratulates the user. 
        ************************************************************************/
        if (totalElapsed === totalTime && queue.length > 0 && homePage) {
            if (totalElapsed !== 0) {
                setWorkoutEnd(true);
                congrats();
                playCongratsSound();
            };
        };
    }, [totalElapsed, totalTime, homePage, playCongratsSound, queue])

    
    
    const countDown = useCallback(() => {
      /*************************************************************************
       * Handles timers that count down from the target: Countdown, XY, Tabata
       *************************************************************************/

        if (paused || finished || queue.length === 0) 
            return;
        
        // Call the end one Conditionally handles the time hitting 0:0:0
        if (currTime === 0) {
            if (queue[currTimer].type === "XY") {
                // Handle end of XY
                if (currRound < queue[currTimer].rounds) {
                    setCurrRound(currRound + 1);
                    setCurrTime(queue[currTimer].workSeconds)
                } else {
                    setFinished(true);
                    queue[currTimer].finished = true;
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
                        queue[currTimer].finished = true;
                    };
                } else {
                    setFinished(true);
                    queue[currTimer].finished = true;
                };
            } else if (queue[currTimer].type === "Countdown") {
                // Handle end of countdown
                setFinished(true);
                queue[currTimer].finished = true;
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
        if (finished || paused || queue.length === 0) 
            return;
        
        // Handle the stopwatch hitting the target time values
        if (currTime !== parseInt(queue[currTimer].workSeconds)) {
            setCurrTime(currTime + 1);
            setCurrElapsed(currElapsed + 1);
            setTotalElapsed(totalElapsed + 1);
        } else {
            setFinished(true);
            queue[currTimer].finished = true;
        };

    }, [currTime, queue, paused, finished, currTimer, totalElapsed, currElapsed]);

    
    
    useEffect(() => {
        /* When the app loads, load the fonts;
           gets rid of FOUT */
        document
            .fonts
            .ready
            .then(() => setIsReady(true));
    }, []);

    async function populateInitialVals(timer) {

        // Populates the initial values whenever the active timer changes
        if (timer.type !== "Stopwatch") {
            setCurrTime(timer.workSeconds);
            setCurrRound(1);
        } else {
            setCurrTime(0);
        }
        setCurrAction("Work");
    };

    useEffect(() => {
        /*****************************************************************
         * Listens for action changes (rest, work);
         * Switches the ative currTime conditionally;
         *****************************************************************/
        if (queue && running && !finished) {

            setIsTimerReady(true);
        }
    }, [queue, running, isTimerReady, finished]); 


    

    useEffect(() => {
        let intervalId;
        if (running && queue && isTimerReady) {
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

    }, [
        running,
        countDown,
        countUp,
        queue,
        isTimerReady,
        currTimer
    ])


    const calculateTotals = (id) => {
        // Get the total values of the timer to be removed
        let type = queue[id].type;
        let work = parseInt(queue[id].workSeconds);
        let total;

        if (type === "Tabata") {
            total = work + parseInt(queue[id].restSeconds);
            total = total * parseInt(queue[id].rounds);
        } else if (type === "XY") {
            total = work * parseInt(queue[id].rounds);
        } else {
            total = work;
        }
        return total;
    }

    const populateFinishedVals = (timer) => {

        if (timer.type === "Stopwatch") {
            setCurrTime(parseInt(timer.workSeconds));
        } else {
            if (timer.type === "XY" || timer.type === "Tabata") {
                setCurrRound(parseInt(timer.rounds));
            };

            if (timer.type === "Tabata") {
                setCurrAction("Rest");
            };
            setCurrTime(0);
        };

        setFinished(true);
        timer.finished = true;
        setTotalElapsed(totalTime);



    };

    useEffect(() => {
      if (isTimerReady && queue) {
        // if (queue[currTimer].finished === true) {
        //   populateFinishedVals(queue[currTimer]);
        // }
      }
    })

    const skipTimer = () => {
        setCurrElapsed(0);
        queue[currTimer].finished = true; 
        // The new total to add to elapsed
        // let prevElapsed = parseInt(totalElapsed) - parseInt(currElapsed);
        // let newElapsed = prevElapsed + calculateTotals(currTimer);
        
        if (currTimer + 1 === queue.length) {

            // populate end!!!!!  we've skipped the final one MAKE IT A FUNCTION!!!!!!! so
            // it the timer change goes back and the current timer is finished, populate
            // those vals
            populateFinishedVals(queue[currTimer])
        } else {
            setCurrTimer(currTimer + 1);
            setTotalElapsed(calculateElapsed()); 
            setTimerChange(true);
            
        };

    }

    async function removeTimer(id) {
        /*********************************************************
       * Removes the intended timer from the queue after
       * conditionally updating the currTimer's state.
       **********************************************************/

        if (id === currTimer) {
          setCurrElapsed(0); 
        }; 

         let oldTotal = parseInt(calculateTotals(id));
         let newTotal = parseInt(totalTime) - oldTotal;
         setTotalTime(newTotal);

        // 0 1 2 3
        if (id === 0 && queue.length === 1) {
            setNewVisit(true);
            setRunning(false);
            setFinished(false);
            setWorkoutEnd(false);
            setTotalTime(0);
            setTotalElapsed(0);
            setCurrElapsed(0);
            setIsTimerReady(false);
            setCurrTimer(0);
            setCurrTime(0);
            setCurrAction("Work");
            setQueue(null); 
            setCurrRound(1);
        
    
        };

        

        // active timer = 2
        

        

        if (currTimer === id) {
         
          // If we delete 2, and there's timers after it, keep the current index
          // thereby making active timer 3 (now index 2)
          if (queue.length > currTimer + 1) {
              setCurrTimer(currTimer);
              setTimerChange(true);
      
              
          } else if (queue.length < currTimer + 1) {
              // else, if there's no timers in front, jump back a timer 
              setCurrTimer(currTimer - 1);
              setTimerChange(true);
              
          } else if (queue.length === currTimer + 1) {
            setCurrTimer(0);
          }
      } else if (currTimer < id) {
          setCurrTimer(currTimer);
        
         
      } else if (currTimer > id) {
          setCurrTimer(currTimer - 1);
          
          
      };


        
        if (id > currTimer) {
            console.log('larger');
        } else if (id < currTimer) {
            console.log('smaller')
            let newElapsed = parseInt(totalElapsed) - oldTotal;
            setTotalElapsed(newElapsed);
            
        } else if (id === currTimer) {
          setTimerChange(true);
            if (id === 0) {
              setTotalElapsed(0); 
            } else {
              let newElapsed = parseInt(totalElapsed) - parseInt(currElapsed) - oldTotal;
              setTotalElapsed(newElapsed);
              setTimerChange(true);
            }
            console.log('smae');
           
        }

        // Delete the intended timer and set the update queue to state
        let filteredQueue = queue.filter((_, index) => index !== id);
        setQueue(filteredQueue);

        
       

       
    };

    const calculateElapsed = () => {
      let arr = queue; 
      var elapsed = 0; 
      arr.forEach((timer, index) => {
        if (timer.finished === true) {
          console.log(index);
          let timerElapsed = parseInt(calculateTotals(index)); 
          elapsed += timerElapsed;
        }
      })
      
      
      return elapsed; 
    }

    

   

    return (
        <AppContext.Provider
            value={{
                isReady, setIsTimerReady, 
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
                totalElapsed,
                currElapsed,
                resetTimer,
                skipTimer,
                removeTimer,
                archiveTimer,
                populateInitialVals,
                setTimerChange
            }}>
            {children}
        </AppContext.Provider>

    );
};

export default AppProvider;

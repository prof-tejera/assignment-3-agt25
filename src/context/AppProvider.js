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
    const {timers} = React.useContext(InputContext);

    // Document and fonts state
    const [isReady, setIsReady] = useState(false);

    // The queue is originally filled with the user's configs
    const [queue, setQueue] = React.useState(timers);

    const [newConfigs, setNewConfigs] = React.useState(false);

    const [paused, setPaused] = React.useState(false);
    const [running, setRunning] = React.useState(false);
    const [currAction, setCurrAction] = React.useState("Work");

    const [currRound, setCurrRound] = React.useState(0);

    const [totalElapsed, setTotalElapsed] = React.useState(0);

    const [currElapsed, setCurrElapsed] = React.useState(0);

    const [finished, setFinished] = React.useState(false);

    const [currTime, setCurrTime] = React.useState(0);

    const archived = [];

    const [history, setHistory] = React.useState(archived);


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

    const countDown = useCallback(() => {
        if (paused || finished || !running) 
            return;
        console.log(`counting down!!!! ${currTime}`)
        // call the end one Conditionally handles the time hitting 0:0:0
        if (currTime === 0) {

            if (queue[0].type === "XY") {
                // Handle end of XY
                if (currRound < queue[0].rounds) {
                    setCurrRound(currRound + 1);
                } else {
                    setFinished(true);
                };
            } else if (queue[0].type === "Tabata") {
                // Handle end of Tabata
                if (currAction === "Work") {
                    setCurrAction("Rest");
                } else if (currAction === "Rest") {
                    setCurrRound(currRound + 1);
                } else {
                    setFinished(true);
                };
            } else {
                // Handle end of countdown
                setFinished(true);
            }
        } else {
            currElapsed(currElapsed - 1);
        }

    }, []);

    // Populates the appropriate run / rest values when the currAction changes
    useEffect(() => {
        if (running) {
          let timerType = queue[0].type;
          console.log(timerType);
        }
    }, [currAction, queue, running])

    const countUp = useCallback(() => {
        /*******************************************************
       * Used by "Stopwatch"
       * stars at 0 (currValues)
       * and counts up to the target values (runSecs, etc.)
       ******************************************************/
        if (finished || paused) 
            return;
        
        // Handle the stopwatch hitting the target time values
        if (currTime === queue[0].workSeconds) {
            setFinished(true);

        } else {
            setCurrTime(currTime + 1);
        }

    }, []);

    // Effect for FOUT
    useEffect(() => {
        /************************************************
   * Checks if the fonts are ready; handles FOUT
   ***********************************************/
        document
            .fonts
            .ready
            .then(() => setIsReady(true));
    }, []);

    useEffect(() => {
        

    }, [running, countDown, countUp, queue])

    async function removeTimer(id) {

        // Assuming we don't remove it from the configs
        let filteredQueue = queue.filter((_, index) => index !== id);
        setQueue(filteredQueue);

    };

    async function archiveTimer() {

        if (queue.length !== 0) {
            // Archive the finished timer
            let toArchive = queue[0];
            setHistory([
                ...history,
                toArchive
            ]);

            // Remove the finished timer
            let filteredQueue = queue.filter((_, index) => index !== 0);
            setQueue(filteredQueue);
        };
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
                history,
                paused,
                setPaused,
                running,
                setRunning,

                currAction,
                setCurrAction,
                currRound,
                setCurrRound
            }}>
            {children}
        </AppContext.Provider>

    );
};

export default AppProvider;


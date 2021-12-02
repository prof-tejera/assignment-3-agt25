import React from "react";
import styled from "styled-components";
import { AppContext } from '../context/AppProvider';

// Timers 
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import TimerTile from "../components/generic/Tile";

// Vector
import HeartRate from "../images/grey-heart-rate.svg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 85%;
  align-content: center;
  margin: 0 auto;
  padding-top: 1rem;
`
const Intro = styled.div`
  img {
    margin-top: -1rem;
  };
  ul {
    margin-bottom: 3rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: baseline;
    align-content: center;
    li {
      font-size: 21px;
      color: #50874A;
      :hover {
        color: #33492C;
      };
    };
  };
`;

const Timer = styled.div`
  padding: 0.5rem 3rem 0.5rem 3rem;
`;

const TimerTitle = styled.h1`
  font-size: 77px;
  font-family: Open Sans;
  color: #3679C0;
  margin: 0 auto;
`;


const TimersView = ()  => {

  const {timerType, setTimerType, resetTimer, isReady } = React.useContext(AppContext);
    
    const handleShowTimer = (e) => {
      resetTimer();
      let selection = e.target.id; 
      setTimerType(selection);
    }
  
    const timers = [
      { title: "Stopwatch", C: <Stopwatch /> },
      { title: "Countdown", C: <Countdown /> },
      { title: "XY", C: <XY /> },
      { title: "Tabata", C: <Tabata /> },
    ];

  return (
      <>
     
      {/* Only once the fonts have loaded, show the homepage */}
      {isReady && 
        <Container>
          <Intro>
            <TimerTitle>Timers</TimerTitle>
            <img src={HeartRate} width="350px" alt="Heartbeat line vector"/>
            {/* List each timer */}
            <ul>
              {timers.map((timer) => (
                <li 
                  id={timer.title}
                  key={timer.title}
                  onClick={(timer) => handleShowTimer(timer)}>
                {timer.title}
               </li>
              )   
              )}
            </ul>
          </Intro>

          <TimerTile/>

          <Timer>
            {/* Show only the selected timer */}
            {timerType === "Stopwatch" && 
              <Stopwatch/>
            }
            {timerType === "Countdown" && 
              <Countdown/>
            }
            {timerType === "XY" && 
              <XY/>
            }
            {timerType === "Tabata" && 
              <Tabata/>
            }
          </Timer>
        </Container>
      }
     
    </>
  );
}


export default TimersView;

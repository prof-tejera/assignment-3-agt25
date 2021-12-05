import React from "react";
import styled from "styled-components";
import { formatTime } from "../utils/helpers";
import { AppContext } from '../context/AppProvider';
import { InputContext } from "../context/InputProvider";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';


// Timers npm 
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import TimerTile from "../components/generic/Tile";
import Timer from "../components/generic/Timer";

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
      font-size: 22px;
      color: #3E693A;
      :hover {
        color: #33492C;
      };
    };
  };
`;



const TimerTitle = styled.h1`
  font-size: 77px;
  font-family: Open Sans;
  color: #3679C0;
  margin: 0 auto;
`;

const SmallerTitle = styled(TimerTitle)`
  font-size: 55px;
  

`;

const StyledLink = styled(Link)`

text-decoration: none;
font-size: 24px;
letter-spacing: 1px;
`;


const StartButton = styled.button`
  background-color: white;
  border-radius: 30px;
  padding: 1.10rem 2.25rem;
  border: 5px solid white;
  color: white;
`;

const ActiveTiles = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-items: normal;
align-content: normal;
width: 75%;
margin: auto;
border-bottom: 1px dotted white;
`;

const TileIntro = styled.p`
  color: black;
  font-size: 31px;
  

`;

const TileContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: normal;
  align-content: normal;
  margin: 3rem;
`;

const WorkoutSummary = styled.div`
 
  padding: 1rem;
  margin-top: -3rem;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: normal;
  font-size: 20px;

`;

const SummaryLabels = styled.span`
  text-align: right;
  padding: 1rem;
  color: #48683F;
  
  

`;

const SummaryStats = styled.div`
  text-align: left;
  padding: 0 0.5rem;
  color: #90693A;
  

`;

const QueueWrapper = styled.div`
  
border: 2px dotted white;
border-radius: 300px 300px 0px 0px;
margin-top: 1rem;

`;

const TimersView = ()  => {

  
  const { newVisit, setNewVisit, homePage, setHomePage } = React.useContext(InputContext);
  const { timers } = React.useContext(InputContext);
  const { queue, archiveTimer, removeTimer, history } = React.useContext(AppContext);
  let navigate = useNavigate();
   
  const addWorkout = () => {
    navigate(`/add`);
  }; 

  return (
      <>
     
      {/* The first home page presented to the users */}
      {newVisit &&
  
      <Container>
          <Intro>
            <TimerTitle>Timers</TimerTitle>
            <img src={HeartRate} width="350px" alt="Heartbeat line vector"/>
            <ul>
              <li>Stopwatch</li>
              <li>Countdown</li>
              <li>XY-Intervals</li>
              <li>Tabata</li>
            </ul>

            <StartButton onClick={(e) => {
              setHomePage(false);
              setNewVisit(false);
              addWorkout();
              }}>
              <StyledLink to='/add'>
                Add Workout
              </StyledLink>
            </StartButton>
          </Intro>
    </Container>
    }
     


    {!newVisit &&
      <Container>
           <div>
            {queue.length > 0 &&
            <WorkoutSummary> 
                <SmallerTitle>Timers</SmallerTitle>
             <div>
    
              <SummaryLabels>Workout 0/10</SummaryLabels>
              <SummaryLabels>Current XY</SummaryLabels>
              <SummaryLabels>Next Stopwatch</SummaryLabels>

             </div>

             
              
            </WorkoutSummary>
        }
        <Timer/>
        </div>
      
      </Container>
    
    
    }


     {/* If there's timers already configured, show the active queue */}
     {queue.length > 0 && !newVisit &&
        <QueueWrapper>
        <TileIntro>Active Queue</TileIntro>
        <ActiveTiles>
         {queue.map((timer, index) => (
                <TimerTile key={index} type={timer.type} index={index}
                work={timer.workSeconds} rounds={timer.rounds}
                rest={timer.restSeconds}></TimerTile>
              )   
          )}
      </ActiveTiles>
      <button onClick={(e) => archiveTimer()}>Archive</button>  </QueueWrapper>
    }


    {/* If there's timers that are already finished, show the history queue */}
    {history.length > 0 && !newVisit &&
      <div> 
      <TileIntro>Finished</TileIntro>
      <ActiveTiles>
         {history.map((timer, index) => (
                <TimerTile key={index} type={timer.type} index={index}
                work={timer.workSeconds} rounds={timer.rounds}
                rest={timer.restSeconds}></TimerTile>
  
              )   
          )}
      </ActiveTiles>
      </div>
    }
    
    </>
  );
}


export default TimersView;

import React from "react";
import styled from "styled-components";
import { AppContext } from '../context/AppProvider';
import { InputContext } from "../context/InputProvider";
import { Link, useNavigate } from 'react-router-dom';




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
color: #866A36 !important; 
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



const QueueWrapper = styled.div`
  
border: 2px dotted white;
border-radius: 300px 300px 0px 0px;
margin: 4rem 0 2rem 0;

`;

const AddMoreBtn = styled(StartButton)`
  padding: 1rem;
  font-size: 27px;
  width: 95px;
  height: 95px;
  border-radius: 50%;
  color: goldenrod !important;
  border: 3px dotted #7299E9;
  position: relative;
  top: -25px;
  
`;



const TimersView = ()  => {

  
  const { newVisit, setNewVisit, setHomePage } = React.useContext(InputContext);
  const { queue, archiveTimer, setPaused, setRunning } = React.useContext(AppContext);
  let navigate = useNavigate();
  



   
  const addWorkout = () => {
    setHomePage(false);
    setNewVisit(false);
    navigate(`/add`);
  }; 

  return (
      <>

      {/* The first home page presented to the users */}
      {newVisit || queue.length === 0 ?
  
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
              addWorkout();
              }}>
              <StyledLink to='/add'>
                Add Workout
              </StyledLink>
            </StartButton>
          </Intro>
    </Container> : null
    }
     


    {!newVisit && queue.length > 0 &&
        <div>
           
            <WorkoutSummary> 
                <SmallerTitle>Timers</SmallerTitle>
            <div>
    
              <SummaryLabels>Workout 0/10</SummaryLabels>
              <SummaryLabels>Current XY</SummaryLabels>
              <SummaryLabels>Next Stopwatch</SummaryLabels>

            </div>

            </WorkoutSummary>
            
            <Timer/>
        </div>
      
    
    }


     {/* If there's timers already configured, show the active queue */}
     {queue.length > 0 && !newVisit &&
        <QueueWrapper>
          <AddMoreBtn onClick={(e) => {
            setPaused(true);
            setRunning(false);
            navigate("add");
          }}>
              <StyledLink to='/add'>
                Add
              </StyledLink>
            </AddMoreBtn>
           
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

    
    </>
  );
}


export default TimersView;

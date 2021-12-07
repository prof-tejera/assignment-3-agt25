import React from "react";
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import {BookmarkXFill } from "react-bootstrap-icons";
import { formatTime } from "../../utils/helpers";
import { AppContext } from '../../context/AppProvider';
import { InputContext } from '../../context/InputProvider';


const timerThemes = {
  Stopwatch: "#AAD2E9", 
  Countdown: "#E3C891",
  XY: "#91D8E3", 
  Tabata: "#91E3B2"
}


const TileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #1A1A1A;
  border-radius: 40px 9px 40px 9px;
  width: 200px; 
  height: 150px;
  color: white;
  margin: 1rem;
  border: ${(props) => props.index === props.current ? '2px solid yellow' : 'none'};
`;

const Title = styled.h3`
  margin: -3px;
  padding-top: 3px;
  font-size: 18px !important;
  color: ${({color}) => color ? `${timerThemes[`${color}`]} !important` : "grey"}

`;

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: normal;
  align-content: normal;
  margin: auto;
  color: #C1BEBE;
  div {
    padding: 0.3rem;
  }
`;

const Icon = styled(BookmarkXFill)`
  font-size: 40px;
  color: red;
  position: relative;
  left: 88px;
  top: -10px;
  margin-bottom: -2rem;

`;

const TimerNumber = styled(Col)`
  padding-bottom: 1rem;
  margin: auto;
  font-size: 20px;



`;


const TimerTile = (props) => {
    const { type, work, rounds, rest, index } = props; 
    const {currTimer, removeTimer, paused } = React.useContext(AppContext);
    const { homePage } = React.useContext(InputContext);
    

    return (
      <>
      
          <TileWrapper index={index} current={currTimer}>
            {paused &&  
              <Icon size={40} color="red" onClick={(e) => removeTimer(index)}/> 
            }
            
            <Title color={type}>{type}</Title>
            <StatsWrapper>
              {/******************************
               * Work time for all timers 
               *******************************/}
              <Col>
                <div>Work</div>
                <div>{formatTime(work)}</div>
              </Col>

              {/********************************
               * Rounds for XY and Tabata
               **********************************/}
              {type === "XY" || type === "Tabata" ? 
                <Col>
                  <div>Rounds</div>
                  <div>{rounds}</div>
                </Col> : null }
              
              {/**********************************
               * Rest stats for Tabata
               **********************************/}
              {type === "Tabata" && 
                 <Col>
                  <div>Rest</div>
                  <div>{formatTime(rest)}</div>
               </Col> }
             
            </StatsWrapper>

            <TimerNumber>
             {index + 1}
            </TimerNumber>
          </TileWrapper>
      </>
    )
};

export default TimerTile; 

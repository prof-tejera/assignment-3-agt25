import React from "react";
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import {BookmarkXFill } from "react-bootstrap-icons";


const TileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #1A1A1A;
  border-radius: 35px;
  width: 215px; 
  height: 165px;
  color: white;
`;

const Title = styled.h3`
  margin: -3px;
  padding-top: 3px;

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
  left: 70px;
  top: -10px;
  margin-bottom: -2rem;

`;

const TimerNumber = styled(Col)`
  padding-bottom: 1rem;
  margin: auto;
  font-size: 20px;



`;


const TimerTile = () => {
    
  
    return (
      <>
      
          <TileWrapper>
            <Icon size={40} color="red"/>
            <Title>Tabata</Title>
            <StatsWrapper>
              <Col>
                <div>Work</div>
                <div>4838</div>
              </Col>

              <Col>
                <div>Rounds</div>
                <div>4838</div>
              </Col>
              
              <Col>
                <div>Rest</div>
                <div>4838</div>
              </Col>
            </StatsWrapper>

            <TimerNumber>
              2 / 5
            </TimerNumber>
          </TileWrapper>
      </>
    )
};

export default TimerTile; 

import React from "react";
import styled from "styled-components";
import { AppContext } from '../context/AppProvider';
import { InputContext } from "../context/InputProvider";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import {Row, Col, FormControl} from 'react-bootstrap';



// Timers 
import TimerTile from "../components/generic/Tile";

// Vector
import HeartRate from "../images/grey-heart-rate.svg";

const Container = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  
   

`;

const Title = styled.h1`
  margin-top: 2.5rem;
`;

const Form = styled.form`
  background-color: white;
  height: 500px;
  width: 350px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: flex-start;
  padding: 2rem;
`;

const StyledRow = styled(Row)`



`;

const CustomInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #D3D3D3;
  margin: auto;

`;

const CustomSelect = styled.select`
  background-color: white;
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  display: inline-block;
  width: 100%;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;
  margin: 0;      
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image:
  linear-gradient(45deg, transparent 50%, gray 50%),
  linear-gradient(135deg, gray 50%, transparent 50%),
  radial-gradient(#ddd 70%, transparent 72%);
  background-position:
  calc(100% - 20px) calc(1em + 2px),
  calc(100% - 15px) calc(1em + 2px),
  calc(100% - .5em) .5em;
  background-size:
  5px 5px,
  5px 5px,
  1.5em 1.5em;
background-repeat: no-repeat;
:focus {
  background-image:
    linear-gradient(45deg, white 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, white 50%),
    radial-gradient(gray 70%, transparent 72%);
  background-position:
    calc(100% - 15px) 1em,
    calc(100% - 20px) 1em,
    calc(100% - .5em) .5em;
  background-size:
    5px 5px,
    5px 5px,
    1.5em 1.5em;
  background-repeat: no-repeat;
  border-color: green;
  outline: 0;

}
`;

const Label = styled.div`
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  padding: 0.25rem 0;
  margin-top: 1.7rem;
`;


const AddWorkoutView = ()  => {

  
  const { setNewVisit, timer, setTimerType, workSecs, setWorkSecs, rounds, setRounds, restSecs, setRestSecs } = React.useContext(InputContext);

  const { addTimer } = React.useContext(AppContext);

  const navigate = useNavigate();
  
  const saveTimer = () => {
    let timerObj = formatInput();
    addTimer(timerObj);
    navigate(`/`);
    setNewVisit(false);
    
  }; 

  

  const formatInput = () => {
    if (timer === "Stopwatch" || timer === "Countdown") {
      return {
        type: timer, 
        workSeconds: workSecs
      }
    } else if (timer === "XY") {
      return {
        type: timer, 
        workSeconds: workSecs, 
        rounds: rounds
      }
    } else if (timer === "Tabata") {
      return {
        type: timer, 
        workSeconds: workSecs, 
        rounds: rounds,
        restSeconds: restSecs,
      }
    }
    }
     

    // reset the input settings
  

  return (
      <> 
      
      <Container>
      <Title>Add Your Workout</Title>
      <Form>
    

    {/****************************
     * Select Timer options
     ****************************/}
    <div>
      <Label>Select Timer</Label> 
      <CustomSelect name="timerType" onChange={(e) => setTimerType(e.target.value)}>
          <option default value="Stopwatch">Stopwatch</option>
          <option value="Countdown">Countdown</option>
          <option value="XY">XY</option>
          <option value="Tabata">Tabata</option>
      </CustomSelect>
    </div>

     {/****************************
     * Work seconds
     ****************************/}
    <div>
      <Label>Work Time (s)</Label>
      <CustomInput type="number" required onKeyUp={(e) => 
        setWorkSecs(e.target.value)}/>
    </div>


    {/****************************
     * Rounds for XY and Tabata
     ****************************/}
    {timer === "XY" || timer === "Tabata" ? 
     <div>
      <Label>Rounds</Label>
      <CustomInput type="number" required onKeyUp={(e) => 
        setRounds(e.target.value)}/>
     </div> : null }

     {/****************************
     * Rest seconds for Tabata
     ****************************/}
     {timer === "Tabata" ? 
     <div>
      <Label>Rest Time (s)</Label>
      <CustomInput type="number" required onKeyUp={(e) => 
        setRestSecs(e.target.value)}/>
     </div> : null }
    
    
    <Link to="/" onClick={(e) => saveTimer()}>Add To Queue</Link>
    

     
      </Form>
      </Container>
     
     
    </>
  );
}


export default AddWorkoutView;

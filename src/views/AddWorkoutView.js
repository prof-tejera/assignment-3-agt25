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
  height: 510px;
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

const FormHelper = styled.button`

  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: space-between;

`;


const Label = styled.div`
  float: left;
  font-size: 16px;
  font-weight: 600;
  padding: 0.25rem 0;
  margin-top: 1.2rem;
  display: inline-block;
  
  p {
    display: inline-block;
    font-weight: 400;
    font-size: 14px;
    margin: 0;
    padding-left: 0.5rem;
    color: #B68C2B;
  }
`;


const FormInstructons = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: space-between;

`;

const FormBtn = styled.button`
  background-color: #3bb78f;
  background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
  padding: 1rem;
  font-size: 18px;
  border-radius: 12px;
  border: 2px solid #3bb78f;
  width: auto;
  color: white;
  :hover {
    background-color: black;
    background-image: none;
    color: white;
  }
`;


const AddBtn = styled.button`
  background-color: transparent;
  border: 2px solid green;
  color: green;
  border-radius: 12px;
  font-size: 18px;
  padding: 1rem;
  height: 60px;
  :hover {
    background-color: black;
    color: white;

  }
  
  
`;


const CancelBtn = styled.button`
  height: 60px;
  font-size: 18px;
  background-color: transparent;
  
  color: #1f1f1;
  :hover {
    color: goldenrod;
  }
`;


const BtnsWrapper = styled.div`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: space-between;
align-items: normal;
align-content: normal;
  margin: 1.25rem 0;
  padding: 1rem 0 2rem 0;
  border-bottom: 1px solid grey;

`;


const AddWorkoutView = ()  => {

  
  const { setNewVisit, timer, setTimerType, workSecs, setWorkSecs, rounds, setRounds, restSecs, setRestSecs } = React.useContext(InputContext);

  const { addTimer, timers } = React.useContext(InputContext);
  const { queue, setQueue } = React.useContext(AppContext);

  let btnClicked = null;

  const navigate = useNavigate();
  
  const saveTimer = (e) => {
    
    e.preventDefault();
    let timerObj = formatInput();
    addTimer(timerObj).then((val) => {
      console.log(timerObj[0]);
      let oldQueue = queue;
      oldQueue.push(timerObj)
      setQueue(oldQueue);
      console.log(timers);
      setNewVisit(false);
      if (btnClicked === "Start") {
        navigate(`/`);
      } else if (btnClicked === "Add") {
        setTimerType("Stopwatch");
        setWorkSecs(0);
        setRestSecs(0);
        setRounds(0);
      }
    });
   
    
  }; 

  const checkTimeInput = (e) => {
    let id = e.target.id;
    if (id !== "rounds") {
      // Max of 60 minutes allowed
      if (e.target.value > 3600) {
        e.target.value = 3600; 
      }; 

      if (id === "work") {
        setWorkSecs(e.target.value);
      } else {
        setRestSecs(e.target.value);
      }; 
    } else {
      // Max of 99 rounds allowed 
      if (e.target.value > 99) {
        e.target.value = 99; 
      }; 
      setRounds(e.target.value);
    };
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
      <Form onSubmit={(e) => saveTimer(e)}>
    

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
      <Label>Work Time (s)
      <p>Max: 3600 (s)</p>
      </Label>
     
      <CustomInput type="number" id="work" value={workSecs} required onChange={(e) => {
        checkTimeInput(e)
       }
      } 
        />
    </div>


    {/****************************
     * Rounds for XY and Tabata
     ****************************/}
    {timer === "XY" || timer === "Tabata" ? 
     <div>
      <Label>Rounds
      <p>Max: 99</p>
      </Label>
      <CustomInput type="number" id="rounds" required onKeyUp={(e) => {
        checkTimeInput(e)
       }}/>
     </div> : null }

     {/****************************
     * Rest seconds for Tabata
     ****************************/}
     {timer === "Tabata" ? 
     <div>
      <Label>Rest Time (s)
      <p>Max: 3600 (s)</p>
      </Label>
      <CustomInput type="number" id="rest" required onKeyUp={(e) => {
        checkTimeInput(e)
       }}/>
     </div> : null }
    
    
   

    
  

     
     <BtnsWrapper>

     <AddBtn type="submit" onClick={(e) => btnClicked = "Add"}> Add to Queue</AddBtn>
    <FormBtn type="submit" onClick={(e) => btnClicked = "Start"}> Add and Start</FormBtn>
      </BtnsWrapper>

    


      <CancelBtn onClick={() => navigate("/")}>Cancel</CancelBtn>
     
      </Form>
      </Container>
     
     
    </>
  );
}


export default AddWorkoutView;

import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { AppContext } from '../context/AppProvider';
import { InputContext } from "../context/InputProvider";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import TimerTile from "../components/generic/Tile";

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

const CustomInput = styled.input`
  width: 95%;
  padding-left: 15px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #D3D3D3;
  margin: auto;
  font-size: 16px;

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


const FormInstructons = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: space-between;

`;

const AddStartBtn = styled.button`
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

  
  const { setNewVisit, 
          timer, setTimerType, 
          workSecs, setWorkSecs, 
          rounds, setRounds, 
          restSecs, setRestSecs, 
          addTimer, 
          setBtnClicked } = React.useContext(InputContext);

  const { queue, setQueue, setRunning, running, setPaused } = React.useContext(AppContext);



  let btnClicked = null;
  

  const navigate = useNavigate();
  
  const saveTimer = (e) => {
    e.preventDefault();
    let timerObj = formatInput();
    addTimer(timerObj).then((val) => {
      let oldQueue = queue;
      oldQueue.push(timerObj)
      setQueue(oldQueue);
      setNewVisit(false);

      setTimerType("Stopwatch");
      setWorkSecs("");
      setRestSecs("");
      setRounds("");
      
      if (btnClicked === "Start") {
        // Take the user home 
        setRunning(true);
        setBtnClicked("Start"); 
        setPaused(false);
        
      } else if (btnClicked === "Add") {
        // Allow the user to keep adding other timers
        setBtnClicked("Add");
        
       
      }
    });
  }; 

  useEffect(() => {
    if (running && queue) {
      setPaused(false);
      navigate(`/`);
    }
  }, [running, queue])

  const checkTimeInput = (e) => {
    let id = e.target.id;
    let val = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    if (val.length === 1 && val === 0) {
      val = null;
    }; 
    if (id !== "rounds") {
      // Max of 60 minutes allowed
      if (val > 3600) {
        val = 3600; 
      }; 

      if (id === "work") {
        setWorkSecs(val);
      } else {
        setRestSecs(val);
      }; 
    } else {
      // Max of 99 rounds allowed 
      if (val > 99) {
        val = 99; 
      }; 
      setRounds(val);
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

        <p>Scheduled Timers: {queue.length}</p>
    

    {/****************************
     * Select Timer options
     ****************************/}
    <div>
      
      <Label>Select Timer</Label> 
      <CustomSelect name="timerType" value={timer} onChange={(e) => setTimerType(e.target.value)}>
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
     
      <CustomInput type="number" id="work" value={workSecs} min="1" required onChange={(e) => {
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
      <AddStartBtn type="submit" onClick={(e) => btnClicked = "Start"}> Add and Start</AddStartBtn>
    </BtnsWrapper>

      <CancelBtn onClick={() => navigate("/")}>Go Back</CancelBtn>
     
      </Form>
      </Container>

      {queue.length > 0 && 
        <div>
        <h4>Your Queue</h4>
        <ActiveTiles>
         {queue.map((timer, index) => (
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


export default AddWorkoutView;

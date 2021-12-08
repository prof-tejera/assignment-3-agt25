import React from "react";
import styled from "styled-components";
import { AppContext } from "../../context/AppProvider";

// Components 
import Device from "./Device";
import Button from "./Button";
import TimerScreen from "./TimerScreen";
import ActionButton from "./ActionButton";


const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    width: 85%;
    margin: 0 auto;
    position: relative;
    margin-top: 2.5rem;
    top: -2rem;
`;

const ResetBtn = styled(Button)`
  background: transparent; 
  width: 50px;
  height: 50px;
  font-size: 18px;
  position: relative;
  color: grey;
  margin-bottom: -7.5rem;
  top: 10px;
  :disabled {
    background: transparent !important;
    border: none;
    outline: none;
  };
`;

const Timer = () => {
  
  const { queue, paused, setPaused, finished, resetTimer, skipTimer } = React.useContext(AppContext);


  const handleActionBtn = (e) => {
    console.log(e.target.innerHTML);
    let btnType = e.target.innerHTML;
    if (btnType === "Pause") {
      setPaused(true); 
    } else {
      setPaused(false); 
    }
  }

  
  
    return (
      <div>
      {/* Device component */}
      <Device type="phone" currentTimer={queue[0].type}>
          {/* Timer screen */}
           
              <TimerScreen/> 
                
              {/* Timer screen buttons */}
              
              <div>
                <ButtonsContainer>

                    {/* End button */}
                    <Button outline="2px solid #302F2F" 
                                    outlineOffset="2px"
                                    disabled={finished}
                                    onClick={skipTimer}>
                                    Skip
                    </Button>

                  {/* Reset button */}
                  <ResetBtn onClick={resetTimer}>
                    Reset
                  </ResetBtn>
                  
                  {/* Pause, New, or Start button */}
                    <ActionButton 
                                  type={paused ? "Start" : "Pause"}
                                  disabled={finished}
                                  onClick={(e) => handleActionBtn(e)}> 
                                  {paused ? "Start" : "Pause"}
                    </ActionButton>
                </ButtonsContainer>
              </div>
            

           

        </Device>    
      </div>
    )
};

export default Timer; 

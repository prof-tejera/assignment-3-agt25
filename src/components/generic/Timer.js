import React from "react";
import styled from "styled-components";
import { AppContext } from "../../context/AppProvider";

// Components 
import Device from "./Device";
import Button from "./Button";
import TimerScreen from "./TimerScreen";
import TimerInputs from "./TimerInputs";
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
    top: -6.5rem;
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
  
  const { timerType, resetTimer, endTimer, actionBtn,
          isInputPhase, isTimerShowing,isTimerPaused, 
          isEndEnabled, isTimerEnd, handleActionButton } = React.useContext(AppContext);
  
    return (
      <div>
      {/* Device component */}
      <Device type="phone" currentTimer={timerType}>
          {/* Timer screen */}
            {isTimerShowing  && 
              <TimerScreen/> }
                
              {/* Timer screen buttons */}
              {isTimerShowing && 
              <div>
                <ButtonsContainer>

                    {/* End button */}
                    <Button outline="2px solid #302F2F" 
                                    outlineOffset="2px"
                                    disabled={!isEndEnabled}
                                    onClick={endTimer}>
                                    End
                    </Button>

                  {/* Reset button */}
                  <ResetBtn onClick={resetTimer}>
                    {isTimerPaused || isTimerEnd ? "Reset" : ""}
                  </ResetBtn>
                  
                  {/* Pause, New, or Start button */}
                    <ActionButton 
                                  type={actionBtn === "Pause" ? "Orange" : "Green"}
                                  onClick={handleActionButton}> 
                                  {actionBtn}
                    </ActionButton>
                </ButtonsContainer>
              </div>
            }

            {/* Timer inputs replace the screen during the input phase */}
            {isInputPhase && 
            <TimerInputs/>}

        </Device>    
      </div>
    )
};

export default Timer; 

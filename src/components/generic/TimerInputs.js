import React from "react";
import styled from "styled-components";

import Input from "../generic/Input";
import Button from "../generic/Button";
import ActionButton from "./ActionButton";
import { AppContext } from "../../context/AppProvider";
import { InputContext } from "../../context/InputProvider";


const InputContainer = styled.div`
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    margin-bottom: 4.4rem;
    position: relative;
    width: 85%;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    width: 100%;
    margin: 0 auto;
    position: relative;
    margin-top: 2.5rem;
    top: -6.5rem; 
`;


const TimerInputs = () => {
    
    const { timerType, setTimerType, isInputPhase, setIsTimerStarted, resetTimer } = React.useContext(AppContext);
    
    const { runHours, runMins, runSecs, 
            restHours, restMins, restSecs, 
            targetRounds, 
            isRunEnabled, 
            isRestEnabled, 
            isRoundEnabled, 
            isRestPhase, setIsRestPhase,
            isRunPhase, setIsRunPhase, 
            isRoundPhase, setIsRoundPhase,
            handleTimeInput, handleRoundInput, handleRestInput } = React.useContext(InputContext);

    const handleGoBack = () => {
        /******************************************************
         * Takes the user to the previous phase;
         * if the phase is "run", it resets the timer and 
         * reverts back to the timer screen.  
         ******************************************************/
        if (isRunPhase) {
            // setIsInputPhase(false);
            resetTimer();
            setTimerType(timerType);
        } else if (isRoundPhase) {
            setIsRoundPhase(false);
            setIsRunPhase(true);
        } else if (isRestPhase) {
            setIsRestPhase(false);
            setIsRoundPhase(true);
        }; 
    };

    return (
        <div>
            {isInputPhase && 
                <div>
                    {isRunPhase && 
                    <div>
                    <h3>Intended</h3>
                    <h2>Run Time</h2>
                    <InputContainer>
                        <Input type="runHours" 
                               label="Hour"
                               value={runHours} 
                               onChange={(e) => 
                                 handleTimeInput(e)}/>
                        <Input type="runMinutes" 
                                label="Min"
                                value={runMins} 
                                onChange={(e) => 
                                    handleTimeInput(e)}/>
                        <Input type="runSeconds" 
                                label="Sec"
                                value={runSecs} 
                                onChange={(e) => 
                                    handleTimeInput(e)}/>
                    </InputContainer> 
                    {/*****************************************
                     * Reset and conditional Start / Next button 
                     * depending on the timer type 
                     * ***************************************/}
                    <ButtonWrapper>
                        <Button outline="2px solid #302F2F" 
                                        outlineOffset="2px"
                                        onClick={handleGoBack}>
                                        Back </Button>

                        {timerType === "Stopwatch" || 
                                timerType === "Countdown" ?
                                <ActionButton type="Green" 
                                disabled={!isRunEnabled}
                                onClick={(e) => setIsTimerStarted(true)}> Start
                                </ActionButton> : 
                                <ActionButton onClick={(e) => handleRoundInput(e)}
                                disabled={!isRunEnabled}>
                                                Next
                                </ActionButton>}
                    </ButtonWrapper>
                    </div>
                    }

                    {isRoundPhase && 
                        <div>
                        <h3>Intended</h3>
                        <h2>Intervals</h2>
                        <InputContainer>
                        <Input type="rounds" 
                                    label="Intervals"
                                    value={targetRounds} 
                                    onChange={(e) => handleRoundInput(e)}/>
                        </InputContainer> 

                        {/*******************************************
                         * Rounds "go back" button 
                         * XY gets a "start" button; 
                         * Tabata gets a "next" button
                         * ******************************************/}
                        <ButtonWrapper>
                            <Button outline="2px solid #302F2F" 
                                            outlineOffset="2px" 
                                            onClick={handleGoBack}>
                                            Back
                            </Button>

                            {timerType === "XY" ?
                                <ActionButton type="Green" disabled={!isRoundEnabled}
                                onClick={(e) => setIsTimerStarted(true)}>
                                                Start
                                </ActionButton> : 
                                <ActionButton disabled={!isRoundEnabled}
                                                onClick={(e) => handleRestInput(e)}>
                                                Next
                                </ActionButton>}
                        </ButtonWrapper>
                    </div>
                    }

                    {isRestPhase && 
                        <div>
                            <div>
                    <h3>Intended</h3>
                    <h2>Rest Time</h2>
                    <InputContainer>
                        <Input type="restHours" 
                               label="Hour"
                               value={restHours} 
                               onChange={(e) => 
                                 handleTimeInput(e)}/>
                        <Input type="restMinutes" 
                                label="Min"
                                value={restMins} 
                                onChange={(e) => 
                                    handleTimeInput(e)}/>
                        <Input type="restSeconds" 
                                label="Sec"
                                value={restSecs} 
                                onChange={(e) => 
                                    handleTimeInput(e)}/>
                    </InputContainer> 
                    {/*****************************************
                     * Reset and conditional Start / Next button 
                     * depending on the timer type 
                     * ***************************************/}
                    <ButtonWrapper>
                        <Button outline="2px solid #302F2F" 
                                        outlineOffset="2px"
                                        onClick={handleGoBack}>
                                        Back </Button>

                        <ActionButton type="Green" 
                        disabled={!isRestEnabled} onClick={(e) => setIsTimerStarted(true)}> Start
                        </ActionButton> 
                      
                    </ButtonWrapper>
                    </div>
                    </div>
                    }
                </div>
            }
        </div>
    )
}

export default TimerInputs;


import React from "react";
import styled from "styled-components";
import { AppContext } from "../../context/AppProvider";
import { InputContext } from "../../context/InputProvider";
import { formatTime } from "../../utils/helpers";


const sizeMapping = {
    width: 330,
    height: 620,
};

const ScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #458FEB;
`;

const Screen = styled.div`
   position: relative;
   background: #1A1A1A;
   width: ${(props) => props.width}px;
   height: ${(props) => props.height}px;
   border: 16px ridge #09090A;
   border-radius: 40px;
   -webkit-box-shadow: outset 0px 0px 2px 1px rgba(0,0,0,0.33); 
   box-shadow: outset 0px 0px 2px 1px rgba(0,0,0,0.33); 
`;

const StatusBar = styled.div`
    width: ${(props) => props.width}px;
    height: 45px;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    background-image: linear-gradient(to bottom, #161616, #171717, 
                                      #181818, #191919, #1a1a1a);  
                                
`;

const Notch = styled.div`
    position: relative;
    height: 30px;
    width: 185px;
    background: black;
    margin: 0 auto;
    border-bottom-left-radius: 29px;
    border-bottom-right-radius: 29px;
    border: 1px solid #1f1f1f;
`;

const Speaker = styled.div`
    position: relative;
    top: 9px;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 6px;
    width: 45px;
    background-color: #333333;
    border-radius: 8px;
    box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.2);
`;

const Camera = styled.div`
    position: relative;
    left: 75%;
    top: 3px;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: #333333;
    border-radius: 12px;
    box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.2);
    border: 1px inset #25374E;
`;

const NavWrapper = styled.div`
    background: #323131;
    position: absolute;
    bottom: 0;
    height: 95px;
    width: 100%;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    color: grey;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    align-content: center;
    font-size: 17px;
        
`;


const RunTime = styled.div`
    color: ${({action, started }) => action.includes("Run") && started ? "#C1BEBE" : "grey"};
`;

const RestTime = styled.div`
    color: ${({action, started}) => action.includes("Rest") && started ? "#C1BEBE" : "grey"};
`;




const Device = ({...props}) => {

    const { runHours, runMins, runSecs, 
            restHours, restMins, restSecs, 
            targetRounds } = React.useContext(InputContext);

    const { timerType, currAction, currRound, isTimerStarted } = React.useContext(AppContext);
    
    return (
        <>
        <ScreenWrapper>
            <Screen width={sizeMapping.width} height={sizeMapping.height}>
                <StatusBar>
                    <Notch>
                        <Speaker/>
                        <Camera/>
                    </Notch>
                </StatusBar>
                {props.children}
                <NavWrapper>
                    <RunTime action={currAction} started={isTimerStarted}>
                        {formatTime(runHours)}: {formatTime(runMins)}: {formatTime(runSecs)}
                        <div>
                            Run Time
                        </div>
                    </RunTime>

                    {timerType === "XY" && 
                    <div>
                        {isTimerStarted ? currRound : "0"} / {targetRounds}
                        <div>
                            Rounds
                        </div>
                    </div>
                    }

                    {timerType === "Tabata" && 
                    <div>
                        {isTimerStarted ? currRound : "0"} / {targetRounds}
                        <div>
                            Rounds
                        </div>
                    </div>
                    }

                    {timerType === "Tabata" && 
                     <RestTime action={currAction} started={isTimerStarted}>
                        {formatTime(restHours)}: {formatTime(restMins)}: {formatTime(restSecs)}
                        <div>
                            Rest Time
                        </div>
                    </RestTime>
                    }
                </NavWrapper>
            </Screen>
        </ScreenWrapper>
        </>
    );
    }



export default Device;

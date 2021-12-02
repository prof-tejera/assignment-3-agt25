import React from "react";
import { AppContext } from "../../context/AppProvider";
import { formatTime } from "../../utils/helpers";

import styled from "styled-components";

import ProgressBar from "./ProgressBar";
import ActionsCircle from "./ActionsCircle";

import OperationsCircle from "../../images/operations-circle.svg";
import ProgressRate from "../../images/blue-heart-rate.svg";
import RunningIcon from "../../images/running-icon.svg";
import StretchingIcon from "../../images/stretching-icon.svg";
import RestingIcon from "../../images/resting-icon.svg";
import CongratsIcon from "../../images/congrats-icon.svg";
import PlayIcon from "../../images/play-icon.svg";

import Theme from "../../utils/theme";


const Container = styled.div`
    height: 65%;
    width: 100%;
    margin: 0 auto;
    h3 {
      margin-bottom: 10px;
    }
`;

const RoundTimerWrapper = styled.div`
  height: 260px;
  width: 260px;
  margin: 0 auto;
  border-radius: 50%;
  background-image: url(${OperationsCircle});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: -1;
`;

const TopActionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: flex-start;
    align-content: center;
    margin-bottom: -3.7rem !important;
    width: 70%;
    margin: 0 auto;  
`;

const Time = styled.h1`
    text-align: center;
    width: 100%;
    margin: 0 auto;
    position: relative;
    top: -195px;
    font-size: 70px;
    color: white;
    font-family: league-gothic;
    background-color: #1A1A1A63;
    letter-spacing: 3px;
    font-weight: 300;  
    animation: red 1s, increase 1s;
    animation: ${({playing}) => playing ? "red 1s, increase 1s" : "none"};
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: ${({playing}) => playing ? "running" : "paused"};
    @keyframes red {
        from {
            color: white; 
        }
        to {
            color: #ff2600;
        }
      };
      @keyframes increase {
        from {
          font-size: 70px;
        }
        to {
          font-size: 70.5px;
        }
      };
`;

const ProgressWrapper = styled.div`
    width: 273px;
    margin: 0 auto;
    height: 30px;
    position: relative;
    top: -210px;
    left: 11px;
    img {
      left: -10px;
      position: relative;
    };
    div {
        position: relative;
        top: -22px;
    };
`;

const HelperText = styled.p`
    background-color #82cf9c;
    background-image linear-gradient(315deg, #82cf9c 0%, #77d3ed 77%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-position: 0;
    -webkit-text-size-adjust: none;
    font-weight: 300;
    text-decoration: none;
    white-space: nowrap;
    position: relative;
    text-align: center;
    top: -210px;
    font-size: ${({action}) => action.includes("Rest") || action.includes("Run") ? "23px" : "21px"};
    animation: myAnim 3s ease 0s 1 normal forwards;  
    @keyframes myAnim {
        0%,
        50%,
        100% {
          opacity: 1;
        }
        25%,
        75% {
          opacity: 0.6;
        }
    };
`;

const CircleWrapper = styled.div`
    border-radius: 50%;
    width: 75px;
    height: 75px;
    background: ${(props) => props.background || "transparent"};
`;


const TimersScreen = () => {

  const { timerType, 
            actionHelper, 
            currAction, currHours, currMins, currSecs, currRound, 
            isTimerStarted, isTimerPaused, isEndNear } = React.useContext(AppContext);

        return (
            <>
                <Container>
                    <h3>{timerType}</h3>

                    {/* Top buttons above the timer */}
                    <TopActionsContainer>

                        {/* Left side: Conditional 'Rounds' status used by XY and TABATA */}
                        {timerType === "XY" || timerType === "Tabata" ? 
                            
                            <CircleWrapper background={Theme.dark1}>
                               
                              
                                <ActionsCircle fontSize="50px">
                                <div>{isTimerStarted ? currRound : "0"}</div>
                                </ActionsCircle> 
                             </CircleWrapper> : <CircleWrapper/> }

                        {/* Right side: Icon status used by all timers */}
                        <CircleWrapper background={Theme.dark1}>
                            <ActionsCircle border="1px dotted #1C91F2"> 
                            {currAction === "Run" &&  isTimerStarted && !isTimerPaused 
                                && <img src={RunningIcon} alt="Running Stick Figure"/>}

                            {currAction === "Run" && !isTimerStarted  && !isTimerPaused 
                                && <img src={StretchingIcon} alt="Stretching Stick Figure"/>}

                            {currAction === "Rest" && !isTimerPaused 
                                && <img src={RestingIcon} alt="Standing Stick Figure"/>}

                            {currAction === "Congrats" && !isTimerPaused 
                                && <img src={CongratsIcon} alt="Standing Stick Figure"/>}

                            {isTimerPaused && <img src={PlayIcon} alt="Standing Stick Figure"/>}

                            </ActionsCircle>
                        </CircleWrapper>
                    </TopActionsContainer>

                    {/* Round timer wrapper and timer */}
                    <RoundTimerWrapper/>
                        <Time playing={isEndNear}> 
                            {formatTime(currHours)}: {formatTime(currMins)}: {formatTime(currSecs)}
                        </Time>

                    {/* Progress bar and status value (run, rest or the initial "stretch") */}
                    <ProgressWrapper action={currAction}>
                        <img width="260px" src={ProgressRate} alt="Progress Rate"></img>
                        <div>
                            <ProgressBar/>
                        </div>
                    </ProgressWrapper>  

                    <HelperText action={currAction}>{actionHelper}</HelperText>       
                </Container>   
            </>
        );
    
};

export default TimersScreen;


import React from "react";
import styled from "styled-components";
import { AppContext } from "../../context/AppProvider";
import { InputContext } from "../../context/InputProvider";
import { formatTime } from "../../utils/helpers";


const sizeMapping = {
    width: 350,
    height: 580,
};


const ScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #458FEB;
  position: relative;
  
  
`;

const Screen = styled.div`
   position: relative;
   background: #1A1A1A;
   width: ${(props) => props.width}px;
   height: ${(props) => props.height}px;
   border-radius: 45px;
   padding-top: 30px;
   border: 12px solid black;
`;



const NavWrapper = styled.div`
    background: #323131;
    position: absolute;
    bottom: 0;
    height: 75px;
    width: 100%;
    border-bottom-left-radius: 45px;
    border-bottom-right-radius: 45px;
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
    color: ${({action, started }) => action.includes("Work") && started ? "#A09D9D" : "grey"};
`;

const RestTime = styled.div`
    color: ${({action, started}) => action.includes("Rest") && started ? "#A09D9D" : "grey"};
`;


const BottomStats = styled.div`

    font-size: 15px;
    position: relative;
    top: -180px;
    z-index: 1;
    left: -3px;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    div {
        padding: 0 2rem;
        color: #A09D9D;
        span {
            color: #9CCCC9D1;
            font-size: 18px;
        }
        
    }

    
`;

const TotalTime = styled.span`
    text-align: right;
    font-size: 20px !important;

`;

const ElapsedTime = styled(TotalTime)`
    text-align: right !important;
   
   
`;






const Device = ({...props}) => {

   

    const { queue, currAction, currRound, running, currTimer } = React.useContext(AppContext);
    const { totalTime } = React.useContext(InputContext)


    const workTime = queue[currTimer].workSeconds; 
    const timerType = queue[currTimer].type; 
    const targetRounds = queue[currTimer].rounds;
    const restTime = queue[currTimer].restSeconds;
    
    return (
        <>

        
       
        <ScreenWrapper>
           
            <Screen width={sizeMapping.width} height={sizeMapping.height}>
           
                {props.children}
                <BottomStats>
                    <div> <ElapsedTime>00:00 </ElapsedTime>
                        <div>Elapsed</div>
                    </div>
                    <div> <TotalTime> {formatTime(totalTime)} </TotalTime>
                        <div>Total</div>
                    </div>
                   
                </BottomStats>
                <NavWrapper>
                    <RunTime action={currAction} started={running}>
                        {formatTime(workTime)}
                        <div>
                            Work Time
                        </div>
                    </RunTime>

                    {timerType === "XY" && 
                    <div>
                        {running ? currRound : "0"} / {targetRounds}
                        <div>
                            Rounds
                        </div>
                    </div>
                    }

                    {timerType === "Tabata" && 
                    <div>
                        {running ? currRound : "0"} / {targetRounds}
                        <div>
                            Rounds
                        </div>
                    </div>
                    }

                    {timerType === "Tabata" && 
                     <RestTime action={currAction} started={running}>
                       {formatTime(restTime)}
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

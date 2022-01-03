import React from "react";
import styled from "styled-components";
import { AppContext } from "../../context/AppProvider";
import { InputContext } from "../../context/InputProvider";


const ProgressContainer = styled.div`
    width: 246px; 
    text-align: center;
    progress {
      height: 6px;
      width: 250px;
    };
`;

const ProgressBar = () => {

  const { totalElapsed } = React.useContext(AppContext);
  const { totalTime } = React.useContext(InputContext);

  return (
    <>
      <ProgressContainer>
        <progress value={totalElapsed} max={totalTime}></progress>
      </ProgressContainer>  
    </>
  );
};

export default ProgressBar;

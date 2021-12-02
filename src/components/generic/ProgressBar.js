import React from "react";
import styled from "styled-components";
import { AppContext } from "../../context/AppProvider";


const ProgressContainer = styled.div`
    width: 246px; 
    text-align: center;
    progress {
      height: 6px;
      width: 250px;
    };
`;

const ProgressBar = () => {

  const { progressTime, currProgress } = React.useContext(AppContext);
  
  return (
    <>
      <ProgressContainer>
        <progress value={currProgress} max={progressTime}></progress>
      </ProgressContainer>  
    </>
  );
};

export default ProgressBar;

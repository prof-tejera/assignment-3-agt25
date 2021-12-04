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

  const { queue, currAction } = React.useContext(AppContext);
  
  return (
    <>
      <ProgressContainer>
        <progress value={14} max={currAction === "Work" ? queue[0].workSeconds : queue[0].restSeconds}></progress>
      </ProgressContainer>  
    </>
  );
};

export default ProgressBar;

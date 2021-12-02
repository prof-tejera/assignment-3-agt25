import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Redirect } from "react-router-dom";
import styled from "styled-components";
import AppProvider from './context/AppProvider';
import InputProvider from './context/InputProvider';


// Views 
import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import DesignView from "./views/DesignView";
import AddWorkoutView from "./views/AddWorkoutView";

// Vectors
import Background from "./images/background.png";


const Container = styled.div`
  background-image: url(${Background});
  background-repeat: none;
  background-position: center;
  background-size: cover;
  height: 100vh;
  overflow: auto;
  text-align: center;
  ul {
    text-align: right;
    list-style: none;
    padding-right: 2rem;
  };
  li {
    display: inline-block;
    padding: 0.1rem 1rem;
    color: #414141; 
  };
  a {
    color: #414141;
  }
  a:hover {
    color: #C78233;
  };
  h3 {
    font-family: Roboto !important;
    font-size: 23px;
    color: white;
    font-weight: 400;
    letter-spacing: 1px;
    margin-top: 9px;
  };
  h2 {
    font-family: Roboto !important;
    font-size: 35px;
    color: white;
    font-weight: 400;
    letter-spacing: 1px;
    margin-top: -4px;
  };
  
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #191919;
  font-size: 1.2rem;
  font-weight: 500;
  &.active {
    color: #976730;
  }
`;


function App() {
  return (
    <Container>  
       <Router>
      <InputProvider>
      <AppProvider>    
     
        <nav>
          <ul>
            <li>
              <StyledLink to="/">Timers</StyledLink>
            </li>
            <li>
              <StyledLink to="/design">Design</StyledLink>
            </li>
            <li>
              <StyledLink to="/docs">Documentation</StyledLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" exact element={<TimersView />} />
          <Route path="/add" exact element={<AddWorkoutView />} />
          <Route path="/design" exact element={<DesignView />} />
          <Route path="/docs" exact element={<DocumentationView />} />
         
        </Routes>
     
      </AppProvider>   
      </InputProvider>
      </Router>  
      
    </Container>
  );
}

export default App;

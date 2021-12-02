import React from 'react';
import styled from 'styled-components';

import ActionsCircle from '../components/generic/ActionsCircle';
import HeartRate from "../images/grey-heart-rate.svg";

import Theme from "../utils/theme";


const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  align-content: flex-start;
  text-align: left;
  border-bottom: 1px dotted #C1BEBE;
  padding-bottom: 2rem;
  h4 {
    color: #545454;
    font-weight: 600;
    font-size: 25px;
    border-top: 1px dotted white;
    border-bottom: 1px dotted white;
  }
  
`;

const Header = styled.div`
  text-align: center;
  margin: auto;
  h1 {
    color: #1A1A1A;
    font-size: 55px;
  }
  h2 {
    margin-top: -4.5rem !important;
    color: #A09D9D !important;
  }
  img {
    position: relative;
    top: -3.2rem;
  }
`;

const BrandContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  align-content: flex-start;
  text-align: left;
  padding-bottom: 2rem;
  div {
    padding: 0.5rem;
    color: black;
    font-weight: 600;
    span {
      font-weight: 300;
    }
  }
`;

const OpenSansH1 = styled.h1`
  font-family: Open Sans; 
  font-size: 50px;

`;

const OpenSansH2 = styled.h2`
  font-family: Open Sans; 
  font-size: 30px;
  color: black !important;
`;

const LeagueGothicH1 = styled.h1`
  font-family: league-gothic; 
  font-size: 55px;
  font-weight: 400;
`;

const RobotoH1 = styled.h1`
  font-family: Roboto; 
  font-size: 50px;
  font-weight: 400;
`;

const RobotoH3 = styled.h3`
  font-family: Roboto; 
  font-size: 23px;
  font-weight: 300;
  color: black !important;
`;

const SecondaryContainer = styled(Container)`
  padding: 1.5rem 0 1.5rem 0;
  div {
    padding: 1rem;
    color: black;
    font-weight: 600;
    span {
      font-weight: 300;
    }
  }
`;

const GreysContainer = styled(SecondaryContainer)`

`;


const ExplanationsHeader = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 2rem 3rem 2rem 3rem;
  background: white;
  h2 {
    margin-top: -1rem;
    padding: 2px;
    color: #303030 !important;
    border-top: 1px dotted #C1BEBE;
    border-bottom: 1px dotted #C1BEBE;
  }
`;

const Explanation = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  background: white;
  line-height: 1.5rem;
  div {
    padding: 2rem;
    max-width: 55vw;
  };
  h2 {
    color: black !important;
  };
  h3 {
    color: #302F2F !important;
    padding: 2.5rem 0 1rem 0;
  }
`;

const UIExplainedHeader = styled(Explanation)`
  border-top: 1px dashed ${Theme.light2};
  line-height: 50px;
  margin-bottom: -3rem;
`;

const UIExplained = styled(Explanation)`
`;




const DesignView = () => {
  
  return (
    <>
      <Header>
        <h1>UI  /  UX </h1>
        <img src={HeartRate} alt="Heart beat line"/>
        <h2>explained</h2>
      </Header>

      <Container>
      {/* Typeface display half */}
        <div>
        <h4> \ typeface</h4>
        <OpenSansH1>Open Sans</OpenSansH1>
        <LeagueGothicH1>League Gothic</LeagueGothicH1>
        <RobotoH1>Roboto</RobotoH1>
        {/* Headings display */}
        <div>
          <LeagueGothicH1>heading 1</LeagueGothicH1>
          <OpenSansH2>heading 2</OpenSansH2>
          <RobotoH3>heading 3</RobotoH3>
          {/* Paragraph display */}
          <b>Paragraph</b>
          <p>Donec rutrum congue leo eget malesuada. 
            <br></br> 
            Vestibulum ac diam sit amet quam vehicula.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing 
            <br></br> 
            and typesetting industry. Lorem Ipsum has been the 
            <br></br>
            industry's standard dummy text ever since the 1500s, 
            <br></br>
            when an unknown printer took a galley of type and 
            <br></br>
            scrambled it to make a type specimen book. 
          </p>
        </div>
      </div>
    

      <div>
      <h4> \ color</h4>
      {/*****************************
       * Brand (blue) color showcase
       ****************************/}
      <RobotoH3>Brand</RobotoH3>
      <BrandContainer>
        <div>
          <ActionsCircle background="#588DE4"/>  
          <div>brand
            <br></br>
            <span>#588DE4</span>
          </div>
        </div>
        </BrandContainer>

      {/*************************
       * Secondary colors showcase
       **************************/}
        <RobotoH3>Secondary</RobotoH3>
        <SecondaryContainer>
        <ActionsCircle background="#94D769" size="45px"/>  
          <div>accent1
            <br></br>
            <span>#94D769</span>
          </div>

          <ActionsCircle background="#142F1B" size="45px"/>  
          <div>neutral1
            <br></br>
            <span>#142F1B</span>
          </div>
        </SecondaryContainer>

        <SecondaryContainer>
          <ActionsCircle background="#E19F5A" size="45px"/>  
          <div>accent2
            <br></br>
            <span>#E19F5A</span>
          </div>

          <ActionsCircle background="#3B2615" size="45px"/>  
          <div>neutral2
            <br></br>
            <span>#3B2615</span>
          </div>
        </SecondaryContainer>


      {/**************************
       * Grey colors showcase
       **************************/}
        <RobotoH3>Greys</RobotoH3>
        <GreysContainer>
          <ActionsCircle background="#FFFFFF" size="45px"/>  
            <div>light1
              <br></br>
              <span>#FFFFFF</span>
            </div>

            <ActionsCircle background="#1A1A1A" size="45px"/>  
            <div>dark1
              <br></br>
              <span>#1A1A1A</span>
            </div>
        </GreysContainer>

        <GreysContainer>
          <ActionsCircle background="#C1BEBE" size="45px"/>  
            <div>light2
              <br></br>
              <span>#C1BEBE</span>
            </div>

            <ActionsCircle background="#303030" size="45px"/>  
            <div>dark2
              <br></br>
              <span>#303030</span>
            </div>
        </GreysContainer>

        <GreysContainer>
          <ActionsCircle background="#A09D9D" size="45px"/>  
          <div>light3
            <br></br>
            <span>#A09D9D</span>
          </div>

          <ActionsCircle background="#302F2F" size="45px"/>  
          <div>dark3
            <br></br>
            <span>#302F2F</span>
          </div>
        </GreysContainer>
      </div>
    </Container>

      {/***********************************
       * Branding / Color Psychology header
       *************************************/}
      <ExplanationsHeader>
        <div>
          <RobotoH1>Branding</RobotoH1>
          <h2> \ Color Psychology </h2>
        </div>
      </ExplanationsHeader>

      <Explanation>
        {/******************
         * Blue section 
         *****************/}
        <div>
          <h2>Blue.</h2>
          <article>
              <p>
                When I think of fitness and exercise, 
                I think of action — be it dreadful or freeing. Blue represents freedom, 
                inspiration, confidence, and the element of water. Exercise helps replenish our bodies, 
                releases endorphins, and requires constant hydration. 
                Blue inspires us to explore: the depth and the mystery of the ocean; 
                the sense of freedom when staring at blue skies — 
                birds in action and clouds that serve as a reminder that the planet is constantly moving, 
                that nothing is ever still. 
              </p>
              <p>
                Blue elicits action. Yet, due to its calming hues, 
                blue motivates without being as overwhelming as the passionate yet dangerous red, 
                or the vibrant yellow. Let’s face it; a lot of us exhaust our being through the mental 
                gymnastics that can play out when deciding to go for a run or exercise. 
                The last thing a user needs to face is an overwhelming interface.
            </p>
            <p>
              To further motivate, a centered heartbeat line centers the interface. It’s a subtle way of 
              reminding the user about the health benefits when dreading to “start” their fitness activity.
            </p>
            <p>
              The more inclined they are to exercise, the more likely that they are to use the app.
            </p>
          </article>
        </div>

        {/*********************
         * Green Section
         ********************/}
        <div>
          <h2>Green.</h2>
          <article>
            <p>
              Like blue, green is considered a refreshing color. 
              It signifies health and nature. Some users exercise in enclosed spaces, 
              sometimes yearning for beautiful, natural sights; 
              others take on the curves and edges mother nature offers. 
              It is no wonder that many treadmill machines provide virtual scenery for their users. 
            </p>
            <p>
              According to 
              <a href="https://www.forbes.com/sites/simonchandler/2020/06/16/virtual-reality-makes-exercise-more-enjoyable-and-less-tiring-study-finds/?sh=30a44d64c156">
              Forbes</a>, 
              virtual scenery makes exercise more enjoyable. 
              Extracting from two of nature’s primary colors, I decided on the combination of 
              blue for the brand identity, 
              and hints of green to symbolically convey nature. 
              Green, also representing action, is intuitively incorporated on the “Start” button. 
            </p>
          </article>
        </div>
      </Explanation>
        

      <Explanation>
        {/********************
         * Orange section
         *********************/}
        <div>
          <h2>Orange.</h2>
          <article>
            <p>
              Orange is complementary to blue. Since the app’s blues and greens are light and vibrant, 
              I incorporated a desaturated orange-brown color combo for the "Pause" button.
            </p>
            <p>
              Historically, red is most used on destructive functions. 
              However, the “Pause” button is not destructive, as the user can resume the timer. 
              Additionally, red is a color that is often associated with food brands 
              (McDonald's, Wendy’s, In-n-Out, etc.). 
              Red makes you feel hungry — not the optimal solution for a fitness app. 
              But orange, too, can also be found across many food brands. 
              For this reason, the app’s subtle orange-brown deviates from the conventional, 
              hunger-inducing yellow-orange hue.
            </p>
          </article>
        </div>

        {/*********************
         * Greys Section
         *********************/}
        <div>
          <h2>Greys.</h2>
          <article>
            <p>
              Various shades of grey, from almost black to a faint white, 
              make up the background of the app. 
              For the majority of users, dark mode is easiest on the eyes. 
              But a pure black background with pure white text causes eye strain. 
              For a pleasing interface, I’ve avoided high contrast shades.
              <br></br>
            </p>
            <h3>All of the foreground / background combinations used are WCAG AA compliant.</h3> 
          </article>
        </div>
      </Explanation>

      <UIExplainedHeader>
        <div>
        <RobotoH1>UX / UI Placement</RobotoH1>
          <RobotoH3>* * * * *</RobotoH3>
          </div>
      </UIExplainedHeader>

      <UIExplained>
        <div>
          <h2>the interface explained</h2>
          <article>
            <p>
            Most notably, a round circle encapsulates the Timer Screen component. 
            The circle, especially when paired with the top-right-side 'helper action icon', 
            and the top-left-side 'current rounds' area, help resemble a physical stopwatch device.
            </p>
            <p>
              The progress bar, a heartbeat line that is part of the brand identity, 
              helps cement the notion the app's purpose, beyond having just timer functionality, is a fitness app. 
              Stopwatches and countdowns are used for all purposes. 
              Thus, I tried to incorporate elements, like the running or resting stick figure icon, 
              that <i> scream </i> fitness.
            </p>
          </article>
          </div>
      </UIExplained>

      <UIExplained>
        <div>
          <h2>the user experience</h2>
          <article>
            <p>
              To help the user focus on the most important detail, I reserved the boldest, 
              largest heading for the actual time. Your eyes immediately focus on the largest
              element. Exercising can be messy. Focusing on the minutia of the UI, 
              when your only objective is to keep exercising, 
              is not ideal. 
            </p>
            <p>
              During a timer activity, a user is most concerned with the time and the actual on-going activity.
              The helper icon, a resting or running stick figure, guides the user. 
              Helper text ("Run", "Rest", or "Start New") also serves to direct the user. 
            </p>
            <p>
                The actions buttons are in proximity to the focal point of the app, the time.
                There's enough top padding that the two areas appear separated, but still 
                easily accessibly.
            </p> 
            <h3>coming soon.</h3>
            <p>
                Notably, there's a bit more bottom padding below the actions buttons than there is at the top.
                As we work on the functionality of the app, 
                I plan to optionally do a history log component below, similar to that on the iPhone, for XY and Tabata.
                For the sake of uniformity, I've placed the buttons on the same position for all of the timers. 
                There's enough space for a history component for the two timers, without it appearing "empty" on the Stopwatch
                and Countdown component. 
            </p>
            <p>
                I also plan on adding a functioning nav-bar inside the grey div at the bottom of the screen. 
                But because the directions ask for all the timers to be rendered on the TmersView, 
                I abstained from implementing it at this point.
            </p>
          </article>
          </div>
      </UIExplained>
    </>
  )
}
export default DesignView; 

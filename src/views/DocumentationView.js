import React from "react";
import styled from "styled-components";

// Generic components 
import DocumentComponent from "../components/documentation/DocumentComponent";
import Loading from "../components/generic/Loading";
import ActionButton from "../components/generic/ActionButton";
import ActionsCircle from "../components/generic/ActionsCircle";
import Button from "../components/generic/Button";
import Input from "../components/generic/Input";
import TimerTile from "../components/generic/Tile";

// Vectors 
import HeartRate from "../images/blue-heart-rate.svg";
import RunningIcon from "../images/running-icon.svg";




const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: rgb(22,33,56);
  background: linear-gradient(180deg, #14161D 2%, rgba(18,18,18,1) 100%);
  color: white;
  overflow-x: hidden;
`;

const Title = styled.div`
  font-size: 2.2rem;
  padding: 3rem;
  margin-bottom: -2.2rem;
  width: 100vw;
  font-family: Open Sans;
  img {
    padding: 0.5rem;
    margin-bottom: 0.7rem;
    margin-top: -0.2rem;
  }
  h2 {
    margin-top: -1rem;
    font-size: 2rem !important;
    color: #B5B1B2 !important;
  }
`;


const Documentation = () => {

  return (
    <Container>
      <div>
        
        {/*********************
         * Documentation title
         * *******************/}
        <Title>Documentation
          <div>
            <img src={HeartRate} width="225px" alt="Heartbeat Line"/>
          </div>
        </Title>
      
      
        {/***************************
         * PropTypes start 
         ***************************/}
        <DocumentComponent
          title="Loading spinner "
          component={<Loading />}
          propDocs={[
            {
              prop: "size",
              description: "Changes the size of the loading spinner",
              type: "string",
              defaultValue: "medium",
            },
          ]}
        />

      <DocumentComponent
          title="Action Button"
          component={<ActionButton type="Start">Start</ActionButton>}
          propDocs={[
            {
              prop: "disabled",
              description: "Enables / disables the action button",
              type: "boolean",
              defaultValue: "false",
            },
            {
              prop: "type",
              description: "Renders a green start button or an orange pause button",
              type: "string, oneOf(['Green', 'Orange'])",
              defaultValue: `"Green"`,
            },
            {
              prop: "onClick",
              description: `When the button is clicked, proceed to the next action depending on the 
              button's actual label (e.g., Start New, Pause, Start, etc.)`,
              type: `function`,
              defaultValue: `none`,
            },
            {
              prop: "onKeyDown",
              description: `Triggers the reset function if the action button's label is "Reset"`,
              type: `function`,
              defaultValue: `none`,
            },
          ]}
        />

        <DocumentComponent
            title="Actions Circle"
            component={<ActionsCircle border="1px dotted #648BDD" size="80px">
                <img src={RunningIcon} alt="Running stick figure"/>
            </ActionsCircle>
            }
            propDocs={[
              {
                prop: "border",
                description: "Adds a border to the circular div",
                type: "string",
                defaultValue: `"none"`,
              },
              {
                prop: "background",
                description: "Changes the background color of the circle",
                type: "string",
                defaultValue: `"#1a1a1a"`,
              },
              {
                prop: "color",
                description: "Changes the text or icon color",
                type: "string",
                defaultValue: `"#458FEB"`,
              },
              {
                prop: "fontSize",
                description: "Changes the font size",
                type: "string",
                defaultValue: `"50px"`,
              },
              {
                prop: "fontWeight",
                description: "Changes the font weight",
                type: "number",
                defaultValue: "600",
              },
              {
                prop: "size",
                description: "Changes the height and width of the circle",
                type: "string",
                defaultValue: `"70px"`,
              },
          ]}
        />

        <DocumentComponent
          title="Button"
          component={<Button outline="2px solid #302F2F">Reset</Button>}
          propDocs={[
            {
              prop: "border",
              description: "Adds a border to the button",
              type: "string",
              defaultValue: `"none"`,
            },
            {
              prop: "background",
              description: "Changes the background color of the button",
              type: "string",
              defaultValue: `"#302F2F"`,
            },
            {
              prop: "color",
              description: "Changes the text color",
              type: "string",
              defaultValue: `"#C1BEBE"`,
            },
            {
              prop: "disabled",
              description: "Enabled / disabled the button",
              type: "boolean",
              defaultValue: "false",
            },
            {
              prop: "fontSize",
              description: "Changes the font size",
              type: "string",
              defaultValue: `"19px"`,
            },
            {
              prop: "fontWeight",
              description: "Changes the font weight",
              type: "number",
              defaultValue: "200",
            },
            {
              prop: "outline",
              description: "Defines an outline color for the button",
              type: "string",
              defaultValue: `"#302F2F"`,
            },
            {
              prop: "outlineOffset",
              description: "Defines the offset value for the outline of the button",
              type: "string",
              defaultValue: `"2px"`,
            },
            {
              prop: "size",
              description: "Defines the height and width of the button",
              type: "string",
              defaultValue: `"70px"`,
            },
            {
              prop: "onClick",
              description: `When the button is clicked, proceed to the next action depending on the 
              button's actual label (e.g., Reset, Go Back, etc.)`,
              type: `function`,
              defaultValue: `none`,
            },
          ]}
        />

        
        <DocumentComponent
            title="Input"
            component={<Input value="00" 
            onChange={(e) => console.log(`Your input cannot register
            in the document component. 
            The input field needs a component that has state variables`)}/>}
            propDocs={[
              {
                prop: "value",
                description: "Determines the autofilled input value",
                type: `string || number`,
                defaultValue: `""`,
              },
              {
                prop: "label",
                description: "Specifies the label above the input field",
                type: `string, oneOf({"Hour", "Min", "Sec", "Intervals"})`,
                defaultValue: `"Hour"`,
              },
              {
                prop: "type",
                description: "Specifies the value type of the input field",
                type: `string, oneOf(["runHours", "runMinutes", "runSeconds", 
                "rounds",
                "restHours", "restMinutes", "restSeconds"])`,
                defaultValue: `"runHours"`,
              },
              {
                prop: "onChange",
                description: `Once the input field changes, the event target value is registed; 
                the parent then updates its own state values based on the input field type`,
                type: `function`,
                defaultValue: `none`,
              },
          ]}
        />

        <DocumentComponent
            title="Tile"
            component={<TimerTile type="Tabata" rounds="2" rest="15" work="30" index={0}
            />}
            propDocs={[
              {
                prop: "type",
                description: "Determines the kind of timer type configured",
                type: `string`,
                defaultValue: `"Stopwatch"`,
              },
              {
                prop: "work",
                description: "Specifies the work seconds configured",
                type: `string || number`,
                defaultValue: `"none"`, 
              },
              {
                prop: "rounds",
                description: "Specifies the rounds configured",
                type: `string || number`,
                defaultValue: `"none"`,
              },
              {
                prop: "rest",
                description: "Specifies the rest seconds configured",
                type: `string || number`,
                defaultValue: `"none"`,
                
              },
              {
                prop: "index",
                description: "Specifies the index of the timer in the queue",
                type: `string || number`,
                defaultValue: `"0"`,
              }
          ]}
        />

      </div>
    </Container>
  );
}


export default Documentation;

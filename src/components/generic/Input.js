import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Row } from "react-bootstrap";


const InputField = styled.input`
  z-index: 1; 
  height: ${(props) => props.height || "80px"};
  width: ${(props) => props.width || "70px"};
  background-color: ${(props) => props.background || "#302F2F"};
  color: ${(props) => props.color || "#C1BEBE"};
  border: ${(props) => props.border || "none"};
  font-size: ${(props) => props.fontSize || "70px"};
  font-weight: ${(props) => props.fontWeight || "200"};
  outline: ${(props) => props.outline || "none"};
  outline-offset: ${(props) => props.outlineOffset || "none"};
  text-align: center;
  text-align: -webkit-center !important;
  margin: 0 auto;
  font-family: league-gothic;
  letter-spacing: 4px;
  margin: 0.4rem;
  line-height: 1 !important; 
`;

const InputWrapper = styled.div`
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
    align-self: auto;
    order: 0;
    z-index: 1; 
    input {
        text-align: center !important;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: normal;
    align-items: center;
    align-content: center;
    margin: 0.5rem 0 2rem 0;
`;


const Input = ({...props}) => {
    
        const { type, label, value } = props;
        return (
            <>
                <Container>
                    <InputWrapper>
                        {/* Input label row */}
                        <Row>
                        <label htmlFor={label}>{label}</label> 
                        </Row>
                        {/**************
                         * Input field accepts 2 chars max;
                         * 0-9 characters only;
                         * I tries using a number input with a max and a min;
                         * but for some reason, the max and mix did not work. 
                         * So, I used a text input field since it was easier to style.
                         * The number input field had these annonying incrementation +- 
                         * signs which took up white space even when I disabled them and set 
                         * their webkit margins / display to none and 0. 
                         * **************/}
                        <Row>
                            <InputField 
                                value={value ? value : "0"} 
                                id={`${type}`} 
                                maxLength="2" 
                                type={type} 
                                onChange={(e) => props.onChange(e.target)} 
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');}}/>
                        </Row>
                     </InputWrapper>  
                </Container>
            </>
        );
};


Input.propTypes = {
    type: PropTypes.oneOf([
        "runHours", "runMinutes", "runSeconds", 
        "rounds",
        "restHours", "restMinutes", "restSeconds"
    ]),
    label: PropTypes.oneOf(["Hour", "Min", "Sec", "Intervals"]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChange: PropTypes.func
};

Input.defaultProps = {
    type: "runHours",
    label: "Hour",
    value: "",
};


export default Input;
import PropTypes from "prop-types";
import styled from "styled-components";


const defaultColors = {
   dark3: "#302F2F",
   light2: "#C1BEBE",
   disabledText: "#A09D9D"
}

const Button = styled.button`
  border-radius: 50%;
  border: ${(props) => props.border};
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  disabled: ${(props) => props.disabled};
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  outline: ${(props) => props.outline};
  outline-offset: ${(props) => props.outlineOffset};
  text-align: center;
  padding: 0;
  margin: 0 auto;
  font-family: Open Sans;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  :disabled {
    background: ${defaultColors.dark3};
    color: ${defaultColors.disabledText};
    outline: 2px solid ${defaultColors.dark3};
  }
    :hover {
      border: 1px solid #1B457929;
      cursor: pointer;
  }
  :active {
      transform: scale(1.05) translate(0px, 0px);
  }
  ::after {
      z-index: -1;
      transition: all .5s;
  }
  :hover::after {
      transform: scale(0.5) translate(-1px, 0px);
      
  }  
`;


Button.propTypes = {
  border: PropTypes.string,
  background: PropTypes.string, 
  color: PropTypes.string,
  disabled: PropTypes.bool,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.number,
  outline: PropTypes.string,
  outlineOffset: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  border: "none",
  background: defaultColors.dark3,
  color: defaultColors.light2,
  disabled: false,
  fontSize: "19px",
  fontWeight: 200,
  outline: defaultColors.dark3,
  outlineOffset: "2px",
  size: "70px",
};

export default Button;

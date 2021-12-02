import Button from "./Button";
import PropTypes from "prop-types";
import styled from "styled-components";

// Theme colors 
import Theme from "../../utils/theme";


const ActionButton = styled(Button)`
    :hover {
        cursor: pointer;
    }
    disabled: ${(props) => props.disabled};
    color: ${(props) => props.type === "Green" ? Theme.accent1 : Theme.accent2};
    background: ${(props) => props.type === "Green" ? Theme.neutral1 : Theme.neutral2};
    outline: ${(props) => props.type === "Green" ? `2px solid ${Theme.neutral1}` : `2px solid ${Theme.neutral2}`};  
    `;


ActionButton.propTypes = {
    type: PropTypes.oneOf(["Green", "Orange"]), 
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
};


ActionButton.defaultProps = {
    type: "Green",
    disabled: false,
};

export default ActionButton;

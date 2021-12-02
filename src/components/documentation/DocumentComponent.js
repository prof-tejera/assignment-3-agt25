import React from "react";
import styled from "styled-components";

const colors = {
  themeBlue: "#588DE4",
  darkGrey: "#2B2F3BCF",
  lightGrey: "#B5B1B2",
  white: "F1F1F1"
}

const Wrapper = styled.div`
  margin: 20px 0px;
  border-top: 1px dotted ${colors.darkGrey};
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  font-size: 1.7rem;
  color: ${colors.themeBlue};
  font-family: Open Sans;
`;

const RenderComponent = styled.div`
  padding: 25px;
  display: flex;
  margin: 1rem;
  align-items: center;
`;

const Documentation = styled.table`
  height: 80%;
  margin: 2rem;
  border: none;
  max-width: 45vw;
  width: 45vw;
  color: ${colors.white};
  tr, th {
    border: 1px solid ${colors.lightGrey};
  }
  td {
    border: 1px solid ${colors.lightGrey};
  }
`;

class DocumentComponent extends React.Component {
  render() {
    return (
      <Wrapper>
        <Title>{this.props.title}</Title>
        <Container>
          <RenderComponent>{this.props.component}</RenderComponent>
          <Documentation>
            <tr>
              <th>Prop</th>
              <th>Description</th>
              <th>Type</th>
              <th>Default value</th>
            </tr>
            {this.props.propDocs.map((doc) => {
              return (
                <tr>
                  <td><b>{doc.prop}</b></td>
                  <td>{doc.description}</td>
                  <td>{doc.type}</td>
                  <td>
                    <code>{doc.defaultValue}</code>
                  </td>
                </tr>
              );
            })}
          </Documentation>
        </Container>
      </Wrapper>
    );
  }
}

export default DocumentComponent;

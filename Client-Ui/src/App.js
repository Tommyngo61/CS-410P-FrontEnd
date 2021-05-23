import React from "react";
import "./App.css";
import Navigation from "./Components/Navigation";
import Home from "./Components/Home";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container fluid className="h-100">
      <Row>
        <Col className="nav">
          <Navigation></Navigation>
        </Col>
      </Row>
    </Container>
  );
}

<Col xs={10}>
  <Home></Home>
</Col>;

export default App;

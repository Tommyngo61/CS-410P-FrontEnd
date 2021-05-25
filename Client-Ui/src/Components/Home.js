import React from "react";
import Card from "react-bootstrap/Card";
import CryptoCard from "./CryptoCard";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Home.css";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";

function Home() {
  return (
    <div className="homepage">
      <h1>Crypto DashBoard</h1>
      <Container className="card-container mt-5">
        {/* <Row>
          <Col>
            <Card border="primary">
              <Card.Header className="card-1" as="h2">
                Bit Coin
              </Card.Header>
              <Card.Body className="font-weight-bold">
                MONEY MONEY MONEY
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card border="primary">
              <Card.Header className="card-2" as="h2">
                Ethereum Coin
              </Card.Header>
              <Card.Body className="font-weight-bold">
                MONEY MONEY MONEY
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card border="primary">
              <Card.Header className="card-3" as="h2">
                Doge Coin
              </Card.Header>
              <Card.Body className="font-weight-bold">
                MONEY MONEY MONEY
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
        <Row>
          <Col>
            <Link class="card-link" to="/Bitcoin">
              <CryptoCard id="bitcoin" color="#f2a900"></CryptoCard>
            </Link>
          </Col>
          <Col>
            <Link class="card-link" to="/Ethereum">
              <CryptoCard id="ethereum" color="#5ca6ce"></CryptoCard>
            </Link>
          </Col>
          <Col>
            <Link class="card-link" to="/Dogecoin">
              <CryptoCard id="dogecoin" color="#cb9800"></CryptoCard>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;

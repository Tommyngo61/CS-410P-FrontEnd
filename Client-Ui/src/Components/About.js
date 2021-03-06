import React from "react";
import { Container, Card } from "react-bootstrap";
import "../styles/About.css";
import Rio from "../images/RioLe.jpg";
import Tommy from "../images/Tommy.jpg";
import Kenzie from "../images/Kenzie.jpg";
const About = () => {
  return (
    <>
      <Container className="aboutUs">
        <Card className="about-us-card" style={{ width: "25rem" }}>
          <Card.Img className="img" variant="top" src={Kenzie} />
          <Card.Body>
            <Card.Title className="title">Kenzie Gage</Card.Title>
            <Card.Text>Fan of pizza</Card.Text>
          </Card.Body>
        </Card>
        <Card className="about-us-card" style={{ width: "25rem" }}>
          <Card.Img className="img" variant="top" src={Tommy} />
          <Card.Body>
            <Card.Title className="title">Tommy Ngo</Card.Title>
            <Card.Text>I like to sleep</Card.Text>
          </Card.Body>
        </Card>
        <Card className="about-us-card" style={{ width: "25rem" }}>
          <Card.Img className="img" variant="top" src={Rio} />
          <Card.Body>
            <Card.Title className="title">Rio Le</Card.Title>
            <Card.Text>Likes to play games in my free time.</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default About;

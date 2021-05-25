import React from "react";
import { Container, Form, Button, Col, Row, Image } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
const Information = ({ data }) => {
  console.log(data);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <>
      <Row>
        <Col xs="auto">
          <h1>{data.name}</h1>
        </Col>
        <Col xs="auto">
          <Image src={data.image.small} rounded />
        </Col>
        <Col xs="auto">
          <h1>
            Current Price:$
            {numberWithCommas(data.market_data.current_price.usd)}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Description</h2>
          <div className="description">
            <p>{ReactHtmlParser(data.description.en)}</p>
          </div>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default Information;

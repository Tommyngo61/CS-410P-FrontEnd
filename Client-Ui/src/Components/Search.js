import React, { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import "../styles/Search.css";
import Information from "./Information";
import axios from "axios";

const Search = () => {
  const [coinName, setCoinName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const fetchdata = (e) => {
    e.preventDefault();
    if (!coinName) {
      return;
    }
    const getData = async () => {
      setIsLoading(false);
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`
        )
        .then(({ data }) => setData(data))
        .catch((err) => console.log(err));
      setIsLoading(true);
    };
    getData();
  };
  return (
    <>
      <Container className="container">
        <Form className="form" onSubmit={fetchdata}>
          <Form.Row className="align-items-center">
            <Col xs="auto" md="auto">
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Crypto Name"
                onChange={(e) => setCoinName(e.target.value)}
                required
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" className="mb-2">
                Submit
              </Button>
            </Col>
          </Form.Row>
        </Form>
        {isLoading && <Information data={data} />}
      </Container>
    </>
  );
};

export default Search;

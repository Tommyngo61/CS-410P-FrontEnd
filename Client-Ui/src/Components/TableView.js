import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/TableView.css";
import { Table } from "react-bootstrap";
import axios from "axios";

function TableView() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(false);
      await axios
        .get("https://api.coingecko.com/api/v3/search/trending")
        .then(({ data }) => setData(data.coins))
        .catch((err) => console.log(err));
      setIsLoading(true);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Container className="TableView mt-5 d-flex justify-content-center">
          <h1>Trending Cryptocurrency</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Icon</th>
                <th>Coin Id</th>
                <th>Coin Name</th>
                <th>Symbol</th>
                <th>Price/BTC</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => (
                <tr key={data.item.market_cap_rank}>
                  <td>
                    <img src={data.item.small} alt="Icon" />
                  </td>
                  <td>{data.item.id}</td>
                  <td>{data.item.name}</td>
                  <td>{data.item.symbol}</td>
                  <td>{data.item.price_btc}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default TableView;

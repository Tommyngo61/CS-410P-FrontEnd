import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Container, Row, Form, Button } from "react-bootstrap";

function Chart(props) {
  const [loading, setLoading] = useState(false);
  const [btcData, setBtcData] = useState([]);
  const [ethData, setEthData] = useState([]);
  const [dogeData, setDogeData] = useState([]);
  const [search, setSearch] = useState("");
  const [xData, setXData] = useState([]);

  useEffect(() => {
    const fetchGraphData = async () => {
      setLoading(false);
      let qs = `?vs_currency=usd&days=30&interval=daily`;
      await axios
        .get("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart" + qs)
        .then(({ data }) => {
          console.log(data);
          setBtcData(data.prices);
          return data.prices;
        })
        .catch((error) => {
          console.log(error);
        });
      await axios
        .get(
          "https://api.coingecko.com/api/v3/coins/ethereum/market_chart" + qs
        )
        .then(({ data }) => {
          console.log(data);
          setEthData(data.prices);
          return data.prices;
        })
        .catch((error) => {
          console.log(error);
        });
      await axios
        .get(
          "https://api.coingecko.com/api/v3/coins/dogecoin/market_chart" + qs
        )
        .then(({ data }) => {
          console.log(data);
          setDogeData(data.prices);
          return data.prices;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const loadData = async () => {
      await fetchGraphData();
      //await buildChart();
      //setLoading(true);
    };

    loadData();
  }, []);
  const buildChart = () => {};
  const searchFind = async (event) => {
    const fetchGraphDataX = async () => {
      setLoading(false);
      let qs = `?vs_currency=usd&days=30&interval=daily`;
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${event}/market_chart` + qs
        )
        .then(({ data }) => {
          console.log("x data", data);
          setXData(data.prices);
          return data.prices;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    await fetchGraphDataX();
  };

  const handleSubmit = (e) => {
    searchFind(search);
    e.preventDefault();
  };

  return (
    <Container className=" mt-5 d-flex justify-content-center">
      <Row>
        <Form>
          <Form.Group controlId="search">
            <Form.Label>Search For a Crypto Currency</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search for a Crypto Coin"
            />
            <Button variant="primary" onSubmit={handleSubmit}>
              Search
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}

export default Chart;

/*
{loading ? (
  <Container className="justify-content-center">
    <Row className="justify-content-center">
      <h1>USD value Chart</h1>
    </Row>
    <Row>
      <Line
        data={{
          labels: btcData.map(
            (data) => "day " + data[0] / (1000 * 60 * 60 * 24)
          ),
          datasets: [
            {
              label: "Bitcoin change by day",
              data: btcData.map((data) => data[1]),
              fill: false,
              borderColor: "rgb(242, 169, 0)",
              tension: 0.1,
            },
            {
              label: "Ethereum change by day",
              data: ethData.map((data) => data[1]),
              fill: false,
              borderColor: "rgb(0, 96, 151)",
              tension: 0.1,
            },
            {
              label: "Dogecoin change by day",
              data: dogeData.map((data) => data[1]),
              fill: false,
              borderColor: "rgb(225,179,3)",
              tension: 0.1,
            },
          ],
        }}
        width={500}
        height={600}
        options={{ maintainAspectRatio: false }}
      />
    </Row>
  </Container>
) : (
  "Loading..."
)}
*/

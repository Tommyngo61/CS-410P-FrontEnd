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
  //const buildChart = () => {};
  const searchFind = async (event) => {
    const fetchGraphDataX = async () => {
      //setLoading(false);
      let qs = `?vs_currency=usd&days=30&interval=daily`;
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${event}/market_chart` + qs
        )
        .then(({ data }) => {
          console.log("x data", data);
          setXData(data.prices);
          setLoading(true);
          return data.prices;
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          alert("Failed to fetch with that id");
        });
    };
    await fetchGraphDataX();
    //setLoading(true);
  };

  const handleSubmit = (e) => {
    searchFind(search);
    e.preventDefault();
  };

  return (
    <Container className="mr-5 mt-5 d-flex justify-content-center">
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="search">
            <Form.Label>Crypto Currency Search </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search for a Crypto Coin"
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Search
          </Button>
        </Form>
      </Row>
      <br></br>

      {loading ? (
        <Container>
          <Row className="justify-content-center">
            <h1>USD value Chart</h1>
          </Row>
          <Row>
            <Line
              data={{
                labels: [
                  30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16,
                  15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
                ],
                datasets: [
                  {
                    label: `${search} change by day`,
                    data: xData.map((data) => data[1]),
                    fill: false,
                    borderColor: "rgb( 170, 1, 20)",
                    tension: 0.1,
                  },
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
              options={{
                responsive: true,
                scales: {
                  x: {
                    display: true,
                    title: {
                      display: true,
                      text: "Amount of days ago",
                      color: "blue",
                      font: {
                        family: "Times",
                        size: 20,
                        weight: "normal",
                        lineHeight: 1.2,
                      },
                      padding: { top: 20, left: 0, right: 0, bottom: 0 },
                    },
                  },
                  y: {
                    display: true,
                    title: {
                      display: true,
                      text: "Value in USD",
                      color: "blue",
                      font: {
                        family: "Times",
                        size: 20,
                        style: "normal",
                        lineHeight: 1.2,
                      },
                      padding: { top: 30, left: 0, right: 0, bottom: 0 },
                    },
                  },
                },
              }}
              width={700}
              height={450}
            />
          </Row>
        </Container>
      ) : (
        ""
      )}
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
          labels: [
                    30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16,
                    15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
                  ],
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

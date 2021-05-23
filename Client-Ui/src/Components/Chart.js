import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Container, Row } from "react-bootstrap";

function Chart() {
  const [loading, setLoading] = useState(false);
  const [btcData, setBtcData] = useState([]);
  const [ethData, setEthData] = useState([]);
  const [dogeData, setDogeData] = useState([]);

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
      setLoading(true);
    };

    loadData();
  }, []);

  return (
    <>
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
    </>
  );
}

export default Chart;

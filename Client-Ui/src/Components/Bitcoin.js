import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "../styles/Bitcoin.css";
import ReactHtmlParser from "react-html-parser";
function Bitcoin() {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [coinData, setCoinData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [description, setDescription] = useState("");
  //const [dataSet, setDataSet] = useState([]);
  //const [chartDate, setChartDate] = useState([]);

  useEffect(() => {
    const fetchSimpleData = async () => {
      setLoading(false);
      let qs = `?ids=bitcoin&vs_currencies=usd`;
      await axios
        .get("https://api.coingecko.com/api/v3/simple/price" + qs)
        .then((res) => {
          setPrice(res.data.bitcoin);
          //console.log(price);
          //console.log(res);
          //console.log(res.data.bitcoin);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const fetchCoinData = async () => {
      setLoading(false);
      let qs = `bitcoin?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`;
      await axios
        .get("https://api.coingecko.com/api/v3/coins/" + qs)
        .then(({ data }) => {
          console.log(data);
          setCoinData(data);
          setDescription(data.description.en);
          //console.log(coinData);
        })
        .catch((error) => {
          console.log(error);
        });
      //setLoading(true);
    };

    const fetchGraphData = async () => {
      setLoading(false);
      let qs = `?vs_currency=usd&days=30&interval=daily`;
      await axios
        .get("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart" + qs)
        .then(({ data }) => {
          console.log(data);
          setChartData(data.prices);
          return data.prices;
        })
        .catch((error) => {
          console.log(error);
        });
      //setLoading(true);
    };

    const loadData = async () => {
      await fetchCoinData();
      await fetchGraphData();
      //console.log("chartData", chartData);
      await fetchSimpleData();

      setLoading(true);
    };
    loadData();

    //console.log(coinData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function numberWithCommas(str) {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <>
      {loading ? (
        <Container className="Bitcoin mt-5 ">
          <Row>
            <Col className="offset-2">
              <h1 className="text-center">
                {coinData.name} ({coinData.symbol})
                <img
                  alt={`${coinData.name} symbol`}
                  src={`${coinData.image.thumb}`}
                ></img>
              </h1>
            </Col>
          </Row>
          <Row className="mb-2 chart text-center">
            <Col className="offset-1 offset-lg-0">
              <Line
                data={{
                  labels: [
                    30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16,
                    15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
                  ],
                  datasets: [
                    {
                      label: "Bitcoin change by day",
                      data: chartData.map((data) => data[1]),
                      fill: false,
                      borderColor: "rgb(242, 169, 0)",
                      tension: 0.1,
                    },
                  ],
                }}
                width={200}
                height={300}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: true,
                      title: {
                        display: true,
                        text: "Amount of days ago",
                        color: "rgb(242, 169, 0)",
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
                        color: "rgb(242, 169, 0)",
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
              />
            </Col>
          </Row>
          <Row>
            <Col className="offset-4 offset-sm-2">
              <Card className="btc-card-1">
                <Card.Title className="btc-card-title text-center">
                  <h2>About Bitcoin</h2>
                </Card.Title>
                <Card.Body className="btc-card-body">
                  <p>{ReactHtmlParser(description)}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col className="">
              <Card className="btc-card-2">
                <Card.Title className="btc-card-title text-center">
                  <h2>Bitcoin Statistics</h2>
                </Card.Title>
                <Card.Body className="btc-card-body ">
                  <h5>Current Exchange Rate:</h5>
                  <p>1 BTC = {numberWithCommas(price.usd)} USD</p>
                  <h5>Links:</h5>
                  <ul>
                    <li>
                      <a href={`${coinData.links.homepage[0]}`}>
                        Homepage Link
                      </a>
                    </li>
                    <li>
                      <a href={`${coinData.links.blockchain_site[0]}`}>
                        Blockchain Link
                      </a>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        "loading..."
      )}
    </>
  );
}

//text from: https://whatis.techtarget.com/definition/Bitcoin#:~:text=Bitcoin%20is%20a%20digital%20currency,who%20accept%20Bitcoins%20as%20payment.&text=The%20P2P%20network%20monitors%20and%20verifies%20the%20transfer%20of%20Bitcoins%20between%20users.
export default Bitcoin;

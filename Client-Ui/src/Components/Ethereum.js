import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "../styles/Ethereum.css";
import ReactHtmlParser from "react-html-parser";
function Ethereum() {
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
      let qs = `?ids=ethereum&vs_currencies=usd`;
      //?ids=bitcoin&vs_currencies=usd
      //?ids=ethereum&vs_currencies=usd
      await axios
        .get("https://api.coingecko.com/api/v3/simple/price" + qs)
        .then(({ data }) => {
          setPrice(data.ethereum);
          //console.log(price);
          //console.log(res);
          console.log(data.ethereum);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const fetchCoinData = async () => {
      setLoading(false);
      let qs = `ethereum?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`;
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
        <Container className="Ethereum mt-5 ">
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
                  labels: chartData.map(
                    (data) => "day " + data[0] / (1000 * 60 * 60 * 24)
                  ),
                  datasets: [
                    {
                      label: `${coinData.name} change by day`,
                      data: chartData.map((data) => data[1]),
                      fill: false,
                      borderColor: "rgb(0, 96, 151)",
                      tension: 0.1,
                    },
                  ],
                }}
                width={200}
                height={300}
                options={{ maintainAspectRatio: false }}
              />
            </Col>
          </Row>
          <Row>
            <Col className="offset-4 offset-sm-2">
              <Card className="eth-card-1">
                <Card.Title className="eth-card-title text-center">
                  <h2>About {`${coinData.name}`}</h2>
                </Card.Title>
                <Card.Body className="eth-card-body">
                  <p>{ReactHtmlParser(description)}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col className="">
              <Card className="eth-card-2">
                <Card.Title className="eth-card-title text-center">
                  <h2>{`${coinData.name}`} Statistics</h2>
                </Card.Title>
                <Card.Body className="eth-card-body ">
                  <h5>Current Exchange Rate:</h5>
                  <p>1 = {numberWithCommas(price.usd)} USD</p>
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

export default Ethereum;

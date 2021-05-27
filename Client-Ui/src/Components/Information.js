import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import { Line, Pie } from "react-chartjs-2";
import ReactHtmlParser from "react-html-parser";
import "../styles/Information.css";
const Information = ({ data, chart }) => {
  console.log(data);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <>
      <Row>
        <Col className="offset-2">
          <h1 className="text-center">
            {data.name} ({data.symbol})
            <img alt={`${data.name} symbol`} src={`${data.image.small}`}></img>
          </h1>
        </Col>
      </Row>
      <Row className="mb-2 chart text-center">
        <Col width="100">
          <Line
            data={{
              labels: [
                30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15,
                14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
              ],
              //chartData.map((data) => "day " + data[0] / (1000 * 60 * 60 * 24)    ),
              datasets: [
                {
                  label: `${data.name} change by day`,
                  data: chart.map((data) => data[1]),
                  fill: false,
                  borderColor: "#7e7e7e",
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
                    color: "#7e7e7e",
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
                    color: "#7e7e7e",
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
          <Card className="any-card-1">
            <Card.Title className="any-card-title text-center">
              <h2>About {data.name}</h2>
            </Card.Title>
            <Card.Body className="doge-card-body">
              <p>{ReactHtmlParser(data.description.en)}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col className="">
          <Card className="any-card-2">
            <Card.Title className="any-card-title text-center">
              <h2>{data.name} Statistics</h2>
            </Card.Title>
            <Card.Body className="any-card-body ">
              <h5>Current Exchange Rate:</h5>
              <p>
                1 {`${data.symbol}`}= $
                {data.market_data.current_price.usd > 1
                  ? numberWithCommas(data.market_data.current_price.usd)
                  : data.market_data.current_price.usd}{" "}
                USD
              </p>
              <h5>Links:</h5>
              <ul>
                <li>
                  <a href={`${data.links.homepage[0]}`}>Homepage Link</a>
                </li>
                <li>
                  <a href={`${data.links.blockchain_site[0]}`}>
                    Blockchain Link
                  </a>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <div>
              <Pie
                data={{
                  labels: [
                    "Circulating_supply",
                    `Total supply ${data.market_data.max_supply}`,
                  ],
                  datasets: [
                    {
                      label: "My First Dataset",
                      data: [
                        data.market_data.circulating_supply,
                        data.market_data.max_supply -
                          data.market_data.circulating_supply,
                      ],
                      backgroundColor: ["black", "grey"],
                      hoverOffset: 4,
                    },
                  ],
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Information;

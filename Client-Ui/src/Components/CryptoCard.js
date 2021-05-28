import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import {
  Sparklines,
  SparklinesCurve,
  SparklinesReferenceLine,
} from "react-sparklines";
import Row from "react-bootstrap/Row";
import "../styles/CryptoCard.css";

export default function CryptoCard(props) {
  const [data, setData] = useState([]);
  const [price, setPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [sparkData, setSparkData] = useState([]);
  const [sparkColor, setColor] = useState();
  const [cryptoLogo, setLogo] = useState();
  const [dayChange, setDayChange] = useState();
  // const [weekChange, setWeekChange] = useState();
  const [monthChange, setMonthChange] = useState();

  const url = `https://api.coingecko.com/api/v3/coins/${props.id}?sparkline=true`;
  const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const headerStyle = {
    color: "white",
    backgroundColor: props.color ? props.color : "black",
    textShadow:
      "-1px -1px 0px #000, 0px -1px 0px #000, 1px -1px 0px #000, -1px  0px 0px #000, 1px  0px 0px #000, -1px  1px 0px #000, 0px  1px 0px #000, 1px  1px 0px #000",
  };

  const avgLineStyle = {
    stroke: "black",
    strokeDasharray: "2, 2",
    strokeOpacity: ".7",
  };

  const maxLineStyle = {
    stroke: "green",
    strokeDasharray: "2, 2",
    strokeOpacity: ".7",
  };

  const getChangeColor = (changeValue) => {
    if (parseInt(changeValue) < 0) {
      return "red";
    } else {
      return "green";
    }
  };

  const formatAsPercent = (value) => {
    return parseFloat(value).toFixed(2) + "%";
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(false);
      await axios
        .get(url)
        .then(({ data }) => {
          setData(data);
          setPrice(dollarUS.format(data.market_data.current_price.usd));
          setSparkData(data.market_data.sparkline_7d.price);
          setColor(calcLineColor(data.market_data.sparkline_7d.price));
          setLogo(data.image.small);
          setDayChange(
            formatAsPercent(data.market_data.price_change_percentage_24h)
          );
          // setWeekChange(
          //   formatAsPercent(data.market_data.price_change_percentage_7d)
          // );
          setMonthChange(
            formatAsPercent(data.market_data.price_change_percentage_30d)
          );
        })
        .catch((err) => console.log(err));
      setIsLoading(true);
    };
    getData();
  }, [url]);

  // Decide whether the sparkline should be green or red depending on if
  // the price went up or down over the past 7 days
  const calcLineColor = (weekData) => {
    const startPrice = weekData[0];
    const endPrice = weekData[weekData.length - 1];
    if (endPrice < startPrice) {
      return "red";
    } else {
      return "green";
    }
  };
  return (
    <>
      {isLoading ? (
        <Card className="crypto-card">
          <Card.Header as="h2" style={headerStyle}>
            {data.name}
          </Card.Header>
          <Card.Body>
            <Row>
              <img
                src={cryptoLogo}
                alt={`Logo for ${data.name}`}
                style={{ margin: "auto" }}
              ></img>
            </Row>
            {/* <Card.Text style={{ display: "inline-block" }}> */}
            <ListGroup>
              <ListGroup.Item style={{ fontSize: ".5em" }}>
                Symbol: {data.symbol.toUpperCase()}
              </ListGroup.Item>
              <ListGroup.Item style={{ fontSize: ".5em" }}>
                Current Price: {price}
              </ListGroup.Item>
              <ListGroup.Item style={{ fontSize: ".5em" }}>
                Day Change:{" "}
                <span style={{ color: getChangeColor(dayChange) }}>
                  {dayChange}
                </span>
              </ListGroup.Item>
              {/* <ListGroup.Item style={{ fontSize: ".8em" }}>
                  Week Change:{" "}
                  <span style={{ color: getChangeColor(weekChange) }}>
                    {weekChange}
                  </span>
                </ListGroup.Item> */}
              <ListGroup.Item style={{ fontSize: ".5em" }}>
                Month Change:{" "}
                <span style={{ color: getChangeColor(monthChange) }}>
                  {monthChange}
                </span>
              </ListGroup.Item>
            </ListGroup>
            {/* </Card.Text> */}
            <ListGroup>
              <ListGroup.Item
                className="spark-title"
                style={{ fontSize: ".4em" }}
              >
                Past Week Performance
              </ListGroup.Item>
              <ListGroup.Item className="spark-chart">
                <Sparklines data={sparkData}>
                  <SparklinesCurve className="sparkline" color={sparkColor} />
                  <SparklinesReferenceLine type="avg" style={avgLineStyle} />
                  <SparklinesReferenceLine type="max" style={maxLineStyle} />
                </Sparklines>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      ) : (
        "loading..."
      )}
    </>
  );
}

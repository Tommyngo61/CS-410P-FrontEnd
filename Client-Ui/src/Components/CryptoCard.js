import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Sparklines,
  SparklinesCurve,
  SparklinesReferenceLine,
} from "react-sparklines";
import { FaBlackberry } from "react-icons/fa";

export default function CryptoCard(props) {
  const [data, setData] = useState([]);
  const [price, setPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [sparkData, setSparkData] = useState([]);
  const [sparkColor, setColor] = useState();

  const url = `https://api.coingecko.com/api/v3/coins/${props.id}?sparkline=true`;

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

  //   const chartOptions = {
  // responsive: false,
  // legend: {
  //   display: false,
  // },
  // elements: {
  //   line: {
  //     borderColor: "#000000",
  //     borderWidth: 1,
  //   },
  //   point: {
  //     radius: 0,
  //   },
  // },
  // tooltips: {
  //   enabled: false,
  // },
  //     scales: {
  //       yAxes: [
  //         {
  //           display: false,
  //           gridLines: {
  //             display: false,
  //           },
  //         },
  //       ],
  //       xAxes: [
  //         {
  //           display: false,
  //           gridLines: {
  //             display: false,
  //           },
  //         },
  //       ],
  //     },
  //   };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(false);
      await axios
        .get(url)
        .then(({ data }) => {
          setData(data);
          setPrice(data.market_data.current_price.usd);
          console.log(data.market_data.sparkline_7d.price);
          setSparkData(data.market_data.sparkline_7d.price);
          setColor(calcLineColor(data.market_data.sparkline_7d.price));
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
        <Card>
          <Card.Header as="h2" style={headerStyle}>
            {data.name}
          </Card.Header>
          <Card.Body>
            Current Price: {price}
            <Sparklines data={sparkData}>
              <SparklinesCurve color={sparkColor} />
              <SparklinesReferenceLine type="avg" style={avgLineStyle} />
              <SparklinesReferenceLine type="max" style={maxLineStyle} />
            </Sparklines>
          </Card.Body>
        </Card>
      ) : (
        "loading..."
      )}
    </>
  );
}

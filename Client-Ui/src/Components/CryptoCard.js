import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function CryptoCard(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = `https://api.coingecko.com/api/v3/coins/${props.id}?sparkline=true`;

  const headerStyle = {
    color: "white",
    backgroundColor: props.color ? props.color : "black",
    textShadow:
      "-1px -1px 0px #000, 0px -1px 0px #000, 1px -1px 0px #000, -1px  0px 0px #000, 1px  0px 0px #000, -1px  1px 0px #000, 0px  1px 0px #000, 1px  1px 0px #000",
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(false);
      await axios
        .get(url)
        .then(({ data }) => {
          setData(data);
          console.log(data.name);
        })
        .catch((err) => console.log(err));
      setIsLoading(true);
    };
    getData();
    console.log(`props.id = ${props.id}`);
  }, [url]);
  return (
    <Card>
      <Card.Header as="h2" style={headerStyle}>
        {data.name}
      </Card.Header>
    </Card>
  );
}

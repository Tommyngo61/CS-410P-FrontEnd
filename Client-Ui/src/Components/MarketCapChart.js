import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

export default function MarketCapChart() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [coinNames, setNames] = useState([]);
  const [marketCaps, setCaps] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=9&page=1&sparkline=false";

  const chartData = {
    labels: coinNames,
    datasets: [
      {
        label: "Market Capitalization Chart",
        data: marketCaps,
        backgroundColor: [
          //   "#081d58",
          //   "#253494",
          //   "#225ea8",
          //   "#1d91c0",
          //   "#41b6c4",
          //   "#7fcdbb",
          //   "#c7e9b4",
          //   "#edf8b1",
          //   "#ffffd9",
          "rgba(8,29,88, .8)",
          "rgba(37,52,148, .8)",
          "rgba(34,94,168, .8)",
          "rgba(29,145,192, .8)",
          "rgba(65, 182, 196, .8)",
          "rgba(127, 205, 187, .8)",
          "rgba(199,233,189, .8)",
          "rgba(237,248,177, .8)",
          "rgba(255,255,217, .8)",
        ],

        borderColor: [
          "rgba(8,29,88, 1)",
          "rgba(37,52,148, 1)",
          "rgba(34,94,168, 1)",
          "rgba(29,145,192, 1)",
          "rgba(65, 182, 196, 1)",
          "rgba(127, 205, 187, 1)",
          "rgba(199,233,189, 1)",
          "rgba(237,248,177, 1)",
          "rgba(255,255,217, 1)",
        ],
      },
    ],
  };

  const setAllFields = (data) => {
    let names = [];
    let marketCap = [];
    for (let coin in data) {
      names.push(data[coin].name);
      marketCap.push(data[coin].market_cap);
    }
    setNames(names);
    setCaps(marketCap);
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(false);
      await axios
        .get(url)
        .then(({ data }) => {
          console.log(data);
          setData(data);
          setAllFields(data);
          console.log("names", coinNames);
        })
        .catch((err) => console.log(err));
      setIsLoading(true);
    };
    getData();
  }, []);
  return (
    <>
      {isLoading ? (
        <Doughnut
          data={chartData}
          height={600}
          width={600}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Cyrpto with the Largest Market Capitalization ($USD)",
                font: { size: "25" },
              },
            },
            layout: {
              padding: 20,
            },
          }}
        />
      ) : (
        "loading..."
      )}
    </>
  );
}

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import "../styles/Bitcoin.css";
function Bitcoin() {
  const labels = ["1", "2", "3"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  return (
    <Container className="Bitcoin mt-5 ">
      <Row>
        <Col>
          <h1 className="text-center">Bitcoin (BTC)</h1>
        </Col>
      </Row>
      <Row className="chart text-center">
        <Line
          data={data}
          width={200}
          height={300}
          options={{ maintainAspectRatio: false }}
        />
      </Row>
      <Row>
        <Col>
          <h2>About Bitcoin</h2>
          <p>
            Bitcoin is a digital currency (also called crypto-currency) that is
            not backed by any country's central bank or government. Bitcoins can
            be traded for goods or services with vendors who accept Bitcoins as
            payment. Bitcoin-to-Bitcoin transactions are made by digitally
            exchanging anonymous, heavily encrypted hash codes across a
            peer-to-peer (P2P) network. The P2P network monitors and verifies
            the transfer of Bitcoins between users. Each user's Bitcoins are
            stored in a program called a digital wallet, which also holds each
            address the user sends and receives Bitcoins from, as well as a
            private key known only to the user. The Bitcoin network is designed
            to mathematically generate no more than 21 million Bitcoins and the
            network is set up to regulate itself to deal with inflation.
            Bitcoins can be spent by initiating a transfer request from a
            Bitcoin address in the customer's wallet to a Bitcoin address in the
            vendor's wallet. As of this writing, one Bitcoin (also called a BTC)
            is worth $104 -- but just as with stocks, the value of Bitcoins can
            fluctuate quickly.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

//text from: https://whatis.techtarget.com/definition/Bitcoin#:~:text=Bitcoin%20is%20a%20digital%20currency,who%20accept%20Bitcoins%20as%20payment.&text=The%20P2P%20network%20monitors%20and%20verifies%20the%20transfer%20of%20Bitcoins%20between%20users.
export default Bitcoin;

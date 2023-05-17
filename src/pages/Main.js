import { Button, Col, Container, Row, Form, Spinner } from "react-bootstrap";
import React, { useState, useCallback } from "react";
import useBunzz from "../hooks/useBunzz";
import {
  getAuctionErc721Contract,
  createAuction,
  addBid,
  claim,
} from "../contracts/utils";
import { useWeb3React } from "@web3-react/core";

const Main = () => {
  const bunzz = useBunzz();
  const { account } = useWeb3React();

  const auctionErc721Contract = getAuctionErc721Contract(bunzz);
  
  const [createTokenId, setCreateTokenId] = useState(0)
  const [createStartPrice, setCreateStartPrice] = useState(0);
  const [createDesiredPrice, setCreateDesiredPrice] = useState(1);
  const [createStartTime, setCreateStartTime] = useState(0);
  const [createEndTime, setCreateEndTime] = useState(0);
  const [pendingCreate, setPendingCreate] = useState(false);

  const [addTokenId, setAddTokenId] = useState(0)
  const [addPayoutAmount, setAddPaymentAmount] = useState(0);
  const [pendingAdd, setPendingAdd] = useState(false);
  
  const [claimTokenId, setClaimTokenId] = useState(0);
  const [pendingClaim, setPendingClaim] = useState(false);

  return (
    <Container>
      <Row className="justify-content-center mt-3 text-center">
        <h5>Auction ERC721</h5>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col lg="4" md="4" xs="12">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Token ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter token id"
                value={createTokenId}
                onChange={(val) => setCreateTokenId(val.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Start Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter token amount"
                value={createStartPrice}
                onChange={(val) => setCreateStartPrice(val.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Desired Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter token amount"
                value={createDesiredPrice}
                onChange={(val) => setCreateDesiredPrice(val.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Start Timestamp</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter timestamp (10 digits)"
                value={createStartTime}
                onChange={(val) => setCreateStartTime(val.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input End Timestamp</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter timestamp (10 digits)"
                value={createEndTime}
                onChange={(val) => setCreateEndTime(val.target.value)}
              />
            </Form.Group>
            {!pendingCreate ? (
              <Button
                variant="dark"
                onClick={async () => {
                  setPendingCreate(true);
                  try {
                    const txHash = await createAuction(
                      auctionErc721Contract,
                      createTokenId,
                      createStartPrice,
                      createDesiredPrice,
                      createStartTime,
                      createEndTime,
                      account
                    );
                    console.log(txHash);
                    setPendingCreate(false);
                  } catch (e) {
                    console.log(e);
                    setPendingCreate(false);
                  }
                }}
              >
                Create Auction (Only Admin)
              </Button>
            ) : (
              <Button variant="dark">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {` `} Create Auction (Only Admin)
              </Button>
            )}
          </Form>
          <br></br>
          <br></br>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Token ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter token id"
                value={addTokenId}
                onChange={(val) => setAddTokenId(val.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Payment Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter payment amount"
                value={addPayoutAmount}
                onChange={(val) => setAddPaymentAmount(val.target.value)}
              />
            </Form.Group>
            {!pendingAdd ? (
              <Button
                variant="dark"
                onClick={async () => {
                  setPendingAdd(true);
                  try {
                    const txHash = await addBid(
                      auctionErc721Contract,
                      addTokenId,
                      addPayoutAmount,
                      account
                    );
                    console.log(txHash);
                    setPendingAdd(false);
                  } catch (e) {
                    console.log(e);
                    setPendingAdd(false);
                  }
                }}
              >
                Place Bid (Anyone)
              </Button>
            ) : (
              <Button variant="dark">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {` `} Place Bid (Anyone)
              </Button>
            )}
          </Form>
          <br></br>
          <br></br>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Token ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter token id"
                value={claimTokenId}
                onChange={(val) => setClaimTokenId(val.target.value)}
              />
            </Form.Group>
            {!pendingClaim ? (
              <Button
                variant="dark"
                onClick={async () => {
                  setPendingClaim(true);
                  try {
                    const txHash = await claim(
                      auctionErc721Contract,
                      claimTokenId,
                      account
                    );
                    console.log(txHash);
                    setClaimTokenId(false);
                  } catch (e) {
                    console.log(e);
                    setClaimTokenId(false);
                  }
                }}
              >
                Claim (Only Winner)
              </Button>
            ) : (
              <Button variant="dark">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {` `} Claim (Only Winner)
              </Button>
            )}
          </Form>
        </Col>
      </Row>
      <br></br>
      <br></br>
    </Container>
  );
};

export default Main;

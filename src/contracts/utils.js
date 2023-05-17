import BigNumber from "bignumber.js";
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});
const ethers = require("ethers");

export const getAuctionErc721Contract = (bunzz) => {
  return bunzz && bunzz.contracts && bunzz.contracts.auctionErc721;
};

export const getAuctionErc721Address = (bunzz, address) => {
  bunzz.contracts.auctionErc721.options.address = address;
};

export const createAuction = async (
  auctionErc721,
  tokenId,
  startPrice,
  desiredPrice,
  startTime,
  endTime,
  account
) => {
  return auctionErc721.methods
    .createAuction(
      new BigNumber(tokenId),
      new BigNumber(startPrice),
      new BigNumber(desiredPrice),
      new BigNumber(startTime),
      new BigNumber(endTime))
    .send({ from: account })
    .on("transactionHash", (tx) => {
      console.log(tx);
      return tx.transactionHash;
    });
};

export const addBid = async (
  auctionErc721,
  paymentAmount,
  _auctionId,
  account
) => {
  return auctionErc721.methods
    .addBid(new BigNumber(_auctionId))
    .send({ from: account, value: ethers.utils.parseEther(paymentAmount) })
    .on("transactionHash", (tx) => {
      console.log(tx);
      return tx.transactionHash;
    });
};

export const claim = async (
  auctionErc721,
  _auctionId,
  account
) => {
  return auctionErc721.methods
    .claim(new BigNumber(_auctionId))
    .send({ from: account })
    .on("transactionHash", (tx) => {
      console.log(tx);
      return tx.transactionHash;
    });
};

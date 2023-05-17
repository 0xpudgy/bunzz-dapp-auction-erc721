import * as Types from "./types.js";
import { contractAddresses } from "./constants.js";
import AuctionErc721Abi from "./abi/auctionErc721.json";

export class Contracts {
  constructor(provider, networkId, web3, options) {
    this.web3 = web3;
    this.defaultConfirmations = options.defaultConfirmations;
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5;
    this.confirmationType =
      options.confirmationType || Types.ConfirmationType.Confirmed;
    this.defaultGas = options.defaultGas;
    this.defaultGasPrice = options.defaultGasPrice;
    this.auctionErc721 = new web3.eth.Contract(AuctionErc721Abi);
    this.setProvider(provider, networkId);
  }

  setProvider(provider, networkId) {
    const setProvider = (contract, address) => {
      contract.setProvider(provider);
      if (address) contract.options.address = address;
      else console.error("Contract address not found in network", networkId);
    };

    setProvider(
      this.auctionErc721,
      contractAddresses.auctionErc721[networkId]
    );
  }
}

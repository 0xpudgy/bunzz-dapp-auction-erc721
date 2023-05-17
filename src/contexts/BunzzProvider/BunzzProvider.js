import React, { createContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { BUNZZ } from "../../contracts";

export const Context = createContext({
  bunzz: undefined,
});

const BunzzProvider = ({ children }) => {
  const {
    library,
  } = useWeb3React();

  const [ethereum, setEthereum] = useState();
  const [bunzz, setBunzz] = useState();

  window.bunzz = bunzz;
  window.eth = ethereum;

  useEffect(() => {
    if (library) setEthereum(library.provider);
  }, [library]);

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId);
      const bunzzLib = new BUNZZ(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: "6000000",
        defaultGasPrice: "1000000000000",
        accounts: [],
        ethereumNodeTimeout: 10000,
      });
      setBunzz(bunzzLib);
      window.bunzzsauce = bunzzLib;
    }
  }, [ethereum, library]);

  return <Context.Provider value={{ bunzz }}>{children}</Context.Provider>;
};

export default BunzzProvider;

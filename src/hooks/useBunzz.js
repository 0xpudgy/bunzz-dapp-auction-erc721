import { useContext } from "react";
import { Context } from "../contexts/BunzzProvider";

const useBunzz = () => {
  const { bunzz } = useContext(Context);
  return bunzz;
};

export default useBunzz;

import "./App.css";

import React from "react";
import {
  connect,
  connectSnaps,
  createSnapAcc,
  getSnapAccInfo,
  getSnapInfo,
} from "./test.ts";

export function TestPage() {
  const initialState = {};
  const [currentInfo, setCurrentInfo] = React.useState(initialState);
  const [infoType, setInfoType] = React.useState(0);
  const [snapAccState, setSnapAccState] = React.useState(false);
  const AccountInfoPanel = (props) => {
    switch (props.type) {
      case 5:
        return (
          <>
            <div>Account Name: {props.info?.name}</div>
            <div>Account Balance: {props.info?.balance?.total}</div>
            <div>Account Address: {props.info?.publicKey}</div>
          </>
        );
      case 4:
        return <>In progress...</>;
      case 3:
        return (
          <>
            <div>Account Name: {props.info?.name}</div>
            <div>Address: {props.info?.address}</div>
          </>
        );
      case 2:
        return (
          <>
            <div>Network Name: {props.info?.name}</div>
            <div>Token name: {props.info?.token.name}</div>
            <div>Token Symbol: {props.info?.token?.symbol}</div>
            <div>Token Decimals: {props.info?.token?.decimals}</div>
          </>
        );
      default:
        break;
    }
    return <>Information goes here...</>;
  };

  const handleConnect = async () => {
    setInfoType(4);
    await connect();
    setInfoType(1);
  };
  const handleSnapEnable = async () => {
    setInfoType(4);
    await connectSnaps();
    setInfoType(1);
  };
  const handleSnapInfo = async () => {
    setInfoType(4);
    let result = await getSnapInfo();
    setInfoType(2);
    setCurrentInfo(result);
  };
  const handleCreateSnapAcc = async () => {
    let accName = prompt("Please enter account name", "MyTestAccount");
    if (accName === null) return;
    setInfoType(4);
    let result = await createSnapAcc(accName);
    setInfoType(3);
    setCurrentInfo(result);
  };
  const handleGetAccInfo = async () => {
    setInfoType(4);
    let result = await getSnapAccInfo();
    if (!snapAccState) {
      result = await getSnapAccInfo();
      setSnapAccState(true);
    }
    console.log(result);
    setInfoType(5);
    setCurrentInfo(result);
  };

  return (
    <>
      This is test page
      <div>
        <button onClick={handleConnect}>Connect Wallet</button>
      </div>
      <div>
        <button onClick={handleSnapEnable}>Enable Snaps</button>
      </div>
      <div>
        <button onClick={handleSnapInfo}>Get Network Info</button>
      </div>
      <div>
        <button onClick={handleCreateSnapAcc}>Create Snap Account</button>
      </div>
      <div>
        <button onClick={handleGetAccInfo}>Get Snap Account Info</button>
      </div>
      <AccountInfoPanel info={currentInfo} type={infoType} />
    </>
  );
}

function App() {
  return (
    <>
      <TestPage />
    </>
  );
}

export default App;

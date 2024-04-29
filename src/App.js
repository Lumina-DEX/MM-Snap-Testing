import "./App.css";

import React from "react";
import {
  connect,
  connectSnaps,
  createSnapAcc,
  checkSnapAccList,
  getSnapAcc,
  sendPayment,
} from "./test.ts";

function App() {
  const [connectWalletFlag, setCWF] = React.useState(0);
  const [enableSnap, setES] = React.useState(0);
  const [accessSnapAcc, setASA] = React.useState(0);
  const [snapAcc, setSnapAcc] = React.useState();
  const [receiveAddress, setRAddress] = React.useState("");
  const [receiveAmount, setAmount] = React.useState(0);
  const handleConnect = async () => {
    setCWF(1);
    let res = await connect();
    if (!res) return;
    setCWF(2);
    setES(1);
    await connectSnaps();
    setES(2);
    res = await checkSnapAccList();
    if (res) setASA(2);
    else {
      const accName = prompt("Please enter account name", "MyTestAccount");
      if (accName === null) return;
      await createSnapAcc(accName);
      setASA(2);
    }
    res = await getSnapAcc();
    setSnapAcc(res);
  };
  const handleSend = async () => {
    await sendPayment(receiveAddress, receiveAmount);
  };

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            Connect Wallet
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li>
              <button className="btn">Connect Auro Wallet</button>
            </li>
            <li>
              <button
                className="btn"
                onClick={() => {
                  document.getElementById("my_modal_1").showModal();
                  handleConnect();
                }}
              >
                Connect Metamask
              </button>
            </li>
          </ul>
        </div>
      </div>
      {snapAcc ? (
        <div>
          <div className="m-5">From: {snapAcc.address}</div>
          <div className="m-5">
            To:{" "}
            <input
              type="text"
              placeholder="type address here"
              value={receiveAddress}
              onChange={(e) => setRAddress(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="m-5">
            Amount:{" "}
            <input
              type="text"
              placeholder="type amount here"
              value={receiveAmount}
              onChange={(e) => setAmount(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="m-5">
            Balance: {snapAcc.balance.total / 1000000000}
          </div>
          <button className="btn m-5" onClick={handleSend}>
            Send
          </button>
        </div>
      ) : (
        <></>
      )}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <ul className="steps steps-horizontal w-full">
            <li className={`step ${connectWalletFlag ? "step-primary" : ""}`}>
              {connectWalletFlag === 2
                ? "Wallet Connected"
                : connectWalletFlag === 1
                ? "Connecting..."
                : "Connect Wallet"}
            </li>
            <li className={`step ${enableSnap ? "step-primary" : ""}`}>
              {enableSnap === 2
                ? "Snap Enabled"
                : enableSnap === 1
                ? "Enabling..."
                : "Enable Snap"}
            </li>
            <li className={`step ${accessSnapAcc ? "step-primary" : ""}`}>
              {accessSnapAcc === 2
                ? "Account Accessed"
                : accessSnapAcc === 1
                ? "Accessing..."
                : "Access Snap Account"}
            </li>
          </ul>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* <TestPage /> */}
    </>
  );
}

export default App;

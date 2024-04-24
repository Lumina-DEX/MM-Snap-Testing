import "./App.css";

import React from "react";
import {
  connect,
  connectSnaps,
  createSnapAcc,
  getSnapAccList,
} from "./test.ts";

function App() {
  const [connectWalletFlag, setCWF] = React.useState(0);
  const [enableSnap, setES] = React.useState(0);
  const [accessSnapAcc, setASA] = React.useState(0);
  const handleConnect = async () => {
    setCWF(1);
    let res = await connect();
    if (!res) return;
    setCWF(2);
    setES(1);
    await connectSnaps();
    setES(2);
    res = await getSnapAccList();
    if (res) setASA(2);
    else {
      const accName = prompt("Please enter account name", "MyTestAccount");
      if (accName === null) return;
      await createSnapAcc(accName);
      setASA(2);
    }
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

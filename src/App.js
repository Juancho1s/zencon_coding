import React, { useState, useEffect } from "react";
import HelloWorldContract from "./contracts/SimpleContract.json";
import getWeb3 from "./web3";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const web3Instance = await getWeb3();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = HelloWorldContract.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          HelloWorldContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        setWeb3(web3Instance);
        setContract(contractInstance);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const getMessage = async () => {
    try {
      const result = await contract.methods.message().call();
      setMessage(result);
    } catch (error) {
      console.error(error);
    }
  };

  const setMessageValue = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const fromAddress = accounts[0];
  
      await contract.methods.setMessage("H!!!!!").send({ from: fromAddress });
      getMessage();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="App">
      <h1>HelloWorld Contract</h1>
      <p>Message: {message}</p>
      <button onClick={getMessage}>Get Message</button>
      <button onClick={setMessageValue}>Set Message</button>
    </div>
  );
}

export default App;

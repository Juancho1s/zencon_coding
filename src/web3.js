import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Esperar a que la página haya terminado de cargar
    window.addEventListener("load", async () => {
      // Comprobar si MetaMask está instalado
      if (typeof window.ethereum !== "undefined") {
        try {
          // Solicitar acceso a la cuenta del usuario
          await window.ethereum.request({ method: "eth_requestAccounts" });
          // Crear una instancia de Web3 con el proveedor de MetaMask
          const web3 = new Web3(window.ethereum);
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else {
        // Si MetaMask no está instalado, utilizar el proveedor de Web3 predeterminado (por ejemplo, Ganache)
        const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
        const web3 = new Web3(provider);
        resolve(web3);
      }
    });
  });

export default getWeb3;

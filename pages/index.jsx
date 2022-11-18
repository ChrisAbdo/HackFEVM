import Head from "next/head";
import Image from "next/image";
import Web3 from "web3";
import { useEffect, useState } from "react";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Home = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    loadWeb3();
  }, []);

  const loadWeb3 = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const Web3Handler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x7ab7",
            chainName: "Wallaby Testnet",
            nativeCurrency: {
              name: "FIL",
              symbol: "FIL",
              decimals: 18,
            },
            rpcUrls: ["https://wallaby.node.glif.io/rpc/v0"],
            blockExplorerUrls: ["https://filscout.com/"],
          },
        ],
      });
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const web3 = new Web3(window.ethereum);
      setAccount(account[0]);
      setWeb3(web3);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Next.js + Web3.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <button onClick={Web3Handler}>Connect Wallet</button>
        <h1>{account}</h1>
      </main>
    </div>
  );
};

export default Home;

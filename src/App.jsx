import React from "react";
import {
  Cart,
  FlexContent,
  Footer,
  Hero,
  Navbar,
  Sales,
  Stories,
} from "./components";
import Sales1 from "./components/Sales1";
import {
  heroapi,
  popularsales,
  toprateslaes,
  highlight,
  sneaker,
  story,
  footerAPI,
} from "./data/data.js";

import { useState, useEffect } from "react";
const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  async function getAccountAddress() {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please Install MetaMask");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsWalletConnected(true);
      setWalletAddress(accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);
      // setAddress(accounts[0]);
      console.log(localStorage.getItem("walletAddress"));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAccountAddress();
  }, []);

  return (
    <>
      {" "}
      <Navbar />
      <Cart />
      <main className="flex flex-col gap-16 relative">
        <Hero heroapi={heroapi} />
        <Sales1 endpoint={popularsales} ifExists />
        <FlexContent endpoint={highlight} ifExists />
        <Sales endpoint={toprateslaes} />
        <FlexContent endpoint={sneaker} />
        {/* <Stories story={story} /> */}
      </main>
      <Footer footerAPI={footerAPI} />
    </>
  );
};

export default App;

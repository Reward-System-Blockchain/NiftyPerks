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
import {
  heroapi,
  popularsales,
  toprateslaes,
  highlight,
  sneaker,
  story,
  footerAPI,
} from "./data/data.js";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, goerli, mainnet, polygon } from "wagmi/chains";

const chains = [polygonMumbai, goerli, mainnet, polygon];
const projectId = "f32c7097c07c8c1552f46619147dff35";

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

const App = () => {
  return (
    <>
      {" "}
      <WagmiConfig client={wagmiClient}>
        <Navbar />
        <Cart />
        <main className="flex flex-col gap-16 relative">
          <Hero heroapi={heroapi} />
          <Sales endpoint={popularsales} ifExists />
          <FlexContent endpoint={highlight} ifExists />
          <Sales endpoint={toprateslaes} />
          <FlexContent endpoint={sneaker} />
          <Stories story={story} />
        </main>
        <Footer footerAPI={footerAPI} />
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeVariables={
          {
            // '--w3m-font-family': 'ui-sans-serif,system-ui',
            // "--w3m-accent-color": "#334155",
          }
        }
        themeMode="light"
        enableNetworkView="true"
        chainImages={{
          5: "https://assets-global.website-files.com/6364e65656ab107e465325d2/637aee14aa9d9f521437ec16_hYC2y965v3QD7fEoVvutzGbJzVGLSOk6RZPwEQWcA_E.jpeg",
          80001:
            "https://assets-global.website-files.com/6364e65656ab107e465325d2/637adca2e1a09547acd85968_Y_44LwHNRnOEvnRExgnO1UujtZwn7zq7BCb4oxxHgpI.jpeg",
        }}
      />
    </>
  );
};

export default App;

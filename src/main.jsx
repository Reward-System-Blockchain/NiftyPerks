import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./app/Store.js";
import { Toaster } from "react-hot-toast";
import routes from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --------------------Wallet Connect -----------------//

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

// ---------------------------------------------------------//

// ----------------Push Support Chat --------------------//
import { Chat } from "@pushprotocol/uiweb";
// ------------------------------------------------------//

const address = localStorage.getItem("walletAddress");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <WagmiConfig client={wagmiClient}>
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
          {/* <App /> */}

          <Chat
            account={address} //user address
            supportAddress="0x5991fd6Ecc5634C4de497b47Eb0Aa0065fffb214" //support address
            env="staging"
            modalTitle="NiftyPerks Support"
          />
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
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

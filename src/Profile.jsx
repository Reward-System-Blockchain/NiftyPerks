import React from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { Card1 } from "./components/utils/Card1.jsx";
import { Grid } from "@nextui-org/react";
import { footerAPI } from "./data/data.js";
import Card from "./Card2.jsx";
import "./Card2.css";
import { useState, useEffect } from "react";

import { Polybase } from "@polybase/client";
import Web3 from "web3";
import axios from "axios";
import Card3 from "./components/Card3.jsx";



const Profile = () => {
  const address = localStorage.getItem("walletAddress");
  const [nftData, setNFTData] = useState(null);

  const polybase_pk =
    "0x4d7f64eda64e488783ad02f434f0f68dfd4cb86414a5e843fdeabbd232697221c06a62243bb0251a79d45bb3c6e9f4e41e8755b1857afd06c2462517f350069d";

  const db = new Polybase({
    defaultNamespace: `pk/${polybase_pk}/NiftyPerks1`,
  });
  const collectionReference = db.collection("nft");

  async function getPoints() {
    const data = await db.collection("nft").record(address).get();
    console.log(data.data.points);
    return data.data.points;
  }

  async function updateRecord() {
    // .create(functionName, args) args array is defined by the updateName fn in collection schema
    var currentPoint = await getPoints();
    const setPoints = await collectionReference
      .record(address)
      .call("setPoints", [currentPoint + 50]);
    console.log(setPoints);
    const setTier = await collectionReference
      .record(address)
      .call("setTier", ["Bronze"]);
    console.log(setTier);
  }

  async function createRecords() {
    try {
      const db = new Polybase({
        // defaultNamespace: "pk/0x4d7f64eda64e488783ad02f434f0f68dfd4cb86414a5e843fdeabbd232697221c06a62243bb0251a79d45bb3c6e9f4e41e8755b1857afd06c2462517f350069d/RewardSystem",

        defaultNamespace: `pk/${polybase_pk}/NiftyPerks1`,
      });
      var record = await db
        .collection("nft")
        .create([
          address,
          "https://user-images.githubusercontent.com/90423812/227777031-9b1f4037-2446-4bdb-81dc-1674251688c9.PNG",
          "Rookie",
          0,
        ]);
      console.log(record);
    } catch {
      console.log("User Already Exists");
    }
  }

  async function fetchData() {
    console.log(address);
    const metadataUrl = `https://testnet.polybase.xyz/v0/collections/pk%2F${polybase_pk}%2FNiftyPerks1%2Fnft/records/${address}?format=nft`;
    const response = await axios.get(metadataUrl);
    setNFTData(response.data);
    console.log(response.data);
  }
  useEffect(() => {
    createRecords();
    fetchData();
  }, []);

  return (
    <>
      <div className="relative h-auto w-auto flex flex-col ">
        <Navbar />
        <div className="bg-theme clip-path h-[65vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] w-auto absolute top-0 left-0 right-0 opacity-100 z-10 "></div>
        <div className=" py-14 ">
          <div className="relative opacity-100 z-20 grid items-center justify-items-center ">
            <div className="grid items-center justify-items-center mt-12 md:mt-24 ">
              {/* <h1>Profile</h1>
          <p>This is a profile page.</p> */}
            </div>
            <div className="grid items-center justify-items-center mt-12 md:mt-24 ">
              <Grid.Container gap={2} justify="center">
                <Grid>
                  {nftData && (
                    <Card
                      imageSrc={nftData.img}
                      tier={nftData.tier}
                      points={nftData.points}
                      id={nftData.id}
                    />
                    
                  )}
                  <Card3 />
                </Grid>
              </Grid.Container>
            </div>
          </div>
        </div>
        <Footer footerAPI={footerAPI} />
      </div>
    </>
  );
};

export default Profile;

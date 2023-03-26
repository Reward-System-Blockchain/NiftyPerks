import React from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { Card1 } from "./components/utils/Card1.jsx";
import { Grid } from "@nextui-org/react";
import { footerAPI } from "./data/data.js";

const Profile = () => {
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
                  <Card1 />
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

import React from "react";
import Navbar from "./Navbar.jsx";
import { Card1 } from "./utils/Card1.jsx";
import { Grid } from "@nextui-org/react";

const Profile = () => {
  return (
    <div className="h-screen flex flex-col">
    
      <Navbar />
      <h1>Profile</h1>
      <p>This is a profile page.</p>
    
    <Grid.Container gap={2} justify="center">
    
    <Grid xs={12} sm={4}>
      <Card1 />
    </Grid>
    
   
  </Grid.Container>
    </div>
    
  );
};

export default Profile;

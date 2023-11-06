import React from "react";
import {
  Typography,
  Button,
  Grid,
} from "@mui/material";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Logo from "../assets/zerofillLogo.png";
import appLogo from "../assets/unileverLogo.png";

import PageWrapper from "./PageWrapper";
//width={120}
// , height: 50
const NavBar = () => {
  return (
    <nav className="navbar">
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid
          item
          justifyContent="flex-start"
          alignItems="center"
          style={{ marginLeft: 20 }}
        >
          <img src={appLogo} height={90} /> 

        </Grid>

        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ width: 300, marginBottom: 5 }}
              className="logo-image"
            />
            <Typography variant="h6">
              Enabling Circular Economy for Plastic
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            direction="column"
            style={{ marginRight: "20px" }}
          >
        
            <PageWrapper>

            </PageWrapper>
          </Grid>
        </Grid>
      </Grid>
    </nav>
  );
};

export default NavBar;

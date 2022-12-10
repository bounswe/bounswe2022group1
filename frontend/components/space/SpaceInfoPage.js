import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Footer from "./Footer";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SpaceSidebar from "./SpaceSidebar";
import SpaceMain from "./SpaceMain";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const sidebar = {
  ownersList: [
    {
      ownerUsername: "GuitarInstructor44",
      avatarUrl:
        "https://www.avatarsinpixels.com/Public/images/previews/minipix4.png",
    },
    {
      ownerUsername: "banublkn",
      avatarUrl:
        "https://www.avatarsinpixels.com/Public/images/previews/minipix2.png",
    },
  ],
  userNote: " ",
};

export default function SpaceInfoPage({ space }) {
  return (
    <Container sx={{ marginTop: 12 }}>
      <Grid container maxWidth="lg">
        <Typography
          component="h4"
          variant="h3"
          color="inherit"
          align="center"
          noWrap
          sx={{
            flex: 1,
            fontFamily: "Fira Sans",
            fontWeight: 500,
            mt: 5,
            mb: 5,
          }}
        >
          {" "}
          {space?.members.email}
          {space?.members.email}
        </Typography>

        <Grid container spacing={2} columns={12}>
          <Grid item xs={12}>
            <SpaceMain space={space} />
            
          </Grid>

        </Grid>
      </Grid>

      <Footer title="BUDEMI" description="a company of bogazici university" />
    </Container>
  );
}

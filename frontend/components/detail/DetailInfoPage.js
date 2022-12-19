import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Footer from "./Footer";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import DetailMain from "./DetailMain";
import DetailContributors from "./DetailContributors";
import ContentList from "./ContentList";

export default function DetailInfoPage({ space }) {
  return (
    <Container sx={{borderRadius: "16px",background: "#dae7fb", marginTop: 12}}>
      <Grid container maxWidth="lg" spacing={2} columns={12}>

        <Grid item xs={12}>
          <DetailMain space={space} />
        </Grid>
        <Grid item xs={12}>
          <ContentList />
        </Grid>
        <Grid item xs={12}>
          <DetailContributors space={space} />
        </Grid>
        
      </Grid>
    
      <Footer title="BUDEMI" description="a company of bogazici university" />
    </Container>
  );
}

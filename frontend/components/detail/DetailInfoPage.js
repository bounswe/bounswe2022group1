import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import DetailMain from "./DetailMain";
import DetailContributors from "./DetailContributors";

export default function DetailInfoPage({ space, content }) {
  return (
    <Container sx={{borderRadius: "16px",background: "#dae7fb", marginTop: 15}}>
      <Grid container maxWidth="lg" spacing={2} columns={12}>

        <Grid item xs={12}>
          <DetailMain space={space} content={content} />
        </Grid>
        <Grid item xs={12}>
          <DetailContributors space={space} />
        </Grid>
        
      </Grid>
    
    </Container>
  );
}

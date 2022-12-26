import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Footer from "./Footer";
import DetailMain from "./DetailMain";

export default function DetailInfoPage({ space }) {
  return (
    <Container sx={{ marginTop: 12 }}>
      <Grid container maxWidth="lg" spacing={2} columns={12}>
        <Grid item xs={12}>
          <DetailMain space={space} />
        </Grid>
      </Grid>

      <Footer title="BUDEMI" description="a company of bogazici university" />
    </Container>
  );
}

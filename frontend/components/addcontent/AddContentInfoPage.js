import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ContentAdd from "./ContentAdd";
import Footer from "../detail/Footer";

export default function AddContentInfoPage({ routerQuery }) {
  return (
    <Container sx={{ marginTop: 12 }}>
      <Grid container maxWidth="lg" spacing={2} columns={12}>

        <Grid item xs={12}>
        {routerQuery.type==="text" ? <ContentAdd routerQuery={routerQuery} typeSent="text"/>
            : routerQuery.type==="image" ? <ContentAdd routerQuery={routerQuery} typeSent="image"/>
                : routerQuery.type==="video" ? <ContentAdd routerQuery={routerQuery} typeSent="video"/>
                    : routerQuery.type==="discussion" ? <ContentAdd routerQuery={routerQuery} typeSent="discussion"/>
                        : routerQuery.type==="meeting" ? <ContentAdd routerQuery={routerQuery} typeSent="meeting"/>
                            : console.log("")}
        </Grid>
      </Grid>
      <Footer title="BUDEMI" description="a company of bogazici university" />
    </Container>
  );
}

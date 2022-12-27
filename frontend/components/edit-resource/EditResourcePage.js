import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ResourceEdit from "./ResourceEdit";
import Footer from "../detail/Footer";

export default function EditResourcePage({ routerQuery }) {
  return (
    <Grid container maxWidth="xl" sx={{ margin: "auto" }}>
      <Grid item xs={12}>
        <ResourceEdit routerQuery={routerQuery} />
      </Grid>
    </Grid>
  );
}

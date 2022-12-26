import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://budemii.space/">
        budemi.space
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer({ description, title }) {
  return (
    <Container
      component="footer"
      sx={{
        my: 6,
        py: 2,
        borderRadius: "20px",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        {description}
      </Typography>
      <Copyright />
    </Container>
  );
}

export default Footer;

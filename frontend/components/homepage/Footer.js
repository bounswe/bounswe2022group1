import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography, Divider } from "@mui/material";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://budemii.space/">
        budemi.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer({ description, title }) {
  return (
    <>
      <Divider sx={{ mt: 8, mb: 4 }} />
      <Box component="footer" sx={{ bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
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
      </Box>
    </>
  );
}

export default Footer;

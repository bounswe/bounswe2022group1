import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./TextContentsPage.css";
import Footer from "./Footer";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ContentSidebar from "./ContentSidebar";
import ContentMain from "./ContentMain";



const theme = createTheme();

const sidebar = {
  ownersList: [{
    ownerUsername: "GuitarInstructor44",
    avatarUrl: "https://www.avatarsinpixels.com/Public/images/previews/minipix4.png",
  },
  {
    ownerUsername: "banublkn",
    avatarUrl: "https://www.avatarsinpixels.com/Public/images/previews/minipix2.png",
  }],
  userNote: "I should practice these chords everyday."
}


export default function Profile() {
    return (
      <div className="all">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
          <Typography component="h4"
            variant="h3"
            color="inherit"
            align="center"
            noWrap
            sx={{
              flex: 1,
              fontFamily: "Fira Sans",
              fontWeight: 500,
            }}> Learning Space for Guitar Enthuisasts</Typography>
            <main>
            
            <Grid container spacing={5} sx={{ mt: 3 }}>
              <ContentSidebar
                ownersList={sidebar.ownersList}
                userNote={sidebar.userNote}
              />
            </Grid>
              
              
            </main>
          </Container>
          <Footer title="BUDEMI" description="a company of bogazici university" />
        </ThemeProvider>
      </div>
    );
}

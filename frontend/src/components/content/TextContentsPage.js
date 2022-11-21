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
};

const texts = {
  textContents: [
  {
      title: "On Chords",
      body: "Guitar Chords are a group of at least 3 notes played together, this means three different notes, i.e. notes with 3 different pitches. If, for example, you select an E major chord on the guitar chord generator on this page, you can see the 3 notes E, B and G# (Ab) make up this chord. Some notes can be expressed as either sharp or flat (enharmonic spelling), the notes sound just the same but the naming of them is decided by which key the song is in. ",
      ownerUsername: "GuitarInstructor44",
      ownerAvatar: "https://www.avatarsinpixels.com/Public/images/previews/minipix4.png" ,
  },
  {
    title: "Some definitions from Britannica",
    body: "guitar, plucked stringed musical instrument that probably originated in Spain early in the 16th century, deriving from the guitarra latina, a late-medieval instrument with a waisted body and four strings. The early guitar was narrower and deeper than the modern guitar, with a less pronounced waist. It was closely related to the vihuela, the guitar-shaped instrument played in Spain in place of the lute. The guitar originally had four courses of strings, three double, the top course single, that ran from a violin-like pegbox to a tension bridge glued to the soundboard, or belly; the bridge thus sustained the direct pull of the strings. In the belly was a circular sound hole, often ornamented with a carved wooden rose. The 16th-century guitar was tuned C–F–A–D′, the tuning of the centre four courses of the lute and of the vihuela",
    ownerUsername: "banublkn",
    ownerAvatar: "https://www.avatarsinpixels.com/Public/images/previews/minipix2.png" ,
},]
}


export default function TextContentsPage() {
    return (
      <div className="all">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            <ContentMain 
            textContents={texts.textContents}
            />
          </Container>
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

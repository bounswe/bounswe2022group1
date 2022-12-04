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
import Discussion from "./Discussion";
import { format } from 'date-fns'



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
};

const discussion = {
  comments: [
    {
      username: "lanabanana",
      avatar: "https://www.avatarsinpixels.com/Public/images/previews/minipix1.png",
      date: format(new Date(2022, 11, 5), 'd MMMM, yyyy'),
      body: "Great content",
    },
    {
      username: "ghost-rider",
      avatar: "https://www.avatarsinpixels.com/Public/images/previews/minipix3.png",
      date: format(new Date(2022, 9, 20), 'd MMMM, yyyy'),
      body: "Should I start with a classic guitar, or an electric one?",
    },
  ]
};


function TextContentsPage(props) {
  const {content, ownerUsername} = props;
  console.log(content);



  return (
    <div className="all">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container maxWidth="lg">
            <Typography component="h4"
              variant="h3"
              color="inherit"
              align="center"
              noWrap
              sx={{
                flex: 1,
                fontFamily: "Fira Sans",
                fontWeight: 500,
                mt: 5,
                mb: 5
              }}> {content.name}
              </Typography>
          <main>
            <Container>
            <Grid container spacing={2} columns={12}>
                <Grid item xs={7} >
                    <ContentMain content={content}/>
                    <Discussion
                    comments = {discussion.comments}/>
                </Grid>
          
               <Grid item xs={5}> 
                <ContentSidebar
                  ownerUsername = {ownerUsername}
                  userNote={sidebar.userNote}
                />
                </Grid>
            </Grid>
            </Container>
          </main>
        </Grid>




        <Footer title="BUDEMI" description="a company of bogazici university" />
      </ThemeProvider>
    </div>
  );
}

export default TextContentsPage;

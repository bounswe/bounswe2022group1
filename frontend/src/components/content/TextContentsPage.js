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






function TextContentsPage(props) {
  const {content, ownerUsername, comments} = props;



  return (
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
                    comments = {comments}
                    content_id = {content.id}/>
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

  );
}

export default TextContentsPage;

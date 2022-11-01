import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import "./Profile.css";
import WelcomePost from "./WelcomePost";
import FeaturedPost from "./FeaturedPost";
import EnrolledSpace from "./EnrolledSpace";
import Main from "./Main";
import Footer from "./Footer";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

const sections = [
  { title: "Development", url: "#" },
  { title: "Design", url: "#" },
  { title: "Technology", url: "#" },
  { title: "Art", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
  { title: "Business", url: "#" },
];

const welcomePost = {
  title: "Let's start a course here!",
  description:
    "Do you want to learn a subject? The best way to do this is to explain it to others. So what are you waiting for, come start teaching a lesson?",
  image: "https://i.ibb.co/1fLyJJv/jess-bailey-q10-VITr-VYUM-unsplash.jpg",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "How to be a teachdent",
    date: "Nov 12",
    description:
      "We are here to help you! I know you do not know what a teachdent is, you will :)",
    image: "https://i.ibb.co/KhhsrB5/Screen-Shot-2022-10-30-at-20-49-17.png",
    imageLabel: "Image Text",
  },
  {
    title: "Why we do not have a teacher",
    date: "Nov 15",
    description:
      "You will see the advantages of being a teachdent instead of a teacher or a student.",
    image: "https://i.ibb.co/phbTWYb/Screen-Shot-2022-10-30-at-20-50-30.png",
  },
];

const lastSearched =["ballroom, dance, swing"];

const enrolledSpaces = [
  {
    title: "All about Waltz",
    image: "https://images.squarespace-cdn.com/content/v1/52d1eb65e4b0178cd181929b/1505947544442-DQIY1H04PYMRPEBIBINC/1494973278442-early-dance.jpg"
  },
  {
    title: "Improving Musicality",
    image: "https://images.squarespace-cdn.com/content/v1/56bb828d37013b74a515e3d2/1601670994397-II72B2ZHSXZOF7WQNCJM/cs_tango-class-art-of-musicality-2.jpg"
  },
  {
    title: "Pointe shoe preparation",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/50/PointeShoes.jpg"
  }
];





const theme = createTheme();


export default function Profile() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (token) {
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
            }}> Welcome {username} !</Typography>
            <main>
            
              
              <Grid container spacing={1} sx={{ mt: 3 }}>
              <Main title="Last searched topics" posts={lastSearched} />
              <Button variant="contained">Create a new learning space</Button>
              </Grid>
              <Typography component="h4"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{
              flex: 1,
              fontFamily: "Fira Sans",
              fontWeight: 500,
            }}> Joined learning spaces </Typography>
  
              <Grid container spacing={1} sx={{ mt: 3 }}>
              
              {enrolledSpaces.map((post) => (
                  <EnrolledSpace key={post.title} post={post} />
                ))}
              </Grid>
              
            </main>
          </Container>
          <Footer title="BUDEMI" description="a company of bogazici university" />
        </ThemeProvider>
      </div>
    );
  } else {
    return <div>User not logged in</div>;
  }
}

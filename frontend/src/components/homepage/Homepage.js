import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import "./Homepage.css";
import WelcomePost from "./WelcomePost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

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
    title: "Featured post",
    date: "Nov 12",
    description: "Test1",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description: "Test3.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
];
const post1 = ` good blog post template helps you brainstorm, focus your planning and research, and write effective SEO content quicker and easier. Below are five free blog post templates for you to use, plus details about using them effectively. Feel free to download them, bookmark them, and adapt them to your audience’s (and your writers’) needs. 

Listicle Content Template
A listicle (a portmanteau of “list-article”) is a blog post or article formatted like a list. Typically, each point on the list gets its own numbered header, supported by images and other content. (If you were on the internet in the mid-2000s, think back to all those Buzzfeed articles you probably read.) 

Benefits of listicles: 

Easy to read and understand quickly 
Engaging and addicting to read
Easy to share, promote, and repurpose
If you’re unsure if your blog post topic is list-friendly, try describing it in one sentence. 

For example, this article is about five different blog post templates useful for content marketers. It’s clear from that description (five different things that all support one central message or idea) that this topic could become a listicle. 
`;
const post2 = `Listicle Title
The perfect listicle title is attention-grabbing but NOT clickbait. A title is clickbait if it is overly emotional or shocking in a way that doesn’t reflect the content. To avoid this, make sure you only use titles that accurately reflect your article as a whole.

Listicles are often satisfying to read because they deliver on an implicit promise made in the title. 

`;
const post3 = `Listicle Body Copy
Before you write your body copy, start by listing each item you want to include. This list should: 

Have the same number of items as promised in the title.
Consistently relate to your main topic.
Once you’re happy with your list, each item can become an <H2>. Ideally, you’ll number each header. Numbers help readers keep track of their progress through the article and entices them to finish reading. 

Bonus tip: Headers aren’t the only way you can recycle your outline. Once it’s polished, you can also use it to create a super shareable infographic to promote your post. 

Once you’ve laid out your list headers, build out each section with: 

A supporting image (an illustration, photo, infographic, or even a video could work here)
Essential details about each item
Links to additional content if they want to learn more. 
Include all the best, most relevant, and most exciting information for each section, but make sure each section of your list is only as long as it needs to be, not longer.

Listicle Conclusion 
Use your conclusion to highlight the reader’s main takeaway from this list. Try to include a relevant call to action (CTA) here as well. You could promote a related product or service, encourage readers to download additional content, or link to other related articles. 

How-To Blog Post Template 
How-to blog posts are instructional articles that guide the reader through a specific process or workflow. Because you’ll also number these processes, how-to posts can look similar to listicles. They can help you establish authority in your specialty area and build trust with readers, so the more helpful and reliable you are, the better. 

To determine if your blog topic should be a how-to article, ask yourself these questions: 

Am I describing a process made up of multiple steps?
Do all those steps have to be completed in order?
If the reader follows this process, will they achieve a specific goal or solve a particular problem?
If the answer to any of those questions is “no,” then reconsider whether you should be writing a list post instead. `;
const posts = [post1, post2, post3];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "September 2018", url: "#" },
    { title: "August 2019", url: "#" },
    { title: "July 2020", url: "#" },
    { title: "June 2021", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

const theme = createTheme();

export default function Homepage() {
  return (
    <div className="all">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Welcome!" sections={sections} />
          <main>
            <WelcomePost post={welcomePost} />
            <Grid container spacing={4}>
              {featuredPosts.map((post) => (
                <FeaturedPost key={post.title} post={post} />
              ))}
            </Grid>
            <Grid container spacing={5} sx={{ mt: 3 }}>
              <Main title="Others" posts={posts} />
              <Sidebar
                title={sidebar.title}
                description={sidebar.description}
                archives={sidebar.archives}
                social={sidebar.social}
              />
            </Grid>
          </main>
        </Container>
        <Footer title="Footer" description="Footer text" />
      </ThemeProvider>
    </div>
  );
}

import * as React from "react";
import { Grid, Box, Stack } from "@mui/material";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Header from "../../components/homepage/Header";
import WelcomePost from "../../components/homepage/WelcomePost";
import FeaturedPost from "../../components/homepage/FeaturedPost";
import Main from "../../components/homepage/Main";
import Sidebar from "../../components/homepage/Sidebar";
import Footer from "../../components/homepage/Footer";
import Forum from "../../components/homepage/Forum";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useContext } from "react";
import { Typography, Divider } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import DashboardIcon from "@mui/icons-material/Dashboard";
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
const post1 = ` The organization’s ultimate goal is not to build a course. Instead, the goal is to meet some sort of performance need. And in that sense, the e-learning course is a solution to meet an objective.

And this is where e-learning often falls down.

Effective training programs successfully meet learning objectives that aren’t fuzzy and non-measurable. On top of that, e-learning is usually just part of the overall training program. So it’s not the end-goal.

I’m often asked about how to build better e-learning. From my perspective, many of the courses I see aren’t very good. There are all sorts of reasons for this, but the main reason is that the courses share so much content that they present the illusion that they’re complete. But usually, they’re just content-heavy andnot tied to any meaningful objectives. Thus, they usually produce little to no tangible benefit for the organization.

If you didn’t see it, here’s an interesting article where training gets a large part of the blame for an organization’s $8 billion attrition rate. Is it fair that training gets the blame? I don’t know. But the key consideration for those of us in training is that we need to be aware of the perception and make sure that our programs are designed to actually meet objectives.

When we design e-learning courses, we need to think about the overall objective of the training program and design our courses to meet that objective. All too often, I see courses that are nothing more than glorified and interactive PowerPoint slides. These courses might be fine if the only objective is to provide information, but if the objective is to actually change behavior or improve performance, then these types of courses are doomed to fail.

The bottom line is that a course is only as good as the objectives it’s designed to meet. If you’re not sure what the objectives of your training program are, then you need to go back to the drawing board. But if you have a clear understanding of the objectives, then you can design a course that will actually help your organization meet those objectives.

And that’s the challenge for many of us who build courses. We build a lot of content that we call e-learning. But does what we build contribute to success? How do you know?`;

const sidebar = {
  title: "About Us",
  description:
    "This project is an non-profit assignment prepared by a few computer engineering students under the leadership of Suzan Üsküdarlı.",
  archives: [
    {
      title: "Kadir Gökhan Sezer",
      url: "https://github.com/bounswe/bounswe2022group1/wiki/Kadir-Gokhan-Sezer",
    },
    {
      title: "Ege Onur TAĞA",
      url: "https://github.com/bounswe/bounswe2022group1/wiki/Ege-Onur-Taga",
    },
    {
      title: "Harun ERKURT",
      url: "https://github.com/bounswe/bounswe2022group1/wiki/Harun-Erkurt",
    },
    {
      title: "Ece SARKIN",
      url: "https://github.com/bounswe/bounswe2022group1/wiki/Ece-Sark%C4%B1n",
    },
    {
      title: "Kamil KORKUT",
      url: "https://github.com/bounswe/bounswe2022group1/wiki/Kamil-Korkut",
    },
    {
      title: "Mustafa ATAY",
      url: "https://github.com/bounswe/bounswe2022group1/wiki/Mustafa-Atay",
    },
    {
      title: "Ömer ÖZDEMİR",
      url: "https://github.com/bounswe/bounswe2022group1/wiki/%C3%96mer-%C3%96zdemir",
    },
    {
      title: "Ahmet YAZICI",
      url: "https://github.com/bounswe/bounswe2022group1/wiki/Ahmet-Yazici",
    },
    {
      title: "Osman Fehmi ALBAYRAK",
      url: "https://github.com/bounswe/bounswe2022group1/wiki/Osman-Fehmi-Albayrak",
    },
    {
      title: "Hüseyin SEYYID",
      url: "https://github.com/bounswe/bounswe2022group1/wiki/H%C3%BCseyin-Seyyid",
    },
    {
      title: "Kadir KALKAN",
      url: "https://github.com/bounswe/bounswe2022group1/wiki/Kadir-Kalkan",
    },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

//const [old_pass, setOldPass] = useState("");
//const [new_pass, setNewPass] = useState("");

export default function Homepage() {
  const [forumList, setForumList] = useState([]);

  const getForumList = async () => {
    const response = await fetch(
      "http://3.89.218.253:8000/app/learning-space-list/",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setForumList(data.data);
      });
  };

  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const router = useRouter();

  //-----FORUM DATA

  //-----

  //-----

  function handleSubmit(event) {
    fetch("http://3.89.218.253:8000/app/learning-space/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name,
        tag: tag,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.id) {
          router.push("/homepage");
          return;
        } else {
          console.log(data);
          alert(
            "The information about the Learning Space is wrong. " + data.status
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  }

  const handleSearch = (e) => {
    fetch(
      "http://3.89.218.253:8000/app/learning-space-search/?search_parameter=" +
        e.target.value,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setForumList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getForumList();
  }, []);
  return (
    <Container
      sx={{
        borderRadius: "16px",
        background: "#dae7fb",
      }}
    >
      <Box sx={{ padding: 4, margin: 4, marginTop: 15 }}>
        {/* 
        <Header title="Welcome!" sections={sections} />
*/}
        <WelcomePost post={welcomePost} />
        <Grid container spacing={4}>
          {featuredPosts &&
            featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
        </Grid>
        {user && (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Create a new learning space"
              name="learning_space"
              defaultValue="Name"
              autoFocus
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="leraning_space"
              name="tag"
              defaultValue="Tag"
              autoFocus
              onChange={(e) => {
                setTag(e.target.value);
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: "16px" }}
            >
              Add
            </Button>
          </Box>
        )}
        <Stack spacing={2}>
          <Stack flexDirection="row-reverse">
            <Box>
              <TextField onChange={handleSearch} label="Search for Tag" />
            </Box>
          </Stack>
          <Forum forumList={forumList} />
        </Stack>
        {/* 
        <h1>Development</h1>
        <Stack>
          <Forum />
        </Stack>
        <h1>Art</h1>
        <Stack>
          <Forum />
        </Stack>
        <h1>Music</h1>
        <Stack>
          <Forum />
        </Stack>
        <h1>Social Issues</h1>
        <Stack>
          <Forum />
        </Stack>
        <Main title="From the firehose" posts={posts} /> 
        <Grid container spacing={5} sx={{ mt: 3 }}>
          <Main title="E-Learning" posts={[post1]} />
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
            social={sidebar.social}
          />
        </Grid>
        */}
        <Footer title="BUDEMI" description="a company of bogazici university" />
      </Box>
    </Container>
  );
}

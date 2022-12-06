import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Markdown from "../../components/markdown";

function Main(props) {
  const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" textAlign="center" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts &&
        posts.map((post) => (
          <Markdown className="markdown" key={post.substring(0, 40)}>
            {post}
          </Markdown>
        ))}
    </Grid>
  );
}

export default Main;

import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

function EnrolledSpace(props) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h6">
              {post.title}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 60 , display: { xs: "none", sm: "block" } }}
            image={post.image}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

EnrolledSpace.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
};

export default EnrolledSpace;

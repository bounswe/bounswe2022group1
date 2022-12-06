import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

function ContentMain({ content }) {
  return (
    <Grid>
      <Box>
        {
          <Card sx={{ mt: 2 }}>
            <CardHeader
              action={
                <IconButton aria-label="upvote" color="secondary">
                  <ArrowDropUpIcon />
                </IconButton>
              }
              title={content?.name}
              subheader={`user with id: ${content?.owner}`}
            />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {content?.text}
              </Typography>
            </CardContent>
          </Card>
        }
      </Box>
    </Grid>
  );
}

export default ContentMain;

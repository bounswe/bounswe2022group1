import {
  Box,
  Card,
  Typography,
  CardActions,
  Button,
  CardContent,
  Grid,
  Chip,
  Link,
  CardMedia,
} from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";

function getRandomColor(index) {
  const colors = [
    "success",
    "primary",
    "secondary",
    "info",
    "error",
    "warning",
  ];

  return colors[index % colors.length];
}

const handleFilterTags = (forumList, newForumList, tag, setNewForumList) => {
  let newList = [];
  setNewForumList(forumList);
  if (tag === "All") return;
  forumList.map((data) => {
    if (data.tag === tag) {
      newList.push(data);
    }
  });
  setNewForumList(newList);
};

const tagNames = ["All"];

export default function Forum({ forumList, sx }) {
  const [newForumList, setNewForumList] = useState(forumList);

  const [filterTag, setFilterTag] = useState(null);

  const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const forumListGroup = groupBy(forumList, ["tag"]);
  Object.entries(forumListGroup).map(
    (data) => !tagNames.includes(data[0]) && tagNames.push(data[0])
  );

  const handleFilter = (data) => {
    handleFilterTags(forumList, newForumList, data, setNewForumList);
  };

  return (
    <Box sx={sx}>
      <Box m={1}>
        {tagNames.map((data) => (
          <Chip
            sx={{ p: 1, mr: 1 }}
            label={data}
            onClick={() => handleFilter(data)}
          />
        ))}
      </Box>

      <Grid container spacing={2} flexDirection="row">
        {newForumList?.map((data, index) => (
          <Grid item xs={4} key={index}>
            <Card sx={{ boxShadow: 10 }}>
              <CardMedia component="image"></CardMedia>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  // textAlign="center"
                  sx={{ textTransform: "capitalize" }}
                >
                  {data?.name}
                </Typography>
                <Chip size="small" label={data?.tag} />
              </CardContent>
              <CardActions>
                <Link
                  href="#"
                  component={NextLink}
                  sx={{ textDecoration: "none", ml: 2 }}
                >
                  <Typography>View</Typography>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // return (
  //   <List
  //     sx={{
  //       width: "100%",
  //       marginY: 5,
  //       bgcolor: "background.paper",
  //       borderRadius: "10px",
  //       boxShadow: "5",
  //     }}
  //   >
  //     {forumList?.map((data, index) => (
  //       <Box key={data.id}>
  //         <ListItem alignItems="flex-start" key={index}>
  //           <ListItemAvatar fontSize="large">
  //             <InfoIcon fontSize="large" />
  //           </ListItemAvatar>

  //           <ListItemText
  //             primary={
  //               <>
  //                 <Typography
  //                   sx={{ display: "inline", textDecoration: "none" }}
  //                   component="a"
  //                   href="#"
  //                   color="text.primary"
  //                 >
  //                   {data?.name}
  //                 </Typography>
  //               </>
  //             }
  //             secondary={
  //               <>
  //                 <Typography
  //                   sx={{ display: "inline" }}
  //                   component="a"
  //                   href={`space/${data.id}`}
  //                   variant="body2"
  //                   color="text.primary"
  //                 >
  //                   {data.tag}
  //                 </Typography>
  //                 {/* {`- ${"Description metni"}`} */}
  //               </>
  //             }
  //           />
  //         </ListItem>

  //         <Divider variant="inset" component="li" />
  //       </Box>
  //     ))}
  //   </List>
  // );
}

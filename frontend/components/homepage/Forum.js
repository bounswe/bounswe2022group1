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

export default function Forum({ forumList, sx }) {
  return (
    <Box sx={sx}>
      <Grid container spacing={2} flexDirection="row">
        {forumList?.map((data, index) => (
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
                <Chip color={getRandomColor(index)} label={data?.tag} />
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

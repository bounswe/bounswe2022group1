import {
  Box,
  Card,
  Typography,
  CardActions,
  Button,
  CardContent,
  Grid,
  Link,
  CardMedia,
} from "@mui/material";
import Image from "next/image";

export default function Forum({ forumList, sx }) {
  return (
    <Box sx={sx}>
      <Grid container spacing={2} flexDirection="row" justifyContent="center">
        {forumList?.map((data, index) => (
          <Grid item xs={3} key={index}>
            <Card sx={{ boxShadow: 10 }}>
              <CardMedia component="image">
                <Image
                  height={150}
                  width={250}
                  src={"https://picsum.photos/200/300/?blur"}
                  loader={() => "https://picsum.photos/200/300/?blur"}
                  alt={data?.name}
                />
              </CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ textTransform: "capitalize" }}
                >
                  {data?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data?.tag}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} href={`detail/${data?.id}`}>View</Button>
                <Button size="small">Learn More</Button>
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

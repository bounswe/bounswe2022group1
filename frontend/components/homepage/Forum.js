import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
// icons
import InfoIcon from "@mui/icons-material/Info";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useEffect, useState } from "react";
const forumData1 = [
  {
    icon: <InfoIcon fontSize="large" />,
    name: "Forum Hakkında",
    subtitle: "Forum hakkındaki gelişmeler",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
  },
  {
    icon: <NewspaperIcon fontSize="large" />,
    name: "Haberler",
    subtitle: "Yeni gelişmeler",
    desc: "Lorem ipsum dolor sit amet ",
  },
  {
    icon: <DashboardIcon fontSize="large" />,
    name: "Genel",
    subtitle: "Genel Konular",
    desc: "Lorem ipsum dolor sit amet ",
  },
];

export default function Forum({ forumList }) {
  return (
    <List
      sx={{
        width: "100%",
        marginY: 5,
        bgcolor: "background.paper",
        borderRadius: "10px",
        boxShadow: "5",
      }}
    >
      {forumList?.map((data, index) => (
        <Box key={data.id}>
          <ListItem alignItems="flex-start" key={index}>
            <ListItemAvatar fontSize="large">
              <InfoIcon fontSize="large" />
            </ListItemAvatar>

            <ListItemText
              primary={
                <>
                  <Typography
                    sx={{ display: "inline", textDecoration: "none" }}
                    component="a"
                    href="#"
                    color="text.primary"
                  >
                    {data?.name}
                  </Typography>
                </>
              }
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="a"
                    href={`detail/${data.id}`}
                    variant="body2"
                    color="text.primary"
                  >
                    {data.tag}
                  </Typography>
                  {/* {`- ${"Description metni"}`} */}
                </>
              }
            />
          </ListItem>

          <Divider variant="inset" component="li" />
        </Box>
      ))}
    </List>
  );
}

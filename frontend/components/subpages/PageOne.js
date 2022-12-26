import { useContext, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  Divider,
  Avatar,
  Card,
  Stack,
  Paper,
  Chip,
} from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../utils/axios";

const tags = [
  "C",
  "C++",
  "Kubernetes",
  "React",
  "React",
  "Python",
  "C++",
  "Docker",
  "Kubernetes",
  "Python",
  "Docker",
  "C",
];

export default function PageOne() {
  const { user } = useContext(AuthContext);

  return (
    <Box>
      <Stack
        spacing={1}
        component={Paper}
        sx={{ borderRadius: 6, p: 2, flexDirection: "column" }}
      >
        <Avatar sx={{ alignSelf: "center" }} />
        <Typography textAlign="center">Kadir Gökhan Sezer</Typography>

        <Divider />
        <Stack flexDirection={"row"}>
          <Box sx={{ minWidth: "50%" }}>
            <Typography color="text.secondary" variant="h6">
              About Me
            </Typography>
            <Typography component="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus.
            </Typography>
          </Box>

          <Box sx={{ minWidth: "50%", ml: 2 }}>
            <Typography color="text.secondary" variant="h6">
              My Favorites
            </Typography>
            {tags.map((data) => (
              <Chip sx={{ m: "2px" }} label={data} />
            ))}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

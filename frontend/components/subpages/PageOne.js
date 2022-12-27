//This page can be merged
import { useContext, useEffect, useRef, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Divider,
  Avatar,
  Card,
  Input,
  IconButton,
  Stack,
  Paper,
  Chip,
  Button,
  Grid,
} from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../utils/axios";
import { useSnackbar } from "notistack";
import EditIcon from "@mui/icons-material/Edit";

const tags = [
  "C",
  "C++",
  "Kubernetes",
  "React",
  "Python",
  "C++",
  "Docker",
  "Kubernetes",
  "Python",
  "Docker",
];

export default function PageOne() {
  const ref = useRef();

  const [id, setId] = useState(null);

  const [user, setUser] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const { user: userName } = useContext(AuthContext);

  const [isEditable, setIsEditable] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [aboutMe, setAboutMe] = useState(null);

  const [favorite, setFavorite] = useState({});

  // console.log(favorite);

  const getFileToBase64 = (file) => {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  const onSelectFile = (e) => {
    if (!e.target.files.length) return;
    getFileToBase64(e.target.files[0])
      .then((result) => {
        console.log(result);
        setSelectedFile(result);
        setUser({ ...user, image: result });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = () => {
    axios
      .patch("/profile/", {
        about_me: aboutMe,
        image: selectedFile || user.image,
      })
      .then((data) => {
        enqueueSnackbar("Success ", { variant: "success" });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!userName) return;
    axios
      .get("/user_id_from_username/?username=" + userName)
      .then((data) => setId(data.data.id))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!id) return;
    axios
      .get("/profile/?user_id=" + id)
      .then((data) => {
        console.log(data.data);
        setUser(data.data);
        setAboutMe(data.data.about_me);
      })
      .catch((err) => console.log(err));
    axios
      .get("/favorite/?user=" + id)
      .then((data) => {
        setFavorite(data.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <Grid
        spacing={1}
        component={Paper}
        sx={{ p: 8 }}
        // sx={{ borderRadius: 6, p: 2, flexDirection: "column" }}
      >
        <Grid container direction="row" sx={{ pb: 4 }} spacing={4}>
          <Grid item xs={6} justifyContent="center" alignItems="center">
            <Avatar
              sx={{ alignSelf: "center", width: 100, height: 100, m: "auto" }}
              src={user?.image}
              onClick={() => ref.current?.click()}
            />
            <Typography mt={1} textAlign="center">
              {userName}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography color="text.secondary" variant="h6">
                About Me
              </Typography>
              <IconButton
                color={isEditable ? "success" : "disabled"}
                onClick={() => setIsEditable(!isEditable)}
              >
                <EditIcon />
              </IconButton>
            </Box>
            <Box sx={{ minWidth: "50%" }}>
              <Typography
                p={1}
                sx={{ mb: 2 }}
                style={
                  isEditable
                    ? {
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                      }
                    : {}
                }
                suppressContentEditableWarning={true}
                contentEditable={isEditable}
                onInput={(e) => setAboutMe(e.currentTarget.textContent)}
              >
                {user?.about_me}
              </Typography>
            </Box>
            {isEditable && (
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={handleUpdate}
                sx={{ alignSelf: "end" }}
              >
                Update
              </Button>
            )}
          </Grid>
        </Grid>

        <Divider />
        <Stack flexDirection={"row"}>
          <Box sx={{ minWidth: "50%", mt: 4 }}>
            <Typography color="text.primary" variant="h4" sx={{ mb: 2 }}>
              My Favorites
            </Typography>

            {Object.keys(favorite)?.map((key) => {
              console.log(key);
              return (
                <Chip
                  sx={{ m: "2px" }}
                  label={
                    <Typography fontSize="small">
                      {favorite[key]?.learningSpace?.tag}
                    </Typography>
                  }
                />
              );
            })}
          </Box>
        </Stack>
      </Grid>

      <input
        type="file"
        ref={ref}
        onChange={onSelectFile}
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png"
      />
    </>
  );
}

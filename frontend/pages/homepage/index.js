import {
  Box,
  Stack,
  Button,
  Dialog,
  TextField,
  Container,
  IconButton,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/router";
// components
import Footer from "../../components/homepage/Footer";
import Forum from "../../components/homepage/Forum";
// react
import { useState, useEffect, useContext } from "react";
// contexts
import { AuthContext } from "../../contexts/AuthContext";
// icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
// axios
import axios from "../../utils/axios";

export default function Homepage() {
  const { user } = useContext(AuthContext);

  const [forumList, setForumList] = useState([]);

  const [name, setName] = useState(null);

  const [tag, setTag] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [error, setError] = useState(false);

  const router = useRouter();

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

  function handleSubmit(event) {
    if (tag && name) {
      /** Axios kullanmak için backendde CORS yapılandırması yapılması lazım ... */
      /** https://stackoverflow.com/questions/35760943/how-can-i-enable-cors-on-django-rest-framework */
      axios
        .post("/learning-space", { name, tag })
        .then(() => router.push("/homepage"))
        .catch((err) => console.log(err));
      handleCloseModal();
    } else {
      setError(true);
    }
    event.preventDefault();
  }

  const handleSearch = (e) => {
    axios
      .get("/learning-space-search/?search_parameter=" + e.target.value)
      .then((response) => setForumList(response.data.data))
      .catch((err) => alert(err?.message));
  };

  const handleOpenModal = () => {
    setTag(null);
    setName(null);
    setError(false);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getForumList();
  }, []);

  return (
    <Container
      sx={{
        borderRadius: "16px",
        //background: "#dae7fb",
      }}
    >
      <Box sx={{ padding: 2, marginTop: 15 }}>
        <Stack flexDirection="row">
          <Box flexGrow={0.25}>
            <TextField
              fullWidth
              onChange={handleSearch}
              label="Search for Tag"
            />
          </Box>

          <Box flexGrow={1} />

          <IconButton color="primary" size="large" onClick={handleOpenModal}>
            <AddCircleIcon fontSize="inherit" />
          </IconButton>
        </Stack>

        <Forum forumList={forumList} sx={{ marginTop: 2 }} />

        <Footer title="BUDEMI" description="a company of bogazici university" />
      </Box>
      <Dialog open={openModal} fullWidth onClose={handleCloseModal}>
        <DialogTitle textAlign="center" variant="h4">
          Add Learning Space
        </DialogTitle>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ p: 3 }}>
          <TextField
            error={error && !name}
            helperText={error && !name && "Please in this field."}
            margin="normal"
            required
            fullWidth
            label="Create a new learning space"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            error={error && !tag}
            helperText={error && !tag && "Please in this field."}
            margin="normal"
            required
            fullWidth
            label="Tag Name"
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
      </Dialog>
    </Container>
  );
}

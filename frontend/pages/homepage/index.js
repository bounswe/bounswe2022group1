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
import SearchBar from "../../components/homepage/SearchBar";
import { useSnackbar } from "notistack";
import Login from "../login";

export default function Homepage() {
  const { user, isAuthenticated } = useContext(AuthContext);

  const [forumList, setForumList] = useState([]);

  const [name, setName] = useState(null);

  const [tag, setTag] = useState(null);

  const [description, setDescription] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [error, setError] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const getForumList = () => {
    fetch("http://3.89.218.253:8000/app/learning-space-list/", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => {
        setForumList(data.data);
      })
      .catch((error) => console.log(error));
  };

  function handleSubmit(event) {
    if (tag && name) {
      fetch("http://3.89.218.253:8000/app/learning-space/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ name, tag, description }),
      })
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error(response.statusText);
        })
        .then((data) => {
          setForumList([...forumList, data]);
        })
        .catch((error) =>
          enqueueSnackbar(error.message || "Something went wrong", {
            variant: "error",
          })
        )
        .finally(() => handleCloseModal());
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
    setDescription(null);
    setError(false);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    getForumList();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Container>
      <Box
        sx={{
          padding: 2,
          marginTop: 10,
        }}
      >
        <SearchBar
          handleOpenModal={handleOpenModal}
          handleSearch={handleSearch}
        />

        {forumList.length > 0 && (
          <Forum forumList={forumList} sx={{ marginTop: 0 }} />
        )}
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
          <TextField
            error={error && !description}
            helperText={error && !description && "Please in this field."}
            margin="normal"
            required
            fullWidth
            label="Description"
            onChange={(e) => {
              setDescription(e.target.value);
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

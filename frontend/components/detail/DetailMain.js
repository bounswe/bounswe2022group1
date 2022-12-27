import * as React from "react";
import {
  Grid,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Button,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { Link } from "@mui/material";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import Moment from "moment";

const handleJoin = (spid) => {
  axios
    .post(
      `http://3.89.218.253:8000/app/enroll/`,
      {
        learning_space_id: spid,
      },
      {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }
    )
    .then(
      (response) => {
        console.log(response.data);
        alert(
          "Successfully enrolled " +
            response.data.name +
            " for user " +
            localStorage.getItem("user")
        );
      },
      (error) => {
        console.log(error);
      }
    );
};

const handleLeave = (spid) => {
  axios
    .post(
      `http://3.89.218.253:8000/app/leave-learning-space/`,
      {
        learning_space_id: spid,
      },
      {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }
    )
    .then(
      (response) => {
        console.log(response.data);
        alert(
          "Successfully left " +
            response.data.name +
            " for user " +
            localStorage.getItem("user")
        );
      },
      (error) => {
        console.log(error);
      }
    );
};

const handleFav = (spid) => {
  axios
    .post(
      `http://3.89.218.253:8000/app/favorite/`,
      {
        learningSpace: spid,
      },
      {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }
    )
    .then(
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
};

const handleUnFav = (spid) => {
  axios
    .post(
      `http://3.89.218.253:8000/app/unfavorite/`,
      {
        learningSpace: spid,
      },
      {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }
    )
    .then(
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
};

function DetailMain({ space, content, fav }) {
  const username =
    typeof window !== "undefined" && localStorage.getItem("user");
  const isMember = space?.members.find((e) => e.username === username);

  const spaceid = typeof window !== "undefined" && space?.id;
  const isFav = fav?.find((e) => e.learningSpace.id === spaceid);

  return (
    <Grid>
      <Box component="form" noValidate sx={{ mb: 10 }}>
        {
          <Box>
            <CardHeader
              title={space?.name}
              style={{ textAlign: "center" }}
              titleTypographyProps={{ variant: "h2" }}
            />
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Chip label={space?.tag} />
              <Typography variant="body2" color="text.secondary" align="right">
                Created on {Moment(space?.created_on).format("D MMM YYYY")}
              </Typography>
            </Box>

            <Divider />

            
            <Box sx={{ m: 2 }} /> 
            <Typography
              variant="subtitle1"
              color="text.primary"
              style={{ marginTop: "2", marginBottom: "20" }}
            >
              {space?.description}
            </Typography>
            <Box sx={{ m: 2 }} /> 
            <Divider />

            <Grid
              container
              direction="row"
              alignContent="center"
              justifyContent="space-between"
              sx={{ mt: 8, mb: 4 }}
            >
              <Grid item>
                <Typography
                  variant="h5"
                  color="text.primary"
                  style={{ marginTop: "auto", marginBottom: "auto" }}
                >
                  Resource List:
                </Typography>
              </Grid>
              <Grid item>
                <Box display="flex" justifyContent="right">
                  <Button
                    type="submit"
                    component={Link}
                    href={`/addcontent/${space?.id}`}
                    variant="contained"
                    sx={{ mr: 2, borderRadius: "16px" }}
                    className="btn btn-primary"
                  >
                    Add Resource
                  </Button>

                  {isMember ? (
                    <>
                      <Button
                        type="submit"
                        onClick={() => handleLeave(space.id)}
                        variant="outlined"
                        color="error"
                        sx={{ borderRadius: "16px" }}
                        className="btn btn-primary"
                      >
                        Leave
                      </Button>
                    </>
                  ) : (
                    <>
                      <div style={{ flex: 1 }}></div>
                      <Button
                        type="submit"
                        onClick={() => handleJoin(space.id)}
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: "16px" }}
                        className="btn btn-primary"
                      >
                        Join
                      </Button>
                    </>
                  )}

                  {isFav ? (
                    <>
                      <Button
                        type="submit"
                        onClick={() => handleUnFav(space?.id)}
                        color="primary"
                        sx={{ borderRadius: "16px" }}
                        className="btn btn-primary"
                      >
                        <FavoriteIcon />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="submit"
                        onClick={() => handleFav(space?.id)}
                        color="primary"
                        sx={{ borderRadius: "16px" }}
                        className="btn btn-primary"
                      >
                        <FavoriteBorderIcon />
                      </Button>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {content?.map((c) => (
                <Grid item xs={6}>
                  <Card key={c.id}>
                    <CardActionArea href={`/resource/${c?.id}`}>
                      <CardContent>
                        <Box variant="h5" component="div" sx={{ p: 2 }}>
                          {c.name}
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        }
      </Box>
    </Grid>
  );
}

export default DetailMain;

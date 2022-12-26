import * as React from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link } from "@mui/material";
import axios from "axios";

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

function DetailMain({ space }) {
  return (
    <Grid>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        {
          <Card sx={{ mt: 2 }}>
            <CardHeader
              title={space?.name + " Learning Space"}
              style={{ textAlign: "center" }}
              titleTypographyProps={{ variant: "h2" }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <Box display="flex" justifyContent="space-between">
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                      Add Content
                    </InputLabel>
                    <Select
                      labelId="addcontent-label"
                      id="addcontent-select"
                      value="addcontent"
                      label="addcontent"
                      displayEmpty
                      sx={{ width: 200 }}
                    >
                      <MenuItem value="">Add Content</MenuItem>
                      <MenuItem
                        component={Link}
                        href={`/addcontent/${space?.id}/text`}
                      >
                        Text
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        href={`/addcontent/${space?.id}/video`}
                      >
                        Video
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        href={`/addcontent/${space?.id}/image`}
                      >
                        Image
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        href={`/addcontent/${space?.id}/meeting`}
                      >
                        Meeting
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        href={`/addcontent/${space?.id}/discussion`}
                      >
                        Discussion
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    onClick={() => handleJoin(space?.id)}
                    variant="contained"
                    sx={{ mt: 3, mb: 2, borderRadius: "16px" }}
                    className="btn btn-primary"
                  >
                    Join
                  </Button>
                </Box>
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <ul>
                  Members:
                  {space?.members.map((mem) => (
                    <li key={mem}>{mem.username}</li>
                  ))}
                </ul>
              </Typography>
            </CardContent>
          </Card>
        }
      </Box>
    </Grid>
  );
}

export default DetailMain;

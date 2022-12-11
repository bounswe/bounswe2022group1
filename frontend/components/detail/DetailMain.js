import * as React from "react";
import { Grid, Box, Typography, Card, CardHeader, CardContent, Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios";


const handleJoin = (spid) => {
  axios.post(`http://3.89.218.253:8000/app/enroll/`, {
      learning_space_id: spid,
      },{headers: {
          'Authorization': `token ${localStorage.getItem("token")}`
      }})
      .then((response) => {
          console.log(response.data);
    alert("Successfully enrolled "+response.data.name+" for user "+localStorage.getItem("user"));
      }, (error) => {
          console.log(error);
   });
}

function DetailMain({ space }) {
  return (
    <Grid>

      <Box component="form"
            noValidate
            sx={{ mt: 1 }}>
        {
          <Card sx={{ mt: 2 }}>
            <CardHeader
              
              title={space?.name+" Learning Space"}
              style={{ textAlign: 'center'}}
              titleTypographyProps={{variant:'h2' }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
              <div class="btn btn-primary"> 
                <DropdownButton id="dropdown-basic-button" title="Add Content">
                <Dropdown.Item href={`/addcontent/${space?.id}/text`}>Text</Dropdown.Item>
                <Dropdown.Item href={`/addcontent/${space?.id}/video`}>Video</Dropdown.Item>
                <Dropdown.Item href={`/addcontent/${space?.id}/picture`}>Picture</Dropdown.Item>
                <Dropdown.Item href={`/addcontent/${space?.id}/meeting`}>Meeting</Dropdown.Item>
                <Dropdown.Item href={`/addcontent/${space?.id}/discussion`}>Discussion</Dropdown.Item>
                </DropdownButton>
              </div>

              <div> 
                <Button type="submit" onClick={() => handleJoin(space?.id)} variant="contained" sx={{ mt: 3, mb: 2, borderRadius: "16px" }} className="btn btn-primary">Join</Button>
              </div>
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
              <ul>
                Members:
                {space?.members.map(mem => (
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

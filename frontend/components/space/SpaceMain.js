import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
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

function SpaceMain({ space }) {
  return (
    <Grid>
      <Box>
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
                <Dropdown.Item href={`/AddContentText/${space?.id}`}>Text</Dropdown.Item>
                <Dropdown.Item href={`/AddContentVideo/${space?.id}`}>Video</Dropdown.Item>
                <Dropdown.Item href={`/AddContentPicture/${space?.id}`}>Picture</Dropdown.Item>
                <Dropdown.Item href={`/AddContentMeeting/${space?.id}`}>Meeting</Dropdown.Item>
                <Dropdown.Item href={`/AddContentDiscussion/${space?.id}`}>Discussion</Dropdown.Item>
                </DropdownButton>
              </div>

              <div> 
                <button type="submit" onClick={() => handleJoin(space?.id)} className="btn btn-primary">Join</button>
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

export default SpaceMain;

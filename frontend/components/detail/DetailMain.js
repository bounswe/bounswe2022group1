import React, { useState, useEffect, useContext } from "react";
import { Grid, Box, Typography, Card, CardHeader, CardContent, Button, Link } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

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

const handleLeave = (spid) => {
	axios.post(`http://3.89.218.253:8000/app/leave-learning-space/`, {
    learning_space_id: spid,
    },{ headers: {
        'Authorization': `token ${localStorage.getItem('token')}`
    }})
    .then((response) => {
      console.log(response.data);
      alert('Successfully left ' + response.data.name + ' for user ' + localStorage.getItem('user'));
    },(error) => {
      console.log(error);
  });
};

const ifJoin = (space) => {
  const { user } = useContext(AuthContext);
  const [control, setControl] = useState(false);
  {space?.members.map(mem => (
    user === mem.username ? setControl(true) : console.log("ad")
  ))}
    return control;
};

function DetailMain({ space }) {
  const [control, setControl] = useState(false);
  return (
    <Grid>
      <Box component="form"
        noValidate
        sx={{ mt: 1 }}>
        {
          <Card sx={{ mt: 2 }}>
            <CardHeader
              title={space?.name}
              style={{ textAlign: 'center'}}
              titleTypographyProps={{variant:'h2' }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <Box display="flex" justifyContent="space-between">
                  <Button type="submit" component={Link} href={`/addcontent/${space?.id}`} variant="contained" sx={{ mt: 3, mb: 2, borderRadius: "16px" }} className="btn btn-primary">Add Resource</Button>
                  <Button type="submit" onClick={() => handleLeave(space?.id)} variant="contained" color="error" sx={{ mt: 3, mb: 2, borderRadius: "16px" }}>Leave</Button>
                  <Button type="submit" onClick={() => handleJoin(space?.id)} variant="contained" color="primary" sx={{ mt: 3, mb: 2, borderRadius: "16px" }} >Join</Button>
                    
                </Box>
              </Typography>
            </CardContent>
          </Card>
        }
      </Box>
    </Grid>
  );
}

export default DetailMain;

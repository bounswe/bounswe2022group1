import * as React from 'react';
import {
	Grid,
	Box,
	Card,
	CardHeader,
	CardContent,
  CardActionArea,
	Button,
	CircularProgress,
  Typography,
} from '@mui/material';
import { Link } from '@mui/material';
import axios from 'axios';


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


function DetailMain({ space, content }) {
  const username =
  typeof window !== 'undefined' && localStorage.getItem('user');
  const isMember = space?.members.find((e) => e.username === username);

  if (!space)
    return (
      <Grid>
        <Box
          variant="body2"
          display="flex"
          justifyContent="center"
        >
          <Card>
            <CircularProgress />
          </Card>
        </Box>
      </Grid>
    );
  return (
    <Grid>
      <Box component="form"
        noValidate
        sx={{ mt: 2}}>
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

                  {isMember ? (
									<>
										
										<Button
											type="submit"
											onClick={() => handleLeave(space?.id)}
											variant="contained"
                      color="error" 
											sx={{ mt: 3, mb: 2, borderRadius: '16px' }}
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
											onClick={() => handleJoin(space?.id)}
											variant="contained"
                      color="primary" 
											sx={{ mt: 3, mb: 2, borderRadius: '16px' }}
											className="btn btn-primary"
										>
											Join
										</Button>
									</>
								)}
                </Box>
              </Typography>
            </CardContent>
            
            <CardContent>
						{content?.map((c) => (
							<Card
								key={c.id}
								style={{ border: '1px solid green', margin: '10px' }}
							>
              <CardActionArea href={`/content/${c?.id}`}>
								<CardContent>
									<Box variant="h5" component="div">
										{c.name}
									</Box>
								</CardContent>
                </CardActionArea>
							</Card>
						))}

					</CardContent>

          </Card>
        }
      </Box>
    </Grid>
  );
}

export default DetailMain;

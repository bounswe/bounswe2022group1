import * as React from "react";
import { Grid, Box, Typography, Card, CardHeader, CardContent, Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { Link } from '@mui/material';
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

const handleLeave = (spid) => {
	axios
		.post(
			`http://3.89.218.253:8000/app/leave-learning-space/`,
			{
				learning_space_id: spid,
			},
			{
				headers: {
					Authorization: `token ${localStorage.getItem('token')}`,
				},
			}
		)
		.then(
			(response) => {
				console.log(response.data);
				alert(
					'Successfully left ' +
						response.data.name +
						' for user ' +
						localStorage.getItem('user')
				);
			},
			(error) => {
				console.log(error);
			}
		);
};


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
			<Box component="form" noValidate sx={{ mt: 1 }}>
				<Card sx={{ mt: 2 }}>
					<CardHeader
						title={space?.name + ' Learning Space'}
						style={{ textAlign: 'center' }}
						titleBoxProps={{ variant: 'h2' }}
					/>
					<CardContent>
						<Box variant="body2" color="text.secondary">
							<Box display="flex" justifyContent="space-between">
								{isMember ? (
									<>
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
											onClick={() => handleLeave(space?.id)}
											variant="contained"
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
											sx={{ mt: 3, mb: 2, borderRadius: '16px' }}
											className="btn btn-primary"
										>
											Join
										</Button>
									</>
								)}
							</Box>
						</Box>
					</CardContent>
					<CardContent>
						{content?.map((c) => (
							<Card
								key={c.id}
								style={{ border: '1px solid green', margin: '10px' }}
							>
								<CardContent>
									<Box variant="h5" component="div">
										{c.name}
									</Box>
								</CardContent>
								<CardActions>
									<Button href={`/content/${c.id}`} size="small">
										Learn More
									</Button>
								</CardActions>
							</Card>
						))}

						<Box variant="body2" color="text.secondary">
							<ul>
								Members:
								{space?.members.map((mem) => (
									<li key={mem}>{mem.username}</li>
								))}
							</ul>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Grid>
	);
}

export default DetailMain;

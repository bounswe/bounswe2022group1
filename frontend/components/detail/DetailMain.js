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

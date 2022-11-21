import * as React from "react";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';

    


function ContentSidebar(props) {
    const { ownersList, userNote } = props;

    const [value, setValue] = React.useState('Controlled');
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };

    


return(
<Grid item xs={12}  md={4} rowSpacing={2}>
      <Button variant= "contained">Edit Content</Button>
      <Card  variant="outlined" gutterBottom sx={{ mt: 3 }}>
      <Typography variant="h6">Contributors</Typography>
      {ownersList.map((owner) => (
      <Box>
            <Stack direction="row" spacing={2} alignItems="center">
            <Avatar alt={owner.ownerUsername} src={owner.avatarUrl} />
            <Typography>{owner.ownerUsername}</Typography>
        </Stack>
      </Box>
      ))}
      </Card>
      <Card  variant="outlined" gutterBottom sx={{ mt: 3 }}>
      <Typography  variant="h6">My notes</Typography>
    <Box component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          value={userNote}
        />
        <TextField id="standard-basic" label="edit your note" variant="standard" />
      </Box>
      </Card>
      
    

</Grid>

);

}

ContentSidebar.propTypes = {
    ownersList: PropTypes.arrayOf(
      PropTypes.shape({
        ownerUsername: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
      })
    ).isRequired,
    userNote: PropTypes.string.isRequired,
    
  };


  export default ContentSidebar;
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import axios from "axios";

function DetailSidebar(props) {
  const { ownerUsername, userNote, learningSpaceId } = props;

  return (
    <Grid rowSpacing={2}>
      <Button variant="contained">Edit</Button>
      <Card variant="outlined" gutterBottom sx={{ mt: 3 }}>
        <Typography variant="h6">Contributors</Typography>

        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>User with id: {ownerUsername}</Typography>
          </Stack>
        </Box>
      </Card>
      <Card variant="outlined" gutterBottom sx={{ mt: 3 }}>
        <Typography variant="h6">My notes</Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            value={userNote}
          />
          <TextField
            id="standard-basic"
            label="edit your note"
            variant="standard"
          />
        </Box>
      </Card>
    </Grid>
  );
}

export default DetailSidebar;

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
import { Paper } from "@mui/material";
import IconButton from"@mui/material/IconButton";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";


function Discussion(props){
    const {comments} = props;



    return(
        <Grid sx={{mt:5}}>
            <Paper>
            <Typography variant="h6">Discussion</Typography>
            
            {comments.map((comment) => (
                <Card variant="outlined">
                <Stack direction="row" spacing={2}>
                <Avatar alt={comment.username} src={comment.avatar} />
                <Typography variant="subtitle2">{comment.username}</Typography>
                <Typography variant="overline" >{comment.date}</Typography>
              </Stack>
              <Stack>
                <Typography variant="body" textAlign="left" sx={{ml: 3}}>{comment.body}</Typography>
              </Stack>
              </Card>
            ))}
            
            
            </Paper>
        </Grid>
    );
}


Discussion.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape(
            {
                username: PropTypes.string.isRequired,
                avatar: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                body: PropTypes.string.isRequired,
            }
        ).isRequired
    )
};

export default Discussion;
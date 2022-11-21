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

function ContentMain(props) {
    const {textContents} = props;


    return(
        <Grid>
            <Box>
                {textContents.map((content)=> (
                       <Card sx={{ mt:2}}>
                       <CardHeader
                         avatar={
                            <Avatar alt={content.ownerUsername} src={content.ownerAvatar} />
                         }
                         action={
                           <IconButton aria-label="upvote" color="secondary">
                             <ArrowDropUpIcon />
                           </IconButton>
                         }
                         title={content.title}
                         subheader={content.ownerUsername}
                       />
                       
                       <CardContent>
                         <Typography variant="body2" color="text.secondary">
                           {content.body}
                         </Typography>
                       </CardContent>
                       
                       
                     </Card>
                    
                ))}
            </Box>
        </Grid>
    );
}

ContentMain.propTypes = {
    textContents: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            ownerUsername: PropTypes.string.isRequired,
            ownerAvatar: PropTypes.string.isRequired,
            })
        
    ).isRequired
};

export default ContentMain;
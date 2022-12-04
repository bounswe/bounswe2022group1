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
    const {content} = props;


    return(
        <Grid>
            <Box>
                {
                       <Card sx={{ mt:2}}>
                       <CardHeader

                         action={
                           <IconButton aria-label="upvote" color="secondary">
                             <ArrowDropUpIcon />
                           </IconButton>
                         }
                         title={content.name}
                         subheader= {`user with id: ${content.owner}`}
                       />
                       
                       <CardContent>
                         <Typography variant="body2" color="text.secondary">
                           {content.text}
                         </Typography>
                       </CardContent>
                       
                       
                     </Card>
                    
                }
            </Box>
        </Grid>
    );
}


export default ContentMain;
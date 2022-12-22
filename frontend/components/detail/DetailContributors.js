import * as React from "react";
import { Grid, Box, Card, CardContent, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function DetailContributors({ space }) {
  const [open, setOpen] = React.useState(false);
  
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Grid>
      <Box component="form" noValidate sx={{ mt: 1 }}>
      {
        <Card sx={{ mt: 2, mb: 4}}>
          <CardContent>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Members" />
                  {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {space?.members.map(mem => (
                  <Box>
                    <ListItemButton sx={{ pl: 4 }} component="a" href={`../profile/${mem.id}`}>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary={mem.username} />
                    </ListItemButton>
                  </Box>
                  ))}
                </List>
              </Collapse>
            </List>
          </CardContent>
        </Card>
      }
      </Box>
    </Grid>
  );
}

export default DetailContributors;

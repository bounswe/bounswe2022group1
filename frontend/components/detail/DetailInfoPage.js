import * as React from "react";
import {
	Grid,
	Box,
	Card,
  Container,
	CircularProgress,
} from '@mui/material';
import DetailMain from "./DetailMain";
import DetailContributors from "./DetailContributors";

export default function DetailInfoPage({ space, content, fav }) {
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
    <Container sx={{borderRadius: "16px",background: "#dae7fb", marginTop: 15}}>
      <Grid container maxWidth="lg" spacing={2} columns={12}>

        <Grid item xs={12}>
          <DetailMain space={space} content={content} fav={fav}/>
        </Grid>
        <Grid item xs={12}>
          <DetailContributors space={space} />
        </Grid>
        
      </Grid>
    
    </Container>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { Grid, Box, Typography, Card, CardContent, Button, CardMedia, CardActions, Link } from "@mui/material";
import { useRouter } from "next/router";
import { AuthContext } from "../../contexts/AuthContext";
import Image from "next/image";
import axios from "axios";


function ContentList({}) {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
      if (!user) return;
    });
    
    const [space, setSpace] = useState(null);
  
    useEffect(() => {
      const { id } = router.query;
      if (!id) return;
  
      const getSpace = async () => {
        const baseURL = `http://3.89.218.253:8000/app/content-list/?learning_space_id=${id}`;
        const res = await axios.get(baseURL, {
          headers: { Authorization: `token ${localStorage.getItem("token")}` },
        });
        setSpace(res.data);
      };
      getSpace();
    }, [router]);

    console.log(space);

  return (
    <Box>
      <Grid container spacing={2} flexDirection="row" justifyContent="center">
        {space?.data.map((data, index) => (
          <Grid item xs={6} key={index}>
            <Card sx={{ boxShadow: 10 }}>
              <CardMedia component="image">
                <Box sx={{ m: 1 }}>
                <Image
                  height={150}
                  width={150}
                  src={"https://upload.wikimedia.org/wikipedia/tr/archive/8/86/20210803203947%21Fenerbah%C3%A7e_SK.png"}
                  loader={() => "https://upload.wikimedia.org/wikipedia/tr/archive/8/86/20210803203947%21Fenerbah%C3%A7e_SK.png"}
                  alt={data?.name}
                />
                </Box>

              </CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ textTransform: "capitalize" }}
                >
                  {data?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data?.tag}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} href={`/content/${data?.id}`}>Resource page</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ContentList;

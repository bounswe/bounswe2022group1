import * as React from "react";
import { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Footer from "./Footer";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ContentSidebar from "./ContentSidebar";
import ContentMain from "./ContentMain";
import Discussion from "./Discussion";

import "@recogito/recogito-js/dist/recogito.min.css";
import "@recogito/annotorious/dist/annotorious.min.css";

const sidebar = {
  ownersList: [
    {
      ownerUsername: "GuitarInstructor44",
      avatarUrl:
        "https://www.avatarsinpixels.com/Public/images/previews/minipix4.png",
    },
    {
      ownerUsername: "banublkn",
      avatarUrl:
        "https://www.avatarsinpixels.com/Public/images/previews/minipix2.png",
    },
  ],
  userNote: " ",
};

export default function TextContentsPage({ content, comments }) {
  const paraEl = useRef();
  const imgEl = useRef();

  const [reco, setReco] = useState();
  const [anno, setAnno] = useState();

  const [called, setCalled] = useState(false);

  // Current drawing tool name
  const [tool, setTool] = useState("rect");

  useEffect(() => {
    if (called) return;
    setCalled(true);
    import("@recogito/recogito-js").then((mod) => {
      const Recogito = mod.Recogito;

      const r = new Recogito({ content: paraEl.current });

      r.setAuthInfo({
        id: "mustafa",
        displayName: "mustafa",
      });

      r.on("createAnnotation", (annotation) => {
        console.log(annotation);
      });

      setReco(r);
    });

    import("@recogito/annotorious").then((mod) => {
      const Annotorious = mod.Annotorious;

      console.log(mod);
      const a = new Annotorious({ image: imgEl.current });

      a.setAuthInfo({
        id: "mustafa",
        displayName: "mustafa",
      });
    });
  }, []);

  //return <div ref={paraEl} />;

  return (
    <Container sx={{ marginTop: 12 }}>
      <p ref={paraEl}>
        This is a paragraph to be annotated. Lorem ipsum lorem lorem ipsum ipsum
        lorem ipsum
      </p>
      <img
        src="https://www.avatarsinpixels.com/Public/images/previews/minipix4.png"
        ref={imgEl}
        width="500"
        height="500"
      />
      <Grid container maxWidth="lg">
        <Typography
          component="h4"
          variant="h3"
          color="inherit"
          align="center"
          noWrap
          sx={{
            flex: 1,
            fontFamily: "Fira Sans",
            fontWeight: 500,
            mt: 5,
            mb: 5,
          }}
        >
          {" "}
          {content?.name}
        </Typography>

        <Grid container spacing={2} columns={12}>
          <Grid item xs={7}>
            <ContentMain content={content} />
            <Discussion comments={comments} content_id={content?.id} />
          </Grid>

          <Grid item xs={5}>
            <ContentSidebar
              ownerUsername={content?.owner}
              userNote={sidebar.userNote}
            />
          </Grid>
        </Grid>
      </Grid>

      <Footer title="BUDEMI" description="a company of bogazici university" />
    </Container>
  );
}

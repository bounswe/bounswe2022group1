// This file can be merged with frontend/pages/_app.js
import "../styles/globals.css";
import Header from "../components/header";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { SnackbarProvider } from "notistack";
import AuthProvider from "../contexts/AuthContext";


const theme = createTheme({
  palette: {
    primary: {
      main: "#FF597B",
    },
    secondary: {
      main: "#F9B5D0",
    },
  },
  shape: {
    borderRadius: 32,
  },
  typography: {
    fontFamily: "Rubik",
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 2,
        variant: "outlined",
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Budemii</title>
      </Head>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={2000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Header />
            <Component {...pageProps} />
          </SnackbarProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

import "../styles/globals.css";
import Header from "../components/header";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import AuthProvider from "../contexts/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: `"Comfortaa", "Helvetica", "Arial", sans-serif`,
      textTransform: "none",
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

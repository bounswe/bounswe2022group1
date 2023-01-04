import "../styles/globals.css";
import Header from "../components/header";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";

import AuthProvider from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Budemii</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <CssBaseline />

      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;

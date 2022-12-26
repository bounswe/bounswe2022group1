//This file can be merged.
import NextLink from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function Header() {
  const { isAuthenticated } = useContext(AuthContext);

  const pages = [
    { name: "Home", href: "/homepage", auth: isAuthenticated },
    { name: "Login", href: "/login", auth: !isAuthenticated },
    { name: "Sign Up", href: "/signup", auth: !isAuthenticated },
    { name: "Profile", href: "/profile", auth: isAuthenticated },
    { name: "Logout", href: "/logout", auth: isAuthenticated },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white",
        color: "#737373",
      }}
    >
      <Toolbar>
        <NextLink href="/">
          <Image
            src="/assets/budemi logo2.png"
            width={120}
            height={40}
            alt="budemi"
          />
        </NextLink>

        <Box sx={{ flexGrow: 1 }} />

        <Box display="flex">
          {pages.map(
            (page) =>
              page.auth && (
                <NextLink
                  key={page.name}
                  href={page.href}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      color: "#737373",
                      margin: 1,
                    }}
                  >
                    {page.name}
                  </Typography>
                </NextLink>
              )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

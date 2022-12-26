//This page can be merged
import { useState } from "react";
import {
  Box,
  List,
  Link,
  Drawer,
  Divider,
  Toolbar,
  ListItem,
  Container,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

export default function Sidebar({ menus }) {
  const [page, setPage] = useState(menus[0]);

  const handleChangePage = (page) => {
    setPage(page);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box component="nav" sx={{ width: 240, flexShrink: 0 }}>
        <Drawer variant="permanent" sx={{ display: "block" }}>
          <Toolbar>
            <Link component={NextLink} href="/homepage">
              <Image
                src="/assets/budemi logo2.png"
                width={210}
                height={70}
                alt="budemi.svg"
              />
            </Link>
          </Toolbar>

          <Divider />

          <List>
            {menus &&
              menus.map((menuItem, index) => (
                <>
                  <ListItem key={menuItem.id} disablePadding>
                    <ListItemButton
                      onClick={() => handleChangePage(menuItem)}
                      selected={menuItem.id == page.id}
                    >
                      <ListItemIcon>{menuItem.icon}</ListItemIcon>
                      <ListItemText primary={menuItem.name} />
                    </ListItemButton>
                  </ListItem>
                  {index === 2 && <Divider sx={{ marginY: 2 }} />}
                </>
              ))}
          </List>
        </Drawer>
      </Box>
      <Container
        component="main"
        sx={{
          m: 5,
          p: 5,
          marginTop: 15,
          //borderRadius: "16px",
          //background: "#dae7fb",
        }}
      >
        {page.page}
      </Container>
    </Box>
  );
}

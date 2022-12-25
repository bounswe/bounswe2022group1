import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Header({ sections, title }) {
  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h1"
          variant="h3"
          color="inherit"
          align="center"
          noWrap
          sx={{
            flex: 1,
            fontFamily: "Fira Sans",
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>

        <IconButton>
          <SearchIcon />
        </IconButton>
      </Toolbar>

      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections &&
          sections.map((section) => (
            <Link
              color="inherit"
              noWrap
              key={section.title}
              variant="body2"
              href={section.url}
              sx={{
                p: 1,
                flexShrink: 0,
                fontFamily: "Fira Sans",
                fontWeight: 500,
              }}
            >
              {section.title}
            </Link>
          ))}
      </Toolbar>
    </>
  );
}

export default Header;

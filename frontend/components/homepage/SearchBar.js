import { Box, Stack, Button, TextField } from "@mui/material";

export default function SearchBar({ handleSearch, handleOpenModal }) {
  return (
    <Stack
      flexDirection="row"
      sx={{
        p: 2,
        background: "white",
        borderRadius: "16px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <Box flexGrow={0.25}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          label="Search for Tag"
          onChange={handleSearch}
        />
      </Box>

      <Box flexGrow={1} />

      <Button
        size="small"
        variant="outlined"
        sx={{ borderRadius: 6 }}
        color="primary"
        onClick={handleOpenModal}
      >
        Add a Tag
      </Button>
    </Stack>
  );
}

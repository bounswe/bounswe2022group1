import { Box, Stack, Button, TextField } from "@mui/material";

export default function SearchBar({ handleSearch, handleOpenModal }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        py: 0,
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
        Add a Learning Space
      </Button>
    </Box>
  );
}

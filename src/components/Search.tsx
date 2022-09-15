import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const Search = ({
  resources,
  currentResource,
  setCurrentResource,
  handleSearch,
}: {
  resources: string[];
  currentResource: string;
  setCurrentResource: (currentResource: string) => void;
  handleSearch: (searchTerm: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <Box
      sx={{ padding: 2 }}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch(searchTerm);
      }}
    >
      <TextField
        sx={{ width: "100%", marginRight: 2, marginBottom: 2 }}
        name="search"
        value={searchTerm}
        placeholder="Search..."
        required
        onChange={({ target }) => setSearchTerm(target.value)}
      />
      <Select
        sx={{ width: "100%", marginRight: 2, marginBottom: 2 }}
        name="resource"
        placeholder="Resource"
        value={currentResource}
        required
        onChange={({ target }) => setCurrentResource(target.value)}
      >
        {resources.map((resource) => (
          <MenuItem key={resource} value={resource}>
            {resource}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" type="submit">
        Search
      </Button>
    </Box>
  );
};

export default Search;

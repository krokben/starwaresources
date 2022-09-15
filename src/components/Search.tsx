import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

const Search = ({
  resources,
  fetchAndSetResource,
}: {
  resources: string[];
  fetchAndSetResource: (resource: string, searchTerm: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [resource, setResource] = useState<string>(resources[0]);

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <form onSubmit={() => fetchAndSetResource(resource, searchTerm)}>
        <FormGroup>
          <FormControlLabel
            control={
              <input
                name="search"
                value={searchTerm}
                placeholder="Search..."
                required
                onChange={({ target }) => setSearchTerm(target.value)}
              />
            }
            label="Name"
          />
          <FormControlLabel
            control={
              <select
                name="resource"
                placeholder="Resource"
                value={resource}
                required
                onChange={({ target }) => setResource(target.value)}
              >
                {resources.map((resource) => (
                  <option key={resource} value={resource}>
                    {resource}
                  </option>
                ))}
              </select>
            }
            label="Resource"
          />
        </FormGroup>
        <Button variant="contained" type="submit">
          Search
        </Button>
      </form>
    </FormControl>
  );
};

export default Search;

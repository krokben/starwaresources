import { useState, SyntheticEvent } from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Status, ErrorMessage } from "../App";

const Login = ({
  status,
  errorMessage,
  fetchAndSetResources,
}: {
  status: Status;
  errorMessage: ErrorMessage;
  fetchAndSetResources: (name: string, password: string) => void;
}) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    fetchAndSetResources(name, password);
  };

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormControlLabel
            sx={{ marginLeft: 0, marginBottom: 2 }}
            control={
              <TextField
                sx={{ marginRight: 2 }}
                name="name"
                value={name}
                placeholder="Name"
                required
                onChange={({ target }) => setName(target.value)}
              />
            }
            label="Name"
          />
          <FormControlLabel
            sx={{ marginLeft: 0, marginBottom: 2 }}
            control={
              <TextField
                sx={{ marginRight: 2 }}
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                required
                onChange={({ target }) => setPassword(target.value)}
              />
            }
            label="Password"
          />
        </FormGroup>
        <Button
          variant="contained"
          type="submit"
          disabled={status === Status.Fetching}
        >
          Login
        </Button>
      </form>
      {status === Status.Error && (
        <FormHelperText>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
};

export default Login;

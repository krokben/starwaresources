import { useState, SyntheticEvent } from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { Status, ErrorMessage } from "../App";

const Login = ({
  status,
  errorMessage,
  fetchAndSetData,
}: {
  status: Status;
  errorMessage: ErrorMessage;
  fetchAndSetData: (name: string, password: string) => void;
}) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    fetchAndSetData(name, password);
  };

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormControlLabel
            control={
              <input
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
            control={
              <input
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
        <Button variant="contained" type="submit">
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

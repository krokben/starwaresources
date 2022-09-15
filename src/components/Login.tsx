import { useState, SyntheticEvent } from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

const Login = ({
  fetchAndSetData,
}: {
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
      <FormHelperText>You can display an error</FormHelperText>
    </FormControl>
  );
};

export default Login;

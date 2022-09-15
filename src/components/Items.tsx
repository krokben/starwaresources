import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { SearchResult } from "../types";

const Items = ({ items }: { items: SearchResult[] }) => (
  <List>
    {items.map(({ name }) => (
      <ListItem key={name}>
        <Paper sx={{ padding: 1 }} elevation={1}>
          <Typography>{name}</Typography>
        </Paper>
      </ListItem>
    ))}
  </List>
);

export default Items;

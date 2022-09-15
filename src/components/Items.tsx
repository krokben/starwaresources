import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { SearchResult } from "../types";
import { Link } from "react-router-dom";

const Items = ({
  currentResource,
  items,
}: {
  currentResource: string;
  items: SearchResult[];
}) => (
  <List>
    {items.map(({ id, name }: { id: string; name: string }) => (
      <Link key={name} to={`/resources/${currentResource}/${id}`}>
        <ListItem>
          <Paper sx={{ padding: 1 }} elevation={1}>
            <Typography>{name}</Typography>
          </Paper>
        </ListItem>
      </Link>
    ))}
  </List>
);

export default Items;

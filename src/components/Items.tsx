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
  <List sx={{ width: "100%" }}>
    {items.map(({ id, name }: { id: string; name: string }) => (
      <Link
        key={name}
        style={{ textDecoration: "none" }}
        to={`/resources/${currentResource}/${id}`}
      >
        <ListItem>
          <Paper
            sx={{
              width: "100%",
              padding: 1,
              "&:hover": { backgroundColor: "primary.dark", color: "#fff" },
            }}
            elevation={1}
          >
            <Typography>{name}</Typography>
          </Paper>
        </ListItem>
      </Link>
    ))}
  </List>
);

export default Items;

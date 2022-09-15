import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Resources = ({ resources }: { resources: string[] }) => (
  <List>
    {resources.map((resource) => (
      <ListItem key={resource}>
        <Paper sx={{ padding: 1 }} elevation={1}>
          <Typography>{resource}</Typography>
        </Paper>
      </ListItem>
    ))}
  </List>
);

export default Resources;

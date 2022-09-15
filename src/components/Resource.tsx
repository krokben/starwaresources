import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Resource } from "../types";

export enum Status {
  Idle,
  Fetching,
  Success,
  Error,
}

const ListItemResource = ({ resource }: { resource: Resource }) => (
  <ListItem>
    <Paper sx={{ padding: 1 }} elevation={1}>
      {Object.entries(resource).map(([key, value]) => (
        <Typography key={key}>
          {key}: {value}
        </Typography>
      ))}
    </Paper>
  </ListItem>
);

const Resource = ({ currentResource }: { currentResource: string }) => {
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [resource, setResource] = useState<Resource | null>(null);
  const { id } = useParams();

  const fetchAndSetResource = async () => {
    try {
      setStatus(Status.Fetching);

      const response = await fetch(
        `https://swapi.dev/api/${currentResource}/${id}`
      );

      if (response.status !== 200) {
        setStatus(Status.Error);
        return;
      }

      const data = await response.json();

      setResource(data);
      setStatus(Status.Success);
    } catch (error) {
      console.error(error);
      setStatus(Status.Error);
    }
  };

  useEffect(() => {
    fetchAndSetResource();
  }, []);

  return status === Status.Success && resource ? (
    <List>
      <ListItemResource resource={resource} />
    </List>
  ) : (
    <p>
      {status === Status.Error
        ? "Something went wrong."
        : "A long time ago in a galaxy far, far away..."}
    </p>
  );
};

export default Resource;

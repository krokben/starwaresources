import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Resource } from "../types";

export enum Status {
  Idle,
  Fetching,
  Success,
  Error,
}

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
    <div style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}>
      {Object.entries(resource).map(([key, value]) => (
        <Card key={key} variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {key}
            </Typography>
            <Typography component="div">{value}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  ) : (
    <p>
      {status === Status.Error
        ? "Something went wrong."
        : "A long time ago in a galaxy far, far away..."}
    </p>
  );
};

export default Resource;

import { useState, useEffect } from "react";
import Login from "./components/Login";
import Search from "./components/Search";
import Items from "./components/Items";
import Resource from "./components/Resource";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SearchResult } from "./types";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const ERROR_MESSAGE_UNAUTHORIZED = "Wrong name and/or password.";
const ERROR_MESSAGE_SERVER = "Something went wrong. Please try again.";
const ERROR_MESSAGE_NO_RESULTS = "No results found.";

export type ErrorMessage =
  | typeof ERROR_MESSAGE_UNAUTHORIZED
  | typeof ERROR_MESSAGE_SERVER
  | typeof ERROR_MESSAGE_NO_RESULTS;

export enum Status {
  Idle,
  Fetching,
  Success,
  Error,
}

const getSearchResult = ({ name, url }: { name: string; url: string }) => ({
  id: url.split("/")[url.split("/").length - 2],
  name,
  url,
});

const getResourcesAsSearchResults = (resources: string[]) =>
  resources.map((name) => ({
    id: "",
    name,
    url: `https://swapi.dev/api/${name}`,
  }));

const App = () => {
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ERROR_MESSAGE_UNAUTHORIZED
  );
  const [resources, setResources] = useState<string[]>([]);
  const [currentResource, setCurrentResource] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (window.localStorage.getItem("login")) {
      fetchAndSetResources("", "");
    }
  }, []);

  const getResourcesFromServer = async (login: string) => {
    try {
      const response = await fetch("http://localhost:4000", {
        headers: {
          Authorization:
            "Basic " + (window.localStorage.getItem("login") || login),
        },
      });

      if (response.status !== 200) {
        return {
          serverResources: resources,
          serverCurrentResource: currentResource,
          serverStatus: Status.Error,
          serverErrorMessage:
            response.status !== 401 ? errorMessage : ERROR_MESSAGE_SERVER,
        };
      }

      const data = await response.json();
      const serverResources = Object.keys(data);

      return {
        serverResources,
        serverCurrentResource: serverResources[0],
        serverStatus: Status.Success,
        serverErrorMessage: errorMessage,
      };
    } catch (error) {
      console.error(error);
      return {
        serverResources: resources,
        serverCurrentResource: currentResource,
        serverStatus: Status.Error,
        serverErrorMessage: ERROR_MESSAGE_SERVER,
      };
    }
  };

  const fetchAndSetResources = async (name: string, password: string) => {
    setStatus(Status.Fetching);

    const login = btoa(unescape(encodeURIComponent(`${name}:${password}`)));

    const {
      serverResources,
      serverCurrentResource,
      serverStatus,
      serverErrorMessage,
    } = await getResourcesFromServer(login);

    setCurrentResource(serverCurrentResource);
    setResources(serverResources);

    if (
      serverStatus === Status.Success &&
      !window.localStorage.getItem("login")
    ) {
      window.localStorage.setItem("login", login);
    }

    if (typeof serverErrorMessage !== "string") {
      setErrorMessage(serverErrorMessage);
    }
    setStatus(serverStatus);
  };

  const getSearchResultsFromApi = async (searchTerm: string) => {
    try {
      const response = await fetch(
        `https://swapi.dev/api/${currentResource}?search=${searchTerm}`
      );

      if (response.status !== 200) {
        return [searchResults, Status.Error, ERROR_MESSAGE_SERVER];
      }

      const data = await response.json();

      if (data.count === 0) {
        return [searchResults, Status.Error, ERROR_MESSAGE_NO_RESULTS];
      }

      return [data.results.map(getSearchResult), Status.Success, null];
    } catch (error) {
      console.error(error);
      setStatus(Status.Error);
      return [searchResults, Status.Error, ERROR_MESSAGE_SERVER];
    }
  };

  const handleSearch = async (searchTerm: string) => {
    setStatus(Status.Fetching);

    const [apiResults, apiStatus, apiErrorMessage] =
      await getSearchResultsFromApi(searchTerm);

    setSearchResults(apiResults);

    if (apiErrorMessage) {
      setErrorMessage(apiErrorMessage);
    }

    setStatus(apiStatus);
  };

  return (
    <Container sx={{ maxWidth: 1024 }}>
      {resources.length === 0 ? (
        <Login
          fetchAndSetResources={fetchAndSetResources}
          status={status}
          errorMessage={errorMessage}
        />
      ) : (
        <>
          <Search
            resources={resources}
            currentResource={currentResource}
            setCurrentResource={setCurrentResource}
            handleSearch={handleSearch}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              minHeight: "20vh",
              backgroundColor: "primary.light",
            }}
          >
            {status === Status.Fetching && (
              <Typography color="#fff">
                A long time ago in a galaxy far, far away...
              </Typography>
            )}
            {status === Status.Success && (
              <>
                <BrowserRouter>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Items
                          currentResource={currentResource}
                          items={
                            searchResults.length
                              ? searchResults
                              : getResourcesAsSearchResults(resources)
                          }
                        />
                      }
                    />
                    <Route
                      path={`resources/${currentResource}`}
                      element={
                        <Link
                          style={{ textDecoration: "none" }}
                          to="/"
                          onClick={() => setSearchResults([])}
                        >
                          <Button variant="contained" type="submit">
                            Go back
                          </Button>
                        </Link>
                      }
                    />
                    <Route
                      path={`resources/${currentResource}/:id`}
                      element={
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <Resource currentResource={currentResource} />
                          <Link
                            style={{ textDecoration: "none" }}
                            to="/"
                            onClick={() => setSearchResults([])}
                          >
                            <Button variant="contained" type="submit">
                              Go back
                            </Button>
                          </Link>
                        </div>
                      }
                    />
                  </Routes>
                </BrowserRouter>
              </>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default App;

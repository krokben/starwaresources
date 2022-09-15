import { useState, useEffect } from "react";
import Login from "./components/Login";
import Search from "./components/Search";
import Items from "./components/Items";
import Resource from "./components/Resource";
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

  const fetchAndSetResources = async (name: string, password: string) => {
    try {
      setStatus(Status.Fetching);

      const login = btoa(unescape(encodeURIComponent(`${name}:${password}`)));

      const response = await fetch("http://localhost:4000", {
        headers: {
          Authorization:
            "Basic " + (window.localStorage.getItem("login") || login),
        },
      });

      if (response.status !== 200) {
        setStatus(Status.Error);
        setErrorMessage(
          response.status === 401
            ? ERROR_MESSAGE_UNAUTHORIZED
            : ERROR_MESSAGE_SERVER
        );
        return;
      }

      const data = await response.json();
      const resourceNames = Object.keys(data);
      setCurrentResource(resourceNames[0]);
      setResources(resourceNames);

      if (!window.localStorage.getItem("login")) {
        window.localStorage.setItem("login", login);
      }

      setStatus(Status.Success);
    } catch (error) {
      console.error(error);
      setStatus(Status.Error);
    }
  };

  const fetchAndSetResource = async (resource: string, searchTerm: string) => {
    try {
      setStatus(Status.Fetching);

      const response = await fetch(
        `https://swapi.dev/api/${resource}?search=${searchTerm}`
      );

      if (response.status !== 200) {
        setStatus(Status.Error);
        setErrorMessage(ERROR_MESSAGE_SERVER);
        return;
      }

      const data = await response.json();

      if (data.count === 0) {
        setErrorMessage(ERROR_MESSAGE_NO_RESULTS);
        setStatus(Status.Error);
      }

      setCurrentResource(resource);
      setSearchResults(data.results.map(getSearchResult));
      setStatus(Status.Success);
    } catch (error) {
      console.error(error);
      setStatus(Status.Error);
    }
  };

  return (
    <main>
      {status !== Status.Fetching && status !== Status.Success && (
        <Login
          fetchAndSetResources={fetchAndSetResources}
          status={status}
          errorMessage={errorMessage}
        />
      )}
      {status === Status.Fetching && (
        <p>A long time ago in a galaxy far, far away...</p>
      )}
      {status === Status.Success && (
        <>
          <Search
            resources={resources}
            currentResource={currentResource}
            setCurrentResource={setCurrentResource}
            fetchAndSetResource={fetchAndSetResource}
          />
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
                  <Link to="/" onClick={() => setSearchResults([])}>
                    <Button variant="contained" color="secondary" type="submit">
                      Go back
                    </Button>
                  </Link>
                }
              />
              <Route
                path={`resources/${currentResource}/:id`}
                element={
                  <>
                    <Resource currentResource={currentResource} />
                    <Link to="/" onClick={() => setSearchResults([])}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                      >
                        Go back
                      </Button>
                    </Link>
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </main>
  );
};

export default App;

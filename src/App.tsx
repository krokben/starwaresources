import { useState, useEffect } from "react";
import Login from "./components/Login";

const ERROR_MESSAGE_UNAUTHORIZED = "Wrong name and/or password.";
const ERROR_MESSAGE_SERVER = "Something went wrong. Please try again.";

export type ErrorMessage =
  | typeof ERROR_MESSAGE_UNAUTHORIZED
  | typeof ERROR_MESSAGE_SERVER;

export enum Status {
  Idle,
  Fetching,
  Success,
  Error,
}

const App = () => {
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ERROR_MESSAGE_UNAUTHORIZED
  );

  useEffect(() => {
    if (window.localStorage.getItem("login")) {
      fetchAndSetData("", "");
    }
  }, []);

  const fetchAndSetData = async (name: string, password: string) => {
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

      if (!window.localStorage.getItem("login")) {
        window.localStorage.setItem("login", login);
      }

      setStatus(Status.Success);
    } catch (error) {
      console.error(error);
      setStatus(Status.Error);
    }
  };

  return (
    <main>
      {status !== Status.Success && (
        <Login
          fetchAndSetData={fetchAndSetData}
          status={status}
          errorMessage={errorMessage}
        />
      )}
    </main>
  );
};

export default App;

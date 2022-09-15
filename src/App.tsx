import Login from "./components/Login";

const App = () => {
  const fetchAndSetData = async (name: string, password: string) => {
    const response = await fetch("http://localhost:4000", {
      headers: {
        Authorization:
          "Basic " + btoa(unescape(encodeURIComponent(`${name}:${password}`))),
      },
    });

    if (response.status !== 200) {
      return;
    }

    const data = await response.json();
    console.log(data);
  };

  return (
    <main>
      <Login fetchAndSetData={fetchAndSetData} />
    </main>
  );
};

export default App;

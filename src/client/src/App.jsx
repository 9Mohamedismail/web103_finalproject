import { useEffect, useState } from "react";
import { useRoutes, Link } from "react-router-dom";

import Navbar from "./components/layout/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import DiscoverPage from "./pages/DiscoverPage.jsx";

const API_URL = "http://localhost:3001";

function App() {
  const [user, setUser] = useState(null);

  //user get
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/login/success`, {
          credentials: "include",
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const json = await response.json();
        setUser(json.user);
      } catch {
        setUser(null);
      }
    };

    getUser();
  }, []);

  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      credentials: "include",
    });
    window.location.href = "/";
  };

  //page route elements
  let element = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/discover",
      element: <DiscoverPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <>
      <Navbar apiUrl={API_URL} user={user} onLogout={logout} />
      {element}
    </>
  );
}

export default App;

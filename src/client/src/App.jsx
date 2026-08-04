import { useEffect, useState } from "react";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";

import Navbar from "./components/layout/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Discover from "./pages/Discover.jsx";
import Profile from "./pages/Profile.jsx";
import Recommendations from "./pages/Recommendations.jsx";
import CardDetails from "./pages/CardDetails.jsx";
import Reviews from "./pages/Reviews.jsx";
import Favorites from "./pages/Favorites.jsx";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(
  /\/+$/,
  "",
);

function App() {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

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
        setAuthError(
          "Account features are temporarily unavailable. You can still browse cards.",
        );
      } finally {
        setIsAuthLoading(false);
      }
    };

    getUser();
  }, []);

  const logout = async () => {
    setAuthError("");

    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Unable to log out");

      setUser(null);
      navigate("/");
    } catch {
      setAuthError("We couldn't log you out. Please try again.");
    }
  };

  const updateUser = (updates) => {
    setUser((currentUser) =>
      currentUser ? { ...currentUser, ...updates } : currentUser,
    );
  };

  const privatePage = (page) => {
    if (isAuthLoading) {
      return (
        <main className="private-route-status" aria-live="polite">
          Loading your account...
        </main>
      );
    }

    return user?.id ? page : <Navigate to="/" replace />;
  };

  const element = useRoutes([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/discover",
      element: <Discover apiUrl={API_URL} user={user} />,
    },
    {
      path: "/profile",
      element: privatePage(
        <Profile
          apiUrl={API_URL}
          user={user}
          onUserUpdate={updateUser}
        />,
      ),
    },
    {
      path: "/reviews",
      element: privatePage(<Reviews apiUrl={API_URL} />),
    },
    {
      path: "/favorites",
      element: privatePage(<Favorites apiUrl={API_URL} />),
    },
    {
      path: "/recommendations",
      element: (
        <Recommendations
          apiUrl={API_URL}
          user={user}
          isAuthLoading={isAuthLoading}
        />
      ),
    },
    {
      path: "/cards/:id",
      element: <CardDetails apiUrl={API_URL} user={user} />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <>
      <Navbar
        apiUrl={API_URL}
        user={user}
        isAuthLoading={isAuthLoading}
        authError={authError}
        onLogout={logout}
      />
      {element}
    </>
  );
}

export default App;

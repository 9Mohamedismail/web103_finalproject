import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <main className="not-found-page">
      <h1>Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/">Return to CardMaxer</Link>
    </main>
  );
}

export default ErrorPage;

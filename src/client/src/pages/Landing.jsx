import LandingHero from "../components/landing/LandingHero.jsx";
import HowItWorksSection from "../components/landing/HowItWorksSection.jsx";
import { useSearchParams } from "react-router-dom";
import "../css/Landing.css";

function Landing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const loginFailed = searchParams.get("login") === "failed";

  function dismissLoginError() {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("login");
    setSearchParams(nextSearchParams, { replace: true });
  }

  return (
    <main className="landing">
      {loginFailed && (
        <div className="landing__auth-error" role="alert">
          <span>GitHub login was not completed. Please try again.</span>
          <button type="button" onClick={dismissLoginError}>
            Dismiss
          </button>
        </div>
      )}
      <LandingHero />
      <HowItWorksSection />
    </main>
  );
}

export default Landing;

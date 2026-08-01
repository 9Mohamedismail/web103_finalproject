import LandingHero from "../components/landing/LandingHero.jsx";
import HowItWorksSection from "../components/landing/HowItWorksSection.jsx";
import "../css/Landing.css";

function Landing() {
  return (
    <main className="landing">
      <LandingHero />
      <HowItWorksSection />
    </main>
  );
}

export default Landing;

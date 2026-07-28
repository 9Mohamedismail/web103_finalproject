import HeroSection from "../components/home/HeroSection.jsx";
import HowItWorks from "../components/home/HowItWorks.jsx";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <main>
        <HeroSection />
        <HowItWorks />
      </main>
    </div>
  );
}

export default HomePage;

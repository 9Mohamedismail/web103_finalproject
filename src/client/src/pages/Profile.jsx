import CreditScoreCard from "../components/profile/CreditScoreCard.jsx";
import RecentReviews from "../components/profile/RecentReviews.jsx";
import SavedCards from "../components/profile/SavedCards.jsx";
import "../css/Profile.css";

function Profile({ apiUrl, user, onUserUpdate }) {
  return (
    <main className="profile-page">
      <div className="profile-page__container">
        <header className="profile-page__header">
          <h1>Your CardMaxer Activity</h1>
          <p>Update your credit score, revisit reviews, and manage saved cards.</p>
        </header>

        <div className="profile-page__grid">
          <CreditScoreCard
            apiUrl={apiUrl}
            creditScore={user.credit_score}
            onCreditScoreUpdated={(creditScore) =>
              onUserUpdate({ credit_score: creditScore })
            }
          />
          <RecentReviews apiUrl={apiUrl} />
          <SavedCards apiUrl={apiUrl} />
        </div>
      </div>
    </main>
  );
}

export default Profile;

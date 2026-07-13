# Entity Relationship Diagram

Reference the **Creating an Entity Relationship Diagram** final project guide in the course portal for more information about completing this deliverable.

> **Note:** This ERD is an early draft and is not final. As development continues, we may simplify the database, remove tables that are not needed, or adjust columns and relationships based on the final scope of the application.

## Create the List of Tables

The current CardMaxer database design includes the following tables:

- **users** — Stores user account information, login credentials, credit scores, and account creation dates.
- **credit_cards** — Stores credit card details such as the issuer, rewards, fees, APR, benefits, drawbacks, and recommended credit score.
- **favorites** — Connects users to the credit cards they have saved as favorites.
- **reviews** — Stores ratings and written reviews submitted by users for specific credit cards.
- **recommendations** — Stores personalized credit card recommendations for users, including a match score and explanation.
- **spending_categories** — Stores available spending categories, such as travel, dining, groceries, or gas.
- **user_spending_interests** — Connects users to the spending categories they are interested in.
- **card_spending_categories** — Connects credit cards to the spending categories where they provide rewards or benefits.

## Entity Relationship Diagram

The diagram below shows the current draft of the database tables, columns, primary keys, foreign keys, and relationships used in CardMaxer.

![CardMaxer Entity Relationship Diagram](https://raw.githubusercontent.com/9Mohamedismail/web103_finalproject/main/planning/CardMaxer%20ERD%20draft.png)

## Table Relationships

- One user can have many favorites, reviews, recommendations, and spending interests.
- One credit card can appear in many favorites, reviews, recommendations, and spending categories.
- The **favorites** table creates a many-to-many relationship between users and credit cards.
- The **user_spending_interests** table creates a many-to-many relationship between users and spending categories.
- The **card_spending_categories** table creates a many-to-many relationship between credit cards and spending categories.

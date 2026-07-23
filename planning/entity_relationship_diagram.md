# Entity Relationship Diagram

Reference the **Creating an Entity Relationship Diagram** final project guide in the course portal for more information about completing this deliverable.

> **Note:** This ERD is an early draft and is not final. As development continues, we may simplify the database, remove tables that are not needed, or adjust columns and relationships based on the final scope of the application.

## Create the List of Tables

The current CardMaxer database design includes the following tables:

- **users** - Stores user account information, login credentials, credit scores, and account creation dates.
- **credit_cards** - Stores the CardAPI id for each external credit card that users have favorited or reviewed. Card details such as issuer, rewards, fees, APR, benefits, drawbacks, and recommended credit score should come from CardAPI.
- **favorites** - Connects users to the credit cards they have saved as favorites.
- **reviews** - Stores ratings and written reviews submitted by users for specific credit cards.

## Entity Relationship Diagram

The diagram below is an early draft image and may still show older tables. The active backend schema now uses the four-table design listed above.

![CardMaxer Entity Relationship Diagram](https://raw.githubusercontent.com/9Mohamedismail/web103_finalproject/main/planning/CardMaxer%20ERD%20draft.png)

## Table Relationships

- One user can have many favorites and reviews.
- One credit card can appear in many favorites and reviews.
- The **favorites** table creates a many-to-many relationship between users and credit cards.

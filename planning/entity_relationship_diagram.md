# CardMaxer Entity Relationship Diagram

The final CardMaxer database contains four tables. Credit card details are stored in PostgreSQL and loaded from the maintained catalog in `src/server/data/cardData.js`; the application does not call an external card API at runtime.

```mermaid
erDiagram
    users ||--o{ favorites : saves
    users ||--o{ reviews : writes
    credit_cards ||--o{ favorites : receives
    credit_cards ||--o{ reviews : receives

    users {
        integer id PK
        bigint githubid UK
        varchar username
        integer credit_score
        timestamptz created_at
    }

    credit_cards {
        integer id PK
        varchar card_id UK
        varchar name
        varchar issuer
        varchar network
        varchar card_type
        text image_url
        double annual_fee
        char country
        double foreign_transaction_fee
        jsonb signup_bonus
        jsonb reward_rates
        jsonb benefits
        integer credit_score_min
        timestamptz updated_at
        timestamptz created_at
    }

    favorites {
        integer id PK
        integer user_id FK
        integer credit_card_id FK
        timestamptz created_at
    }

    reviews {
        integer id PK
        integer user_id FK
        integer credit_card_id FK
        integer rating
        text review_text
        timestamptz created_at
        timestamptz updated_at
    }
```

Each user can favorite a card once and review a card once. Deleting a user or card cascades to its related favorites and reviews.

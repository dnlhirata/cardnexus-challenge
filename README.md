# CardNexus

## Project Setup

Follow these instructions to set up and start the project.

### Prerequisites

Make sure you have the following installed:
- [Docker](https://nodejs.org/)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/cardnexus.git
    cd cardnexus
    ```

### Starting the Project

1. Start the MongoDB server:
    ```sh
    docker compose up -d
    ```

The application should now be running at `http://localhost:3000`.

### Ingesting Initial Data

1. Run the data ingestion script:
    ```sh
    docker compose exec app npm run ingest-data
    ```

This script will populate the database with the initial data for the project (found at src/data).

### API Endpoint
The backend exposes several filtering options for retrieving cards. You can filter cards based on the following fields:
- game
- name (supports partial text matching)
- rarity
- color (MTG-specific)
- ink_cost (Lorcana-specific)

#### Examples
```sh
- Search by game
GET /api/cards?game=mtg
GET /api/cards?game=lorcana

- Search by name
GET /api/cards?name=Hades

- Search by rarity
GET /api/cards?rarity=rare
GET /api/cards?rarity=rare,mythic

- Search by color
GET /api/cards?color=U
GET /api/cards?color=U,R,G

- Search by ink_cost
GET /api/cards?ink_cost=2
GET /api/cards?ink_cost=2-5

- Combined filters:
GET /api/cards?ink_cost=3-5&rarity=rare
```

### Extensability
### Adding a new game
To add a new game to the system:
1. Add new game enum to `Game`
2. Introduce a new interface for the game-specific attributes
3. Add the new interface to the `ICard`
   
#### Adding attributes
To add a new attribute for an existing game, let's say `power` for MTG cards, only a few steps would be necessary:
1. Add the new attribute to `MTGCardAttributes` interface
2. Update the API filtering inside the function `buildFilters` in `CardRepo.ts` with the desired filter logic



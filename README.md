# Pack Calculator (React + TypeScript + Vite)

Bootstrapped with https://vite.dev/ (Vite), this is a simple web app to calculate optimal pack combinations for orders. Enter an order quantity, and it figures out the best mix of pack sizes to fulfill it with minimal waste.

## What it does

Say you sell items in packs of 250, 500, 1000, 2000, and 5000. A customer orders 501 items. This app tells you: ship one 500-pack and one 250-pack (751 total, only 250 extra).


### Reasoning note (fetch vs axios)

When I'm working on a quick project or just whipping up a script, I go with fetch. But when I want a smoother developer experience, global error handling, or interceptors, then Axios is my go-to.

And the cool thing? You can totally wrap fetch in your own setup to make it feel like Axios while keeping your bundle nice and light!

## Running locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Configuration

The API URL is configured via environment variables. Default is `http://localhost:8080`.

To change it, create a `.env.local` file (not committed to git):

```bash
VITE_API_BASE=https://your-api-url.com
```

## API endpoints

The app talks to two endpoints:

- `GET /pack-sizes` - Fetches available pack sizes
- `POST /packs` - Calculates optimal packs for an order
- `PUT /pack-sizes` - Updates the available pack sizes

## Project structure

```
src/
├── components/
│   ├── OrderInput.tsx        # Order amount form
│   ├── PackSizeEditor.tsx    # Add/remove pack sizes
│   ├── ResultDisplay.tsx     # Shows calculated packs
│   └── ErrorMessage.tsx      # Error display
├── hooks/
│   └── usePackCalculator.ts  # API logic and state management
├── types.ts                  # TypeScript interfaces
└── App.tsx                   # Main app layout
```

## Components

**OrderInput** - A form where you type the order quantity and hit Calculate. Simple and focused.

**PackSizeEditor** - Shows current pack sizes as removable tags. Has an input to add new sizes. Changes sync to the server automatically.

**ResultDisplay** - Shows the calculation result: which packs to use, how many of each, and the total items shipped.

**ErrorMessage** - Displays errors when something goes wrong (API down, invalid input, etc.).

## The custom hook

`usePackCalculator` handles all the data fetching and state. It:

- Loads pack sizes on mount
- Cancels in-flight requests when needed (no stale data bugs)
- Exposes simple functions: `calculatePacks`, `addPackSize`, `removePackSize`

## Tech stack

- React 19
- TypeScript
- Vite
- CSS Modules

## Author

Victor Cayetano

- [Certifications](https://www.credly.com/users/victor-cayetano.cc38e891/badges#credly)
- [LinkedIn](https://www.linkedin.com/in/victor-cayetano-629403113/)

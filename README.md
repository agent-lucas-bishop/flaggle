# 🏁 Flaggle

**Daily flag guessing game.** A country's flag is progressively revealed — guess which country it belongs to in 6 tries.

## How It Works

- Each day, a new country is selected from 120+ nations
- The flag starts mostly hidden with a tiny peek
- Each wrong guess reveals more of the flag + a new clue (continent, population range, capital letter, language, name length)
- Guess correctly to earn glory. Share your results!

## Tech Stack

- **Vite + React + TypeScript**
- **flagcdn.com** for flag images (free, no auth)
- Seeded daily puzzle from date
- LocalStorage for game persistence
- Zero backend required

## Design

Bold Olympic/athletic aesthetic — Oswald typography, gold & navy palette, medal-podium energy. Flags displayed in a gold-bordered arena with smooth clip-path reveal animations.

## Run Locally

```bash
npm install
npm run dev
```

## License

MIT

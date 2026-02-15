import { useState, useCallback, useRef } from 'react'
import './App.css'

interface Country {
  name: string
  code: string
  continent: string
  population: number
  capital: string
  languages: string[]
}

// Full country list with data (curated for good flags)
const COUNTRIES: Country[] = [
  { name: "Afghanistan", code: "AF", continent: "Asia", population: 40099462, capital: "Kabul", languages: ["Pashto","Dari"] },
  { name: "Albania", code: "AL", continent: "Europe", population: 2877800, capital: "Tirana", languages: ["Albanian"] },
  { name: "Algeria", code: "DZ", continent: "Africa", population: 44700000, capital: "Algiers", languages: ["Arabic"] },
  { name: "Argentina", code: "AR", continent: "South America", population: 45810000, capital: "Buenos Aires", languages: ["Spanish"] },
  { name: "Armenia", code: "AM", continent: "Asia", population: 2963200, capital: "Yerevan", languages: ["Armenian"] },
  { name: "Australia", code: "AU", continent: "Oceania", population: 26000000, capital: "Canberra", languages: ["English"] },
  { name: "Austria", code: "AT", continent: "Europe", population: 9100000, capital: "Vienna", languages: ["German"] },
  { name: "Azerbaijan", code: "AZ", continent: "Asia", population: 10200000, capital: "Baku", languages: ["Azerbaijani"] },
  { name: "Bangladesh", code: "BD", continent: "Asia", population: 170000000, capital: "Dhaka", languages: ["Bengali"] },
  { name: "Belarus", code: "BY", continent: "Europe", population: 9400000, capital: "Minsk", languages: ["Belarusian","Russian"] },
  { name: "Belgium", code: "BE", continent: "Europe", population: 11600000, capital: "Brussels", languages: ["Dutch","French","German"] },
  { name: "Bhutan", code: "BT", continent: "Asia", population: 780000, capital: "Thimphu", languages: ["Dzongkha"] },
  { name: "Bolivia", code: "BO", continent: "South America", population: 12000000, capital: "Sucre", languages: ["Spanish"] },
  { name: "Bosnia and Herzegovina", code: "BA", continent: "Europe", population: 3270000, capital: "Sarajevo", languages: ["Bosnian","Croatian","Serbian"] },
  { name: "Brazil", code: "BR", continent: "South America", population: 214000000, capital: "Brasília", languages: ["Portuguese"] },
  { name: "Brunei", code: "BN", continent: "Asia", population: 450000, capital: "Bandar Seri Begawan", languages: ["Malay"] },
  { name: "Bulgaria", code: "BG", continent: "Europe", population: 6520000, capital: "Sofia", languages: ["Bulgarian"] },
  { name: "Cambodia", code: "KH", continent: "Asia", population: 17000000, capital: "Phnom Penh", languages: ["Khmer"] },
  { name: "Cameroon", code: "CM", continent: "Africa", population: 27000000, capital: "Yaoundé", languages: ["French","English"] },
  { name: "Canada", code: "CA", continent: "North America", population: 39000000, capital: "Ottawa", languages: ["English","French"] },
  { name: "Chile", code: "CL", continent: "South America", population: 19500000, capital: "Santiago", languages: ["Spanish"] },
  { name: "China", code: "CN", continent: "Asia", population: 1412000000, capital: "Beijing", languages: ["Mandarin"] },
  { name: "Colombia", code: "CO", continent: "South America", population: 51900000, capital: "Bogotá", languages: ["Spanish"] },
  { name: "Costa Rica", code: "CR", continent: "North America", population: 5200000, capital: "San José", languages: ["Spanish"] },
  { name: "Croatia", code: "HR", continent: "Europe", population: 3880000, capital: "Zagreb", languages: ["Croatian"] },
  { name: "Cuba", code: "CU", continent: "North America", population: 11300000, capital: "Havana", languages: ["Spanish"] },
  { name: "Cyprus", code: "CY", continent: "Europe", population: 1210000, capital: "Nicosia", languages: ["Greek","Turkish"] },
  { name: "Czech Republic", code: "CZ", continent: "Europe", population: 10700000, capital: "Prague", languages: ["Czech"] },
  { name: "Denmark", code: "DK", continent: "Europe", population: 5900000, capital: "Copenhagen", languages: ["Danish"] },
  { name: "Dominican Republic", code: "DO", continent: "North America", population: 11000000, capital: "Santo Domingo", languages: ["Spanish"] },
  { name: "Ecuador", code: "EC", continent: "South America", population: 18000000, capital: "Quito", languages: ["Spanish"] },
  { name: "Egypt", code: "EG", continent: "Africa", population: 104000000, capital: "Cairo", languages: ["Arabic"] },
  { name: "Estonia", code: "EE", continent: "Europe", population: 1330000, capital: "Tallinn", languages: ["Estonian"] },
  { name: "Ethiopia", code: "ET", continent: "Africa", population: 120000000, capital: "Addis Ababa", languages: ["Amharic"] },
  { name: "Finland", code: "FI", continent: "Europe", population: 5500000, capital: "Helsinki", languages: ["Finnish","Swedish"] },
  { name: "France", code: "FR", continent: "Europe", population: 67800000, capital: "Paris", languages: ["French"] },
  { name: "Georgia", code: "GE", continent: "Asia", population: 3700000, capital: "Tbilisi", languages: ["Georgian"] },
  { name: "Germany", code: "DE", continent: "Europe", population: 83200000, capital: "Berlin", languages: ["German"] },
  { name: "Ghana", code: "GH", continent: "Africa", population: 33000000, capital: "Accra", languages: ["English"] },
  { name: "Greece", code: "GR", continent: "Europe", population: 10400000, capital: "Athens", languages: ["Greek"] },
  { name: "Guatemala", code: "GT", continent: "North America", population: 17600000, capital: "Guatemala City", languages: ["Spanish"] },
  { name: "Hungary", code: "HU", continent: "Europe", population: 9700000, capital: "Budapest", languages: ["Hungarian"] },
  { name: "Iceland", code: "IS", continent: "Europe", population: 376000, capital: "Reykjavik", languages: ["Icelandic"] },
  { name: "India", code: "IN", continent: "Asia", population: 1408000000, capital: "New Delhi", languages: ["Hindi","English"] },
  { name: "Indonesia", code: "ID", continent: "Asia", population: 278000000, capital: "Jakarta", languages: ["Indonesian"] },
  { name: "Iran", code: "IR", continent: "Asia", population: 87000000, capital: "Tehran", languages: ["Persian"] },
  { name: "Iraq", code: "IQ", continent: "Asia", population: 43000000, capital: "Baghdad", languages: ["Arabic","Kurdish"] },
  { name: "Ireland", code: "IE", continent: "Europe", population: 5100000, capital: "Dublin", languages: ["English","Irish"] },
  { name: "Israel", code: "IL", continent: "Asia", population: 9600000, capital: "Jerusalem", languages: ["Hebrew","Arabic"] },
  { name: "Italy", code: "IT", continent: "Europe", population: 58900000, capital: "Rome", languages: ["Italian"] },
  { name: "Jamaica", code: "JM", continent: "North America", population: 2800000, capital: "Kingston", languages: ["English"] },
  { name: "Japan", code: "JP", continent: "Asia", population: 125000000, capital: "Tokyo", languages: ["Japanese"] },
  { name: "Jordan", code: "JO", continent: "Asia", population: 11200000, capital: "Amman", languages: ["Arabic"] },
  { name: "Kazakhstan", code: "KZ", continent: "Asia", population: 19600000, capital: "Astana", languages: ["Kazakh","Russian"] },
  { name: "Kenya", code: "KE", continent: "Africa", population: 54000000, capital: "Nairobi", languages: ["Swahili","English"] },
  { name: "Kuwait", code: "KW", continent: "Asia", population: 4300000, capital: "Kuwait City", languages: ["Arabic"] },
  { name: "Laos", code: "LA", continent: "Asia", population: 7500000, capital: "Vientiane", languages: ["Lao"] },
  { name: "Latvia", code: "LV", continent: "Europe", population: 1840000, capital: "Riga", languages: ["Latvian"] },
  { name: "Lebanon", code: "LB", continent: "Asia", population: 5500000, capital: "Beirut", languages: ["Arabic"] },
  { name: "Libya", code: "LY", continent: "Africa", population: 7000000, capital: "Tripoli", languages: ["Arabic"] },
  { name: "Lithuania", code: "LT", continent: "Europe", population: 2790000, capital: "Vilnius", languages: ["Lithuanian"] },
  { name: "Luxembourg", code: "LU", continent: "Europe", population: 645000, capital: "Luxembourg City", languages: ["French","German","Luxembourgish"] },
  { name: "Malaysia", code: "MY", continent: "Asia", population: 33000000, capital: "Kuala Lumpur", languages: ["Malay"] },
  { name: "Mexico", code: "MX", continent: "North America", population: 128000000, capital: "Mexico City", languages: ["Spanish"] },
  { name: "Mongolia", code: "MN", continent: "Asia", population: 3400000, capital: "Ulaanbaatar", languages: ["Mongolian"] },
  { name: "Morocco", code: "MA", continent: "Africa", population: 37000000, capital: "Rabat", languages: ["Arabic","Berber"] },
  { name: "Mozambique", code: "MZ", continent: "Africa", population: 32000000, capital: "Maputo", languages: ["Portuguese"] },
  { name: "Myanmar", code: "MM", continent: "Asia", population: 54000000, capital: "Naypyidaw", languages: ["Burmese"] },
  { name: "Nepal", code: "NP", continent: "Asia", population: 30000000, capital: "Kathmandu", languages: ["Nepali"] },
  { name: "Netherlands", code: "NL", continent: "Europe", population: 17600000, capital: "Amsterdam", languages: ["Dutch"] },
  { name: "New Zealand", code: "NZ", continent: "Oceania", population: 5100000, capital: "Wellington", languages: ["English","Māori"] },
  { name: "Nigeria", code: "NG", continent: "Africa", population: 218000000, capital: "Abuja", languages: ["English"] },
  { name: "North Korea", code: "KP", continent: "Asia", population: 26000000, capital: "Pyongyang", languages: ["Korean"] },
  { name: "North Macedonia", code: "MK", continent: "Europe", population: 1830000, capital: "Skopje", languages: ["Macedonian"] },
  { name: "Norway", code: "NO", continent: "Europe", population: 5400000, capital: "Oslo", languages: ["Norwegian"] },
  { name: "Oman", code: "OM", continent: "Asia", population: 5200000, capital: "Muscat", languages: ["Arabic"] },
  { name: "Pakistan", code: "PK", continent: "Asia", population: 230000000, capital: "Islamabad", languages: ["Urdu","English"] },
  { name: "Panama", code: "PA", continent: "North America", population: 4400000, capital: "Panama City", languages: ["Spanish"] },
  { name: "Paraguay", code: "PY", continent: "South America", population: 7400000, capital: "Asunción", languages: ["Spanish","Guarani"] },
  { name: "Peru", code: "PE", continent: "South America", population: 33700000, capital: "Lima", languages: ["Spanish"] },
  { name: "Philippines", code: "PH", continent: "Asia", population: 113000000, capital: "Manila", languages: ["Filipino","English"] },
  { name: "Poland", code: "PL", continent: "Europe", population: 37700000, capital: "Warsaw", languages: ["Polish"] },
  { name: "Portugal", code: "PT", continent: "Europe", population: 10300000, capital: "Lisbon", languages: ["Portuguese"] },
  { name: "Qatar", code: "QA", continent: "Asia", population: 2900000, capital: "Doha", languages: ["Arabic"] },
  { name: "Romania", code: "RO", continent: "Europe", population: 19000000, capital: "Bucharest", languages: ["Romanian"] },
  { name: "Russia", code: "RU", continent: "Europe", population: 144000000, capital: "Moscow", languages: ["Russian"] },
  { name: "Saudi Arabia", code: "SA", continent: "Asia", population: 35000000, capital: "Riyadh", languages: ["Arabic"] },
  { name: "Senegal", code: "SN", continent: "Africa", population: 17200000, capital: "Dakar", languages: ["French"] },
  { name: "Serbia", code: "RS", continent: "Europe", population: 6660000, capital: "Belgrade", languages: ["Serbian"] },
  { name: "Singapore", code: "SG", continent: "Asia", population: 5900000, capital: "Singapore", languages: ["English","Malay","Mandarin","Tamil"] },
  { name: "Slovakia", code: "SK", continent: "Europe", population: 5460000, capital: "Bratislava", languages: ["Slovak"] },
  { name: "Slovenia", code: "SI", continent: "Europe", population: 2100000, capital: "Ljubljana", languages: ["Slovenian"] },
  { name: "Somalia", code: "SO", continent: "Africa", population: 17100000, capital: "Mogadishu", languages: ["Somali","Arabic"] },
  { name: "South Africa", code: "ZA", continent: "Africa", population: 60000000, capital: "Pretoria", languages: ["Zulu","Xhosa","Afrikaans","English"] },
  { name: "South Korea", code: "KR", continent: "Asia", population: 51700000, capital: "Seoul", languages: ["Korean"] },
  { name: "Spain", code: "ES", continent: "Europe", population: 47400000, capital: "Madrid", languages: ["Spanish"] },
  { name: "Sri Lanka", code: "LK", continent: "Asia", population: 22000000, capital: "Sri Jayawardenepura Kotte", languages: ["Sinhala","Tamil"] },
  { name: "Sudan", code: "SD", continent: "Africa", population: 44000000, capital: "Khartoum", languages: ["Arabic","English"] },
  { name: "Sweden", code: "SE", continent: "Europe", population: 10400000, capital: "Stockholm", languages: ["Swedish"] },
  { name: "Switzerland", code: "CH", continent: "Europe", population: 8700000, capital: "Bern", languages: ["German","French","Italian","Romansh"] },
  { name: "Syria", code: "SY", continent: "Asia", population: 22000000, capital: "Damascus", languages: ["Arabic"] },
  { name: "Taiwan", code: "TW", continent: "Asia", population: 23600000, capital: "Taipei", languages: ["Mandarin"] },
  { name: "Tanzania", code: "TZ", continent: "Africa", population: 63000000, capital: "Dodoma", languages: ["Swahili","English"] },
  { name: "Thailand", code: "TH", continent: "Asia", population: 72000000, capital: "Bangkok", languages: ["Thai"] },
  { name: "Tunisia", code: "TN", continent: "Africa", population: 12000000, capital: "Tunis", languages: ["Arabic"] },
  { name: "Turkey", code: "TR", continent: "Asia", population: 85000000, capital: "Ankara", languages: ["Turkish"] },
  { name: "Uganda", code: "UG", continent: "Africa", population: 47000000, capital: "Kampala", languages: ["English","Swahili"] },
  { name: "Ukraine", code: "UA", continent: "Europe", population: 37000000, capital: "Kyiv", languages: ["Ukrainian"] },
  { name: "United Arab Emirates", code: "AE", continent: "Asia", population: 10000000, capital: "Abu Dhabi", languages: ["Arabic"] },
  { name: "United Kingdom", code: "GB", continent: "Europe", population: 67300000, capital: "London", languages: ["English"] },
  { name: "United States", code: "US", continent: "North America", population: 333000000, capital: "Washington, D.C.", languages: ["English"] },
  { name: "Uruguay", code: "UY", continent: "South America", population: 3500000, capital: "Montevideo", languages: ["Spanish"] },
  { name: "Uzbekistan", code: "UZ", continent: "Asia", population: 35000000, capital: "Tashkent", languages: ["Uzbek"] },
  { name: "Venezuela", code: "VE", continent: "South America", population: 28400000, capital: "Caracas", languages: ["Spanish"] },
  { name: "Vietnam", code: "VN", continent: "Asia", population: 99000000, capital: "Hanoi", languages: ["Vietnamese"] },
  { name: "Zimbabwe", code: "ZW", continent: "Africa", population: 16000000, capital: "Harare", languages: ["English","Shona","Ndebele"] },
]

function getDailySeed(): number {
  const d = new Date()
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
}

function seededRandom(seed: number): number {
  let x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getDailyCountry(): Country {
  const idx = Math.floor(seededRandom(getDailySeed()) * COUNTRIES.length)
  return COUNTRIES[idx]
}

// Reveal stages: each stage reveals a portion of the flag using clip-path
const REVEAL_STAGES = [
  'inset(30% 30% 30% 30%)',    // tiny center peek
  'inset(15% 40% 40% 15%)',    // top-left quadrant
  'inset(15% 15% 40% 15%)',    // top half
  'inset(15% 15% 15% 40%)',    // left + top
  'inset(10% 10% 10% 10%)',    // mostly visible
  'inset(0% 0% 0% 0%)',        // full
]

const CLUE_STAGES = [
  (c: Country) => `Continent: ${c.continent}`,
  (c: Country) => `Population: ${c.population > 100000000 ? '100M+' : c.population > 10000000 ? '10M-100M' : c.population > 1000000 ? '1M-10M' : '<1M'}`,
  (c: Country) => `Capital starts with: ${c.capital[0]}`,
  (c: Country) => `Language: ${c.languages[0]}`,
  (c: Country) => `Name has ${c.name.length} letters`,
]

interface GameState {
  guesses: string[]
  stage: number
  gameOver: boolean
  won: boolean
}

function App() {
  const [target] = useState<Country>(() => getDailyCountry())
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem(`flaggle-${getDailySeed()}`)
    if (saved) return JSON.parse(saved)
    return { guesses: [], stage: 0, gameOver: false, won: false }
  })
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<Country[]>([])
  const [showHelp, setShowHelp] = useState(false)
  const [shakeWrong, setShakeWrong] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const save = useCallback((s: GameState) => {
    localStorage.setItem(`flaggle-${getDailySeed()}`, JSON.stringify(s))
  }, [])

  const handleGuess = useCallback((name: string) => {
    if (state.gameOver) return
    if (state.guesses.includes(name)) return

    const isCorrect = name === target.name
    const newGuesses = [...state.guesses, name]
    const newStage = state.stage + 1
    const isOver = isCorrect || newStage >= 6

    const newState: GameState = {
      guesses: newGuesses,
      stage: newStage,
      gameOver: isOver,
      won: isCorrect,
    }

    if (!isCorrect) {
      setShakeWrong(true)
      setTimeout(() => setShakeWrong(false), 500)
    }

    setState(newState)
    save(newState)
    setInput('')
    setSuggestions([])
  }, [state, target, save])

  const handleInput = (val: string) => {
    setInput(val)
    if (val.length < 2) { setSuggestions([]); return }
    const lower = val.toLowerCase()
    const filtered = COUNTRIES
      .filter(c => c.name.toLowerCase().includes(lower) && !state.guesses.includes(c.name))
      .slice(0, 6)
    setSuggestions(filtered)
  }

  const flagUrl = `https://flagcdn.com/w640/${target.code.toLowerCase()}.png`

  const shareResults = () => {
    const { guesses, won } = state
    const emojis = guesses.map((g) => {
      if (g === target.name) return '🟩'
      return '🟥'
    })
    const text = `🏁 Flaggle ${new Date().toLocaleDateString()} ${won ? state.stage : 'X'}/6\n\n${emojis.join(' ')}\n\nCan you guess the flag?`
    navigator.clipboard.writeText(text)
  }

  const [copied, setCopied] = useState(false)

  return (
    <div className="app">
      <header>
        <div className="flag-emblem">🏁</div>
        <h1>FLAGGLE</h1>
        <p className="tagline">Guess the flag. Earn glory.</p>
        <button className="help-btn" onClick={() => setShowHelp(!showHelp)}>?</button>
      </header>

      {showHelp && (
        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>HOW TO PLAY</h2>
            <p>A flag is partially hidden. Guess which country it belongs to.</p>
            <p>Each wrong guess reveals more of the flag and gives you a new clue.</p>
            <p>You have <strong>6 attempts</strong> to identify the country.</p>
            <div className="modal-stages">
              <div className="stage-demo">
                <div className="stage-bar" style={{width: '16%'}} /> Round 1 — Tiny peek
              </div>
              <div className="stage-demo">
                <div className="stage-bar" style={{width: '33%'}} /> Round 2 — More revealed
              </div>
              <div className="stage-demo">
                <div className="stage-bar" style={{width: '100%'}} /> Round 6 — Full flag
              </div>
            </div>
            <button onClick={() => setShowHelp(false)}>LET'S GO</button>
          </div>
        </div>
      )}

      {/* Flag Display */}
      <div className={`flag-arena ${shakeWrong ? 'shake' : ''}`}>
        <div className="flag-frame">
          <div className="flag-mask" style={{ clipPath: REVEAL_STAGES[Math.min(state.stage, 5)] }}>
            <img src={flagUrl} alt="Mystery flag" className="flag-img" />
          </div>
          {!state.gameOver && (
            <div className="reveal-label">
              Stage {state.stage + 1}/6
            </div>
          )}
        </div>
        {state.gameOver && state.won && <div className="confetti-text">🎉</div>}
      </div>

      {/* Clues */}
      {state.stage > 0 && !state.gameOver && (
        <div className="clues">
          <h3>🔍 CLUES</h3>
          {Array.from({ length: Math.min(state.stage, 5) }, (_, i) => (
            <div className="clue" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              {CLUE_STAGES[i](target)}
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      {!state.gameOver && (
        <div className="input-area">
          <div className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => handleInput(e.target.value)}
              placeholder="Type a country..."
              onKeyDown={e => {
                if (e.key === 'Enter' && suggestions.length > 0) {
                  handleGuess(suggestions[0].name)
                }
              }}
            />
          </div>
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map(c => (
                <button key={c.code} onClick={() => handleGuess(c.name)}>
                  <img src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`} alt="" className="mini-flag" />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Previous guesses */}
      {state.guesses.length > 0 && (
        <div className="guess-list">
          {state.guesses.map((g, i) => (
            <div className={`guess-chip ${g === target.name ? 'correct' : 'wrong'}`} key={i}>
              <span className="chip-icon">{g === target.name ? '✓' : '✗'}</span>
              <span>{g}</span>
            </div>
          ))}
        </div>
      )}

      {/* Game Over */}
      {state.gameOver && (
        <div className="game-over-panel">
          {state.won ? (
            <>
              <h2 className="win-text">🏆 VICTORY!</h2>
              <p>You identified <strong>{target.name}</strong> in {state.stage} {state.stage === 1 ? 'guess' : 'guesses'}!</p>
            </>
          ) : (
            <>
              <h2 className="lose-text">GAME OVER</h2>
              <p>The answer was <strong>{target.name}</strong></p>
            </>
          )}
          <div className="country-info">
            <img src={flagUrl} alt={target.name} className="result-flag" />
            <div>
              <strong>{target.name}</strong>
              <span>{target.continent} • {target.capital}</span>
            </div>
          </div>
          <button className="share-btn" onClick={() => { shareResults(); setCopied(true); setTimeout(() => setCopied(false), 2000) }}>
            {copied ? '✓ Copied!' : '📋 Share Results'}
          </button>
          <p className="next-time">Next flag in {getTimeUntilMidnight()}</p>
        </div>
      )}

      <footer>
        <p>New flag daily at midnight • {COUNTRIES.length} countries</p>
      </footer>

      <div className="daily-cross-promo">
        <span className="promo-label">More Dailies</span>
        <div className="promo-links">
          <a href="https://cinephile.codyp.xyz" target="_blank" rel="noopener">🎬 Cinéphile</a>
          <a href="https://chromacle.vercel.app" target="_blank" rel="noopener">🎨 Chromacle</a>
          <a href="https://geodle-six.vercel.app" target="_blank" rel="noopener">🌍 Geodle</a>
          <a href="https://pokedle-pi.vercel.app" target="_blank" rel="noopener">🔴 Pokédle</a>
          <a href="https://cosmole.vercel.app" target="_blank" rel="noopener">🪐 Cosmole</a>
        </div>
      </div>
    </div>
  )
}

function getTimeUntilMidnight(): string {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setHours(24, 0, 0, 0)
  const diff = tomorrow.getTime() - now.getTime()
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  return `${h}h ${m}m`
}

export default App

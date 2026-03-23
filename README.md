# GUESS_THE_NUMBER.exe 🎯

> A semi-dark NeoBrutalist number guessing game with 4 difficulty modes, animated hearts, a range narrowing bar, duplicate guess detection, and a slick entry screen. No mercy.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Play%20Now-33FF57?style=for-the-badge)](https://instai4.github.io/GUESS-THE-NUMBER/)
[![Built by](https://img.shields.io/badge/Built%20by-Anurag%20Rajput-4D96FF?style=for-the-badge)](https://instai4.github.io/PORT-FOLIO/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 🎯 What Is This?

GUESS_THE_NUMBER.exe is a classic number guessing game — but built with a carefully crafted semi-dark NeoBrutalist interface. The computer picks a random number in a range, and you guess it with feedback after each attempt. Each wrong guess costs a life. The range narrows with every guess, guided by a live visual bar.

Choose your difficulty: Easy (1–50), Normal (1–100), Hard (1–500), or Insane (1–1000). Each mode has a different number of lives to match the challenge.

---

## ✨ Features

- 🎚️ **4 difficulty modes** — Easy, Normal, Hard, Insane with different ranges and lives
- ❤️ **Animated hearts** — drain one by one as you lose lives
- 📊 **Range narrowing bar** — gradient bar that tightens after each guess
- 🔢 **Guess chips trail** — color-coded history of all your guesses (yellow = too low, pink = too high, green = correct)
- 🚫 **Duplicate detection** — warns you if you guess the same number twice
- 📐 **Live stats** — guesses made, lives left, current lower/upper bounds
- 🎬 **Entry screen** — choose difficulty with live preview before starting
- 🔄 **In-game difficulty switcher** — change difficulty mid-session
- ⌨️ **Enter key support** — press Enter to submit your guess
- 🖱️ **Custom cursor** — matches the semi-dark NeoBrutalist theme
- 💀 **Game over state** — disables input and reveals the answer
- ✅ **Win state** — congratulates you with guesses taken

---

## 🕹️ How to Play

1. On the entry screen, **select your difficulty**
2. Watch the live preview update your range and lives
3. Click **"READY TO GUESS?"** to start
4. Type a number in the input field and press **GUESS** or hit **Enter**
5. Follow the feedback:
   - 📉 **Too LOW** — the number is higher than your guess
   - 📈 **Too HIGH** — the number is lower than your guess
   - 🎉 **CORRECT** — you guessed it!
6. Watch the range bar narrow and hearts drain
7. Click **NEW GAME / RESET** to play again

---

## 🎚️ Difficulty Modes

| Mode | Range | Lives | Challenge |
|------|-------|-------|-----------|
| 🟢 **Easy** | 1 – 50 | 8 | Warm up |
| 🟡 **Normal** | 1 – 100 | 10 | Classic |
| 🟠 **Hard** | 1 – 500 | 15 | Punishing |
| 🔴 **Insane** | 1 – 1000 | 20 | Brutal |

> **Pro tip:** Use binary search — always guess the midpoint of the remaining range. This guarantees finding the answer in at most log₂(range) guesses.

---

## 📊 Stats Explained

| Stat | Description |
|------|-------------|
| **Guesses Made** | Total number of guesses submitted |
| **Lives Left** | Remaining attempts before game over |
| **Lower Bound** | Smallest possible value of the number |
| **Upper Bound** | Largest possible value of the number |

The **range bar** visually represents `[Lower Bound, Upper Bound]` as a fraction of the full range — narrowing with each guess.

---

## 🎨 Message Color Coding

| Color | Meaning |
|-------|---------|
| 🟡 Yellow | Too low — guess higher |
| 🩷 Pink | Too high — guess lower |
| 🟢 Green | Correct — you won! |
| 🔴 Red | Game over — out of lives |

---



---

## 🧮 Optimal Strategy (Binary Search)

The mathematically optimal approach to minimize guesses:

```
1. Start at the midpoint of [lowerBound, upperBound]
2. If too low  → new lowerBound = guess + 1
3. If too high → new upperBound = guess - 1
4. Repeat with new midpoint
```

| Mode | Max guesses (optimal) |
|------|----------------------|
| Easy (1–50) | 6 |
| Normal (1–100) | 7 |
| Hard (1–500) | 9 |
| Insane (1–1000) | 10 |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Font (Display) | Space Grotesk |
| Font (Mono) | JetBrains Mono |
| Background | `#1C1C2E` deep navy |
| Card surface | `#252540` muted indigo |
| Input surface | `#1C1C2E` |
| Accent (green) | `#33FF57` |
| Accent (yellow) | `#FBFF48` |
| Accent (pink) | `#FF70A6` |
| Border color | `#3D3D6B` |
| Shadow | `8px 8px 0 #3D3D6B` |

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile | ✅ Full |

---

## 🔮 Future Ideas

- [ ] Daily challenge — same number for everyone each day
- [ ] Score leaderboard using Supabase
- [ ] Hint mode — pay a life to narrow the range by half
- [ ] Multiplayer — race against a friend
- [ ] Sound effects for correct/wrong guesses
- [ ] Statistics dashboard — win rate, average guesses per mode

---

## 👨‍💻 Author

**Anurag Rajput**
- 🎓 B.Tech Data Science Student @ Dev Bhoomi Uttarakhand University
- 🌐 Portfolio: [instai4.github.io/PORT-FOLIO](https://instai4.github.io/PORT-FOLIO/)
- 💼 LinkedIn: [linkedin.com/in/anurag-singh-43230a380](https://www.linkedin.com/in/anurag-singh-43230a380/)
- 🐙 GitHub: [github.com/instai4](https://github.com/instai4)
- 📧 Email: 4444readerrajput@gmail.com

---

## 📄 License

MIT License — free to use, modify, and distribute with attribution.

---

<p align="center">Built with ❤️ and no mercy by <a href="https://instai4.github.io/PORT-FOLIO/">Anurag Rajput</a></p>
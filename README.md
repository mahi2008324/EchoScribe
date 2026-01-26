# 🎙️ EchoScribe: Advanced Voice-to-Text Notebook

**EchoScribe** is a professional, browser-based transcription engine built to bridge the gap between spoken lectures and organized digital notes. By leveraging the **Web Speech Recognition API** and **Asynchronous JavaScript**, it provides a fluid, real-time experience with heavy emphasis on data persistence and UI performance.

---

## 🚀 Key Features

* **Real-time Transcription:** High-fidelity voice-to-text conversion using the browser's native speech engine.
* **Multi-Language Engine:** Switch seamlessly between **English (US), German, Hindi, and Telugu**.
* **Asynchronous CRUD Engine:** Uses `async/await` and Promises to handle history saving and clipboard actions, ensuring the UI remains responsive at all times.
* **State-Aware Pause/Resume:** Intelligent session management that injects manual timestamps upon pausing to track chronology.
* **Session Analytics:** Live calculation of **WPM (Words Per Minute)**, total word count, and character tracking.
* **Glassmorphism UI:** A modern, semi-transparent interface with a fully integrated **Dark Mode** toggle.
* **Persistence Layer:** Robust `localStorage` integration allowing users to save, name, and delete up to 20 past sessions.

---

## 🛠️ Technical Stack

| Category | Technology |
| --- | --- |
| **Logic** | JavaScript (ES6+) |
| **Patterns** | Asynchronous Programming (`async/await`, Promises) |
| **APIs** | Web Speech API, Clipboard API |
| **Styling** | CSS3 (Flexbox, Grid, Backdrop-Filters, Variables) |
| **Persistence** | Browser LocalStorage API |

---

## ⚙️ How It Works (The Logic)

### 1. The Async Event Loop

The application utilizes an asynchronous flow to prevent "main-thread blocking." When a user saves a note, the process is handled as a background task. This allows for smooth animations and continuous recording even while the database (LocalStorage) is being updated.

### 2. State Management

I implemented a custom state machine to manage the microphone. Unlike basic recorders, EchoScribe preserves the "Interim" and "Final" results separately. When paused, the current session is cached in a buffer, preventing data loss during microphone resets.

### 3. DOM Persistence

Data is stored as a JSON-stringified array of objects. Each entry is assigned a unique `ID` via `Date.now()`, which allows the app to perform targeted **Delete** and **Copy** operations without refreshing the page.

---

## 💻 Installation & Usage

1. **Clone the Repo:**
```bash
git clone https://github.com/yourusername/EchoScribe.git

```


2. **Launch:** Open `index.html` in Chrome or Edge.
3. **Start:** Select your language and hit **Start Listening**.
4. **Save:** Once finished, click **Save to History** to name your note.
5. **Export:** Use the **Download** button to save your notes as a `.txt` file for offline use.

---

## 🌟 Future Roadmap

* [ ] **AI Integration:** Integration with OpenAI for automatic text summarization.
* [ ] **Cloud Sync:** Firebase implementation for multi-device support.
* [ ] **Voice Commands:** Adding "Hotwords" to trigger save/stop via voice.

---


**Developer:** Maheedhar Kotha

**Project Link:**

---




# 🎙️ EchoScribe — Advanced Voice-to-Text Notebook

EchoScribe is a modern browser-based voice transcription application designed to turn spoken words into organized digital notes in real time.

Built using pure JavaScript and the Web Speech API, the project focuses heavily on performance, asynchronous operations, state management, and smooth user experience. Instead of being just another speech-to-text demo, EchoScribe was designed like a production-style frontend application with persistence, analytics, and responsive UI behavior.

---

# 🌐 Live Demo

👉 https://mahi2008324.github.io/EchoScribe/

---

# ✨ Features

## 🎤 Real-Time Voice Transcription

Convert speech into text instantly using the browser’s native speech recognition engine.

* Live transcription updates
* Continuous listening support
* Smooth real-time rendering
* High responsiveness during long sessions

---

## 🌍 Multi-Language Support

Switch seamlessly between multiple languages:

* English (US)
* Hindi
* German
* Telugu

The speech engine dynamically changes recognition models based on the selected language.

---

## ⏯️ Smart Pause & Resume System

Unlike basic voice recorders, EchoScribe intelligently handles paused sessions.

When recording is paused:

* Current transcript state is preserved
* Timestamps are injected manually
* Interim results are cached safely
* Data loss during microphone resets is prevented

This creates a much more reliable recording experience during long lectures or meetings.

---

## 📊 Live Session Analytics

EchoScribe continuously tracks session statistics in real time:

* Words Per Minute (WPM)
* Total word count
* Character count
* Session duration

The analytics engine updates incrementally for better performance instead of recalculating the entire transcript repeatedly.

---

## 💾 Persistent Note History

All notes can be saved locally inside the browser using LocalStorage.

Users can:

* Save sessions with custom names
* Reopen previous notes
* Delete saved sessions
* Copy notes instantly
* Download notes as `.txt` files

The application currently stores up to 20 sessions safely.

---

## 🌙 Modern Glassmorphism UI

The interface was designed with a modern transparent glass-style theme.

### UI Features

* Glassmorphism effects
* Dark mode toggle
* Responsive layout
* Smooth transitions
* Mobile-friendly design
* Minimalist interface

---

# 🧠 System Architecture

EchoScribe follows a modular event-driven frontend architecture optimized for real-time performance.

## Architecture Flow

Voice Input
↓
Web Speech Recognition API
↓
Speech Processing Engine
↓
Transcript Buffer System
↓
State Management Layer
↓
Analytics Engine
↓
Persistence Layer (LocalStorage)
↓
UI Rendering Engine

---

# ⚙️ How EchoScribe Works

## 1. Speech Recognition Engine

The application uses the browser’s native Web Speech Recognition API to continuously listen to spoken audio and convert it into text.

The engine separates:

* Interim transcripts
* Final transcripts

This allows smoother rendering and prevents unstable partial outputs from corrupting finalized notes.

---

## 2. Asynchronous Processing

EchoScribe heavily uses:

* Async/Await
* Promises
* Event-driven programming

All save, copy, and export operations run asynchronously to keep the UI responsive during active recording sessions.

This prevents:

* UI freezing
* Main-thread blocking
* Rendering lag

---

## 3. State Management

A custom state management system controls:

* Microphone lifecycle
* Pause/resume flow
* Session buffering
* Timestamp tracking
* UI synchronization

This was one of the most important engineering challenges in the project.

---

## 4. Persistence Layer

Notes are stored as a JSON-stringified array of objects inside LocalStorage.

Each session includes:

* Unique ID
* Note title
* Transcript data
* Timestamp metadata

This structure allows:

* Fast retrieval
* Dynamic deletion
* Efficient updates
* No page refresh requirement

---

# ⚡ Engineering Challenges

## Challenge 1 — Microphone Reset Issues

Long recording sessions occasionally caused browser speech recognition resets.

### Solution

Implemented a transcript buffering system that preserves finalized data during recognition restarts.

---

## Challenge 2 — UI Lag During Save Operations

Saving large transcripts could temporarily freeze rendering.

### Solution

Used asynchronous Promise-based operations to keep the interface responsive during storage updates.

---

## Challenge 3 — Real-Time Analytics Performance

Recalculating metrics repeatedly became inefficient for larger transcripts.

### Solution

Built an incremental analytics engine that updates metrics dynamically instead of rescanning the entire note.

---

# 🛠️ Tech Stack

| Category    | Technology                                       |
| ----------- | ------------------------------------------------ |
| Language    | JavaScript (ES6+)                                |
| APIs        | Web Speech API, Clipboard API                    |
| Styling     | CSS3, Flexbox, Grid, Backdrop Filters            |
| Persistence | Browser LocalStorage API                         |
| Patterns    | Async/Await, Promises, Event-Driven Architecture |
| UI Design   | Glassmorphism + Dark Mode                        |

---

# 📁 Project Structure

```bash
EchoScribe/
│
├── assets/
│   ├── screenshots/
│   ├── icons/
│   └── demo.gif
│
├── css/
│   └── styles.css
│
├── js/
│   └── app.js
│
├── index.html
├── README.md
└── LICENSE
```

---

# 🚀 Installation

## Clone the Repository

```bash
git clone https://github.com/yourusername/EchoScribe.git
```

---

## Run the Application

Simply open:

```bash
index.html
```

inside:

* Google Chrome
* Microsoft Edge

> Note: Web Speech API support may vary across browsers.

---

# 📖 Usage Guide

## 1. Select Language

Choose your preferred speech recognition language.

---

## 2. Start Recording

Click **Start Listening** to begin transcription.

---

## 3. Pause or Resume

Pause anytime without losing transcript progress.

---

## 4. Save Notes

Save completed sessions into history with custom titles.

---

## 5. Export Notes

Download transcripts as `.txt` files for offline access.

---

# 🎯 Why I Built EchoScribe

During lectures and meetings, taking notes manually often causes people to miss important information while typing.

I wanted to build a tool that could:

* Listen in real time
* Convert speech into organized notes
* Keep everything persistent
* Remain fast even during long sessions

The goal was not just to make a speech-to-text app, but to create a frontend project that demonstrates:

* Real-time event handling
* Browser API integration
* Async JavaScript architecture
* State management
* Performance optimization
* User-focused UI design

---

# 📸 Screenshots

## Light Mode

<img width="960" height="477" alt="image" src="https://github.com/user-attachments/assets/7e86129f-a4e7-4e6f-8b5b-a9480432d054" />


---

## Dark Mode

<img width="954" height="477" alt="image" src="https://github.com/user-attachments/assets/b1f7472b-2c8b-4e7d-9f5b-5fa4403b05f0" />


---

## Recording Session

<img width="946" height="472" alt="image" src="https://github.com/user-attachments/assets/1c550480-41fe-4508-8fa5-f9e8924e4b9d" />


---

## Saved Notes History

<img width="953" height="478" alt="image" src="https://github.com/user-attachments/assets/efc2583c-d0cd-4fab-bd3c-fe113c9dddd2" />

<img width="445" height="278" alt="image" src="https://github.com/user-attachments/assets/cc18aeaa-b629-44f8-9c98-dc9e5116c245" />

---

# 🌟 Future Improvements

## 🤖 AI Integration

* Automatic transcript summarization
* Lecture title generation
* Smart note formatting
* Keyword extraction

---

## ☁️ Cloud Features

* Firebase integration
* Multi-device sync
* User authentication

---

## 📦 Advanced Features

* PDF export
* Markdown export
* Search functionality
* Folder organization
* Auto-save system
* Offline PWA support
* IndexedDB migration
* Voice commands

---

# 🧪 Key Concepts Demonstrated

This project demonstrates practical understanding of:

* Asynchronous JavaScript
* Browser APIs
* State management
* Event handling
* Data persistence
* DOM optimization
* Real-time rendering
* Responsive UI design
* Frontend architecture patterns

---

# 👨‍💻 Developer

## Maheedhar Kotha

Passionate about building interactive frontend applications with clean UI, real-time functionality, and performance-focused architecture.

---

# 📜 License

This project is open-source and available under the MIT License.

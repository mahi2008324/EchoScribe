// ===================== 1. ELEMENTS & SETUP =====================
const btn = document.getElementById("btn");
const pauseBtn = document.getElementById("pause");
const textarea = document.getElementById("textshow");
const indicator = document.getElementById("indicator");
const countDiv = document.querySelector(".count");
const timerDiv = document.getElementById("timer");

// Language Elements
const langBtn = document.getElementById("langBtn");
const langDropdown = document.querySelector(".lang-dropdown");
const langMenuItems = document.querySelectorAll(".lang-menu li");
const statLang = document.getElementById("statLang");

// Theme, History & Manual Save
const themeToggle = document.getElementById("themeToggle");
const historyBtn = document.getElementById("historyBtn");
const manualSaveBtn = document.getElementById("manualSave"); 

// --- MODAL ELEMENTS ---
const modal = document.getElementById("historyModal");
const modalText = document.getElementById("modalText");
const closeModalBtn = document.getElementById("closeModalBtn");
const copyModalBtn = document.getElementById("copyModalBtn");
const closeSpan = document.querySelector(".close-modal");
const clearHistoryBtn = document.getElementById("clearHistoryBtn"); 

// --- STATE VARIABLES ---
let currentModalId = null; 
let isListening = false;
let isPaused = false;
let finalText = "";
let seconds = 0;
let timerInterval = null;
let lastTimestampMinute = 0;

// --- DYNAMIC HISTORY LIST ---
const historyList = document.createElement("ul");
historyList.className = "history-list";
Object.assign(historyList.style, {
    display: "none",
    position: "absolute",
    backgroundColor: "var(--card-bg, #fff)",
    border: "none",
    zIndex: "1000",
    listStyle: "none",
    padding: "0",
    maxHeight: "300px",
    overflowY: "auto",
    width: "280px", 
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    borderRadius: "12px"
});

if (historyBtn && historyBtn.parentNode) {
    historyBtn.parentNode.style.position = "relative";
    historyBtn.parentNode.appendChild(historyList);
}

indicator.style.display = "none";

// ===================== 2. SPEECH RECOGNITION ENGINE =====================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("CRITICAL: Speech Recognition is not supported. Please use Google Chrome.");
    btn.disabled = true;
    pauseBtn.disabled = true;
}

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

// ===================== 3. HELPER FUNCTIONS =====================
function getTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
}

function updateCount() {
    const text = textarea.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    countDiv.innerText = `Words : ${words} | Characters : ${text.length}`;
}

function updateStats() {
    const minutes = seconds / 60;
    const text = textarea.value.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    const speed = minutes > 0 ? Math.round(wordCount / minutes) : 0;
    document.getElementById("statTime").innerHTML = `<i class="fa-solid fa-clock"></i> Time: ${Math.floor(minutes)} mins`;
    document.getElementById("statWords").innerHTML = `<i class="fa-solid fa-font"></i> Words: ${wordCount}`;
    document.getElementById("statSpeed").innerHTML = `<i class="fa-solid fa-tachometer-alt"></i> Speed: ${speed} WPM`;
}

// ===================== 4. CORE LOGIC: START / STOP =====================
btn.addEventListener("click", function () {
    if (!isListening) {
        try {
            recognition.start();
            isListening = true;
            isPaused = false;
            btn.innerHTML = '<i class="fa-solid fa-microphone"></i> Stop Listening';
            btn.style.backgroundColor = "#e74c3c";
            pauseBtn.disabled = false;
            pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
            textarea.readOnly = true;
            textarea.focus();
            startTimer();
            indicator.style.display = "flex";
        } catch (error) {
            console.error("Mic Error:", error);
            alert("Microphone busy. Reset and try again.");
        }
    } else {
        recognition.stop();
        isListening = false;
        isPaused = false;
        btn.innerHTML = '<i class="fa-solid fa-microphone"></i> Start Listening';
        btn.style.backgroundColor = "";
        pauseBtn.disabled = true;
        pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
        textarea.readOnly = false;
        indicator.style.display = "none";
        stopTimer();
    }
});

// ===================== 5. CORE LOGIC: PAUSE / RESUME =====================
pauseBtn.addEventListener("click", function () {
    if (!isListening) return;

    if (!isPaused) {
        finalText = textarea.value; 
        recognition.abort(); 
        isPaused = true;
        stopTimer();
        finalText += `\n[${getTime()}] ⏸ Paused\n`;
        textarea.value = finalText;
        pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
        pauseBtn.style.backgroundColor = "#2ecc71"; 
        indicator.style.display = "none";
    } else {
        recognition.start();
        isPaused = false;
        startTimer();
        finalText += `\n[${getTime()}] ▶ Resumed\n`;
        textarea.value = finalText;
        pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
        pauseBtn.style.backgroundColor = "";
        indicator.style.display = "flex";
    }
});

// ===================== 6. SPEECH RESULT HANDLING =====================
recognition.addEventListener("result", function (event) {
    let interimText = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            finalText += `[${getTime()}] ${transcript}\n`;
        } else {
            interimText += transcript;
        }
    }
    if (isListening && !isPaused) {
        textarea.value = finalText + interimText;
        textarea.scrollTop = textarea.scrollHeight;
        updateCount();
    }
});

recognition.addEventListener("end", function () {
    indicator.style.display = "none";
    if (isListening && !isPaused) {
        try { recognition.start(); indicator.style.display = "flex"; } catch(e){}
    }
});

// ===================== 7. TIMER ENGINE =====================
function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        seconds++;
        const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        timerDiv.innerText = `Recording Time: ${mins}:${secs}`;
        updateStats();
        
        const currentMin = Math.floor(seconds / 60);
        if (currentMin > 0 && currentMin % 5 === 0 && currentMin !== lastTimestampMinute) {
            lastTimestampMinute = currentMin;
            finalText += `\n[${getTime()}] ⏱ ${currentMin}:00 elapsed\n`;
            textarea.value = finalText;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// ===================== 8. ASYNC MANUAL SAVE BUTTON =====================
if (manualSaveBtn) {
    manualSaveBtn.addEventListener("click", async () => {
        const text = textarea.value.trim();
        if (!text) {
            alert("Nothing to save!");
            return;
        }

        let title = prompt("Enter a title for this recording:", "Untitled Note");
        if (title === null) return; 
        if (title.trim() === "") title = "Untitled Note";

        // Asynchronous Save Call
        await saveHistory(text, seconds, title);
        alert(`Successfully saved: ${title}`);
    });
}

// ===================== 9. LANGUAGE SELECTION =====================
langBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (isListening) {
        alert("⚠️ Please STOP recording before changing the language.");
        return; 
    }
    langDropdown.classList.toggle("active");
});

langMenuItems.forEach(function (item) {
    item.addEventListener("click", function () {
        if (isListening) return;
        recognition.lang = item.getAttribute("data-lang");
        langBtn.innerHTML = '<i class="fa-solid fa-globe"></i> ' + item.innerText;
        statLang.innerHTML = '<i class="fa-solid fa-globe"></i> Language: ' + item.innerText;
        langDropdown.classList.remove("active");
    });
});

// ===================== 10. RESET LOGIC =====================
document.getElementById("reset").addEventListener("click", function () {
    if (!confirm("Are you sure? This will delete the current text.")) return;
    finalText = "";
    textarea.value = "";
    seconds = 0;
    lastTimestampMinute = 0;
    stopTimer();
    timerDiv.innerText = "Recording Time: 00:00";
    updateCount();
    updateStats();
    
    if (isListening) {
        recognition.stop();
        isListening = false;
        btn.innerHTML = '<i class="fa-solid fa-microphone"></i> Start Listening';
        btn.style.backgroundColor = "";
        pauseBtn.disabled = true;
        pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
        textarea.readOnly = false;
    }
});

// ===================== 11. ASYNC HISTORY STORAGE =====================

async function saveHistory(text, dur, title) {
    // Mimic an async database operation
    return new Promise((resolve) => {
        setTimeout(() => {
            const history = JSON.parse(localStorage.getItem("history")) || [];
            history.unshift({
                id: Date.now(),
                date: new Date().toLocaleString(),
                title: title, 
                text: text,
                seconds: dur
            });

            if (history.length > 20) history.pop();
            localStorage.setItem("history", JSON.stringify(history));
            renderHistory();
            resolve(true);
        }, 100); // Small delay to ensure non-blocking UI
    });
}

function deleteHistoryItem(id) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history = history.filter(item => item.id !== id);
    localStorage.setItem("history", JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    historyList.innerHTML = "";
    
    if (history.length === 0) {
        historyList.innerHTML = "<li style='padding:15px; color:#888'>No history found.</li>";
        return;
    }

    history.forEach((item) => {
        const li = document.createElement("li");
        const contentDiv = document.createElement("div");
        contentDiv.className = "history-item-content";
        
        contentDiv.innerHTML = `
            <strong>${item.title || "Untitled Note"}</strong>
            <small>${item.date} • ${Math.floor(item.seconds/60)}m ${item.seconds%60}s</small>
        `;
        
        contentDiv.onclick = () => {
            currentModalId = item.id;
            modalText.value = item.text;
            const modalHeader = modal.querySelector("h3");
            if(modalHeader) modalHeader.innerText = item.title;
            modal.style.display = "flex";
            historyList.style.display = "none";
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = (e) => {
            e.stopPropagation(); 
            if(confirm(`Delete "${item.title || 'this note'}"?`)) deleteHistoryItem(item.id);
        };

        li.appendChild(contentDiv);
        li.appendChild(deleteBtn);
        historyList.appendChild(li);
    });
}

// ===================== 12. UI CONTROLS & ASYNC CLIPBOARD =====================
historyBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    historyList.style.display = (historyList.style.display === "none") ? "block" : "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
    if (!historyBtn.contains(e.target) && !historyList.contains(e.target)) {
        historyList.style.display = "none";
    }
});

closeModalBtn.addEventListener("click", () => modal.style.display = "none");
closeSpan.addEventListener("click", () => modal.style.display = "none");

// Async Clipboard Handling
copyModalBtn.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(modalText.value);
        alert("Copied to clipboard!");
    } catch (err) {
        console.error("Async Copy Error:", err);
    }
});

if(clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", () => {
        if (currentModalId && confirm("Delete this recording?")) {
            deleteHistoryItem(currentModalId);
            modal.style.display = "none"; 
            currentModalId = null;
        }
    });
}

document.getElementById("copy").addEventListener("click", async () => {
    if (!textarea.value) {
        alert("Nothing to copy!");   
        return;
    }
    try {
        await navigator.clipboard.writeText(textarea.value);
        alert("Text copied!");
    } catch (err) {
        alert("Copy failed.");
    }
});

document.getElementById("download").addEventListener("click", () => {
    if (!textarea.value) {
        alert("Nothing to download!");    
        return;
    }
    const blob = new Blob([textarea.value], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `SpeechNotes-${new Date().getTime()}.txt`;
    a.click();
});

// Theme Toggle
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i> Light' : '<i class="fa-solid fa-moon"></i> Dark';
});

// ===================== 13. INITIALIZATION =====================
window.addEventListener("load", function () {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> Light';
    }
    renderHistory();
});
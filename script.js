
// DESKTOP.EXE — SYSTEM CORE

const appWindow = document.getElementById("app-window");
const windowTitle = document.getElementById("window-title");
const windowContent = document.getElementById("window-content");

let systemTime = new Date();

const applications = {

    computer: {
        title: "MY COMPUTER",
        content: `
            <h3> SYSTEM INFORMATION </h3>
            <p> DEVICE: UNKNOWN-01 </p>
            <p> OS: DESKTOP.EXE </p>
            <p> MEMORY: 64 KB </p>
            <p> USER: UNKNOWN </p>
            <br>
            <p> Everything seems normal...</p>
        `
    },

    files: {
        title: "FILE EXPLORER",
        content: `
            <h3> 📁 ROOT DIRECTORY </h3>
            <br>
            <p onclick="openSecret('readme')" class="file">📄 README.txt</p>
            <p onclick="openSecret('diary')" class="file">📄 diary.log</p>
            <p onclick="openSecret('secret')" class="file">🔒 secret.dat</p>
            <br>
            <p style="color:#63f5cf">3 FILES FOUND</p>
        `
    },

    terminal: {
        title: "SYSTEM TERMINAL",
        content: `
            <h3> TERMINAL ACCESS </h3>
            <p>Welcome, unknown user.</p>
            <br>
            <p>Type <b>help</b> to see available commands.</p>
            <div id="terminal-output"></div>
            <div style="display:flex;gap:8px;margin-top:12px">
                <span>></span>
                <input id="terminal-input" type="text"
                placeholder="Enter command..."
                style="background:#071018;color:#63f5cf;border:1px solid #294653;padding:7px;flex:1;font-family:inherit;min-width:0">
            </div>
        `
    },

    trash: {
        title: "RECYCLE BIN",
        content: `
            <h3> RECYCLE BIN </h3>
            <br>
            <p> This folder is empty. </p>
            <p style="color:#ff7777;margin-top:15px">
                Wait... something moved.
            </p>
        `
    }
};


// OPEN APPLICATIONS

function openWindow(app) {

    const selectedApp = applications[app];

    if (!selectedApp) return;

    windowTitle.textContent = selectedApp.title;
    windowContent.innerHTML = selectedApp.content;

    appWindow.style.display = "block";

    if (app === "terminal") {
        setupTerminal();
    }
}


// CLOSE WINDOW

function closeWindow() {
    appWindow.style.display = "none";
}


// SECRET FILES

function openSecret(file) {

    const secrets = {

        readme: {
            title: "README.txt",
            text: "Welcome to your new computer. Everything is functioning normally. Do not investigate the system files."
        },

        diary: {
            title: "diary.log",
            text: "Day 01: I woke up here. I don't remember installing this operating system. Someone is watching."
        },

        secret: {
            title: "ACCESS DENIED",
            text: "You weren't supposed to find this file. The system knows you're here."
        }

    };

    const data = secrets[file];

    if (!data) return;

    windowTitle.textContent = data.title;

    windowContent.innerHTML = `
        <p style="color:#63f5cf;line-height:2">
        ${data.text}
        </p>
        <br>
        <button onclick="openWindow('files')"
        style="background:#122b32;color:#63f5cf;border:1px solid #63f5cf;padding:8px 15px;cursor:pointer">
        BACK
        </button>
    `;
}


// TERMINAL COMMANDS

function setupTerminal() {

    const input = document.getElementById("terminal-input");
    const output = document.getElementById("terminal-output");

    if (!input) return;

    input.addEventListener("keydown", function(event) {

        if (event.key !== "Enter") return;

        const command = input.value.trim().toLowerCase();

        if (!command) return;

        let response = "";

        switch(command) {

            case "help":
                response = "COMMANDS: help, date, whoami, status, clear";
                break;

            case "date":
                response = new Date().toLocaleString();
                break;

            case "whoami":
                response = "USER: UNKNOWN. IDENTITY NOT FOUND.";
                break;

            case "status":
                response = "SYSTEM ONLINE. ALL PROCESSES NORMAL.";
                break;

            case "clear":
                output.innerHTML = "";
                input.value = "";
                return;

            default:
                response = "COMMAND NOT RECOGNIZED: " + command;
        }

        output.innerHTML += `
            <p style="color:#63f5cf">> ${command}</p>
            <p>${response}</p>
        `;

        input.value = "";

    });

}


// SYSTEM CLOCK

function updateClock() {

    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

}

setInterval(updateClock, 1000);
updateClock();


// DESKTOP.EXE — SYSTEM CORE

const appWindow = document.getElementById("app-window");
const windowTitle = document.getElementById("window-title");
const windowContent = document.getElementById("window-content");

let secretUnlocked = false;


// APPLICATIONS

const applications = {

    computer: {
        title: "MY COMPUTER",
        content: `
            <h3>SYSTEM INFORMATION</h3>
            <p>DEVICE: UNKNOWN-01</p>
            <p>OS: DESKTOP.EXE</p>
            <p>MEMORY: 64 KB</p>
            <p>USER: UNKNOWN</p>
            <br>
            <p>Everything seems normal...</p>
        `
    },

    files: {
        title: "FILE EXPLORER",
        content: ""
    },

    terminal: {
        title: "SYSTEM TERMINAL",
        content: `
            <h3>TERMINAL ACCESS</h3>
            <p>Welcome, unknown user.</p>
            <p>Type <b>help</b> to see commands.</p>
            <div id="terminal-output"></div>
            <div style="display:flex;gap:8px;margin-top:12px">
                <span>></span>
                <input id="terminal-input"
                placeholder="Enter command..."
                style="background:#071018;color:#63f5cf;border:1px solid #294653;padding:7px;flex:1;min-width:0;font-family:inherit">
            </div>
        `
    },

    trash: {
        title: "RECYCLE BIN",
        content: `
            <h3>RECYCLE BIN</h3>
            <p>This folder is empty.</p>
            <br>
            <p style="color:#ff7777">Wait... something moved.</p>
        `
    }
};


// OPEN APPLICATIONS

function openWindow(app) {

    const selectedApp = applications[app];

    if (!selectedApp) return;

    windowTitle.textContent = selectedApp.title;

    if (app === "files") {
        showFiles();
    } else {
        windowContent.innerHTML = selectedApp.content;
    }

    appWindow.style.display = "block";

    if (app === "terminal") {
        setupTerminal();
    }
}


// CLOSE WINDOW

function closeWindow() {
    appWindow.style.display = "none";
}


// FILE EXPLORER

function showFiles() {

    windowTitle.textContent = "FILE EXPLORER";

    windowContent.innerHTML = `
        <h3>ROOT DIRECTORY</h3>
        <br>

        <p class="file" onclick="openSecret('readme')">
        📄 README.txt</p>

        <p class="file" onclick="openSecret('diary')">
        📄 diary.log</p>

        <p class="file" onclick="openSecret('secret')">
        ${secretUnlocked ? "📄 secret.dat" : "🔒 secret.dat"}</p>

        <br>
        <p style="color:#63f5cf">
        ${secretUnlocked ? "3 FILES FOUND" : "2 FILES FOUND | 1 LOCKED"}
        </p>
    `;
}


// OPEN FILES

function openSecret(file) {

    const secrets = {

        readme: {
            title: "README.txt",
            text: `
            Welcome to your new computer.
            Everything is functioning normally.
            Do not investigate the system files.
            `
        },

        diary: {
            title: "diary.log",
            text: `
            DAY 01: I woke up here.
            I don't remember installing this operating system.

            DAY 02: I found a locked file.

            DAY 03: I think the password is the date
            everything started.

            I remember seeing 04/27 on the startup screen.
            `
        },

        secret: {
            title: "secret.dat",
            text: `
            ACCESS GRANTED.

            You found it.

            The system was never designed to keep you safe.

            Someone has been using this computer.

            And now they know you're here.

            MISSION 01 COMPLETE.
            `
        }

    };

    if (file === "secret" && !secretUnlocked) {
        windowContent.innerHTML = `
            <h3 style="color:#ff7777">ACCESS DENIED</h3>
            <p>This file is password protected.</p>
        `;
        return;
    }

    const data = secrets[file];

    if (!data) return;

    windowTitle.textContent = data.title;

    windowContent.innerHTML = `
        <p style="color:#63f5cf;line-height:2">
        ${data.text}
        </p>
        <br>
        <button onclick="showFiles()"
        style="background:#122b32;color:#63f5cf;border:1px solid #63f5cf;padding:8px 15px;cursor:pointer">
        BACK
        </button>
    `;
}


// TERMINAL

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
                response = "COMMANDS: help, date, whoami, status, ls, cat readme.txt, cat diary.log, unlock [password], clear";
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

            case "ls":
                response = secretUnlocked
                    ? "README.txt  diary.log  secret.dat"
                    : "README.txt  diary.log  secret.dat [LOCKED]";
                break;

            case "cat readme.txt":
                response = "Welcome. Everything is normal. Do not investigate system files.";
                break;

            case "cat diary.log":
                response = "DAY 03: The password is the date everything started. I remember seeing 04/27 on the startup screen.";
                break;

            case "unlock 0427":
                if (secretUnlocked) {
                    response = "FILE ALREADY UNLOCKED.";
                } else {
                    secretUnlocked = true;
                    response = "ACCESS GRANTED. secret.dat UNLOCKED. CHECK FILE EXPLORER.";
                }
                break;

            case "clear":
                output.innerHTML = "";
                input.value = "";
                return;

            default:
                if (command.startsWith("unlock ")) {
                    response = "INCORRECT PASSWORD. ACCESS DENIED.";
                } else {
                    response = "COMMAND NOT RECOGNIZED: " + command;
                }
        }

        output.innerHTML += `
            <p style="color:#63f5cf">> ${command}</p>
            <p>${response}</p>
        `;

        input.value = "";
        output.scrollTop = output.scrollHeight;

    });

}


// SYSTEM CLOCK

function updateClock() {

    const clock = document.getElementById("clock");

    if (!clock) return;

    clock.textContent = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}

setInterval(updateClock, 1000);
updateClock();

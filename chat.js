const username = localStorage.getItem("chatUsername");
document.getElementById("user-name").innerText = "👤 " + username;

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("message-input");
const typing = document.getElementById("typing");

// WebSocket (Echo server for demo)
const socket = new WebSocket("wss://echo.websocket.events");

// Load history
const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
history.forEach(msg => addMessage(msg.text, msg.time));

// Send message
function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  const time = new Date().toLocaleTimeString();
  const data = { text: `${username}: ${message}`, time };

  socket.send(JSON.stringify(data));
  saveMessage(data);
  input.value = "";
}

// Receive message
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  addMessage(data.text, data.time);
};

// UI helpers
function addMessage(text, time) {
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<b>${text}</b><br><span>${time}</span>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function saveMessage(msg) {
  history.push(msg);
  localStorage.setItem("chatHistory", JSON.stringify(history));
}

// Typing indicator
input.addEventListener("input", () => {
  typing.style.display = "block";
  setTimeout(() => typing.style.display = "none", 1000);
});

// Dark mode
function toggleTheme() {
  document.body.classList.toggle("dark");
}

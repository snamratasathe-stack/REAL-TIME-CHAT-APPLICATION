function startChat() {
  const username = document.getElementById("username").value.trim();

  if (!username) {
    alert("Please enter your name");
    return;
  }

  localStorage.setItem("chatUsername", username);
  window.location.href = "chat.html";
}

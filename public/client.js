const get = document.getElementById.bind(document);

const lCont = get("login-container");
const apiInp = get("api-key-input");
const lBtn = get("login-button");
const lMsg = get("login-message");

const cCont = get("chat-container");
const mInp = get("message-input");
const sBtn = get("send-button");
const msgsCont = get("messages-container");

const messages = [{ role: "system", content: "You are a helpful assistant." }];

async function authenticate() {
  const apiKey = apiInp.value;
  try {
    const res = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });
    const data = await res.json();
    if (data.authenticated) {
      lCont.style.display = "none";
      cCont.style.display = "flex";
      lMsg.textContent = "";
    } else {
      lMsg.textContent = data.message || "Authentication failed";
    }
  } catch (err) {
    lMsg.textContent = "Error during authentication";
  }
}

function addMessageToChat(role, content) {
  const newMsg = document.createElement("p");
  newMsg.classList.add(role);
  newMsg.textContent = content;
  msgsCont.appendChild(newMsg);
  msgsCont.scrollTop = msgsCont.scrollHeight;
}

async function sendMessage() {
  const msg = mInp.value;
  mInp.value = "";
  const apiKey = apiInp.value;
  messages.push({ role: "user", content: msg });

  // Add user message to chat transcript
  addMessageToChat("user", msg);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey, messages }),
    });
    const data = await res.json();
    if (data.reply) {
      messages.push({ role: "assistant", content: data.reply });

      // Add assistant message to chat transcript
      addMessageToChat("assistant", data.reply);
    }
  } catch (err) {
    console.error("Error during conversation", err);
  }
}

lBtn.addEventListener("click", authenticate);
sBtn.addEventListener("click", sendMessage);
mInp.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

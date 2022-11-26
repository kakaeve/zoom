const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nicknameForm = document.querySelector("#nickname");
//서버로의 연 결
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const message = { type, payload };
  return JSON.stringify(message);
}

socket.addEventListener("open", () => {
  console.log("Conneected to Server ");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconneected to Server");
});

// setTimeout(() => {
//   socket.send("hello from the Browser!");
// }, 1000);

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  const li = document.createElement("li");
  li.innerText = `You : ${input.value}`;
  messageList.append(li);
  input.value = "";
});
nicknameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = nicknameForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
});

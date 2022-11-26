const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(msg) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = msg;
  ul.appendChild(li);
}

function handleMessageSubmit(e) {
  e.preventDefault();
  const input = room.querySelector("#msg input");
  const val = input.value;
  socket.emit("new_message", val, roomName, () => {
    addMessage(`You : ${val}`);
  });
  input.value = "";
}

function handleNicknameSubmit(e) {
  e.preventDefault();
  const input = room.querySelector("#nick input");
  //const val = input.value;
  socket.emit("nickname", input.value);
  //input.value = "";
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inpNick = form.querySelector("#nick");
  const inpRoom = form.querySelector("#room_name");
  console.log(inpNick.value, inpRoom.value);
  if (inpNick.value === "" || inpRoom.value === "") {
    alert("요소가 부족합니다.");
  } else {
    socket.emit("enter_room", inpRoom.value, inpNick.value, showRoom);
    roomName = inpRoom.value;
  }
});

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} joined`);
});
socket.on("bye", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount}`;
  addMessage(`${user} left ㅜㅜ`);
});

socket.on("new_message", addMessage);
socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.appendChild(li);
  });
});

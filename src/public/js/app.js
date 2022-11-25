//서버로의 연결
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Conneected to Server ");
});

socket.addEventListener("message", (message) => {
  console.log("just got this : ", message.data, " from the server");
});

socket.addEventListener("close", () => {
  console.log("Disconneected to Server");
});

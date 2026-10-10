const socket = io();

const waterButton = document.querySelector("#waterButton");
const plant = document.querySelector("#plant");

waterButton.addEventListener("click", () => {
  socket.emit("water plant");
});

socket.on("plant state", (growth) => {
  const size = 0.35 + growth * 0.065;

  plant.style.transform = `scale(${size})`;
});
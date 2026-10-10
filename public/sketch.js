const socket = io();

const waterButton = document.querySelector("#waterButton");
const plant = document.querySelector("#plant");
const plantMessage = document.querySelector("#plantMessage");

waterButton.addEventListener("click", () => {
  socket.emit("water plant");
});

socket.on("plant state", (growth) => {
  const size = 0.45 + growth * 0.055;

  plant.style.transform = `scale(${size})`;

  if (growth === 0) {
    plantMessage.textContent =
      "The plant is waiting for water.";
  } else if (growth === 1) {
    plantMessage.textContent =
      "The plant has been watered 1 time.";
  } else if (growth < 10) {
    plantMessage.textContent =
      `The plant has been watered ${growth} times.`;
  } else {
    plantMessage.textContent =
      "The plant is fully grown!";
  }
});
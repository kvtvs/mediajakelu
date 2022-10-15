"use strict";

/*const socket = io('http://10.114.32.18');

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const inp = document.getElementById('m');
  socket.emit('chat message', inp.value);
  inp.value = '';
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.innerHTML = msg;
  document.getElementById('messages').appendChild(item);
});*/
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

//Get username and room from URL
const parsedSearch =
  location.search.substring(0, 1) === "?"
    ? location.search.substring(1, location.search.length)
    : location.search;
const { username, room } = Qs.parse(parsedSearch);

/* const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
}); */

console.log(username, room);

const socket = io("http://localhost:3000");
//const socket = io('https://sweatbaby.norwayeast.cloudapp.azure.com');

//Join chatroom
socket.emit("joinRoom", { username, room });

//Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

//Message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get message text
  const msg = e.target.elements.msg.value;

  //Emit message to server
  socket.emit("chatMessage", msg);

  //Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

//Output message to DOM
function outputMessage(message) {
  const li = document.createElement("li");
  li.classList.add(
    "py-2",
    "px-2",
    "bg-my-blue",
    "rounded-lg",
    "text-white",
    "w-fit",
    "m-5"
  );
  li.innerHTML = `${message.username}: ${message.text}`;
  document.querySelector(".chat-messages").appendChild(li);
}

//Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

//Add users to DOM
function outputUsers(users) {
  userList.innerHTML = `
        ${users.map((user) => `<li>${user.username}</li>`).join("")}
    `;
}

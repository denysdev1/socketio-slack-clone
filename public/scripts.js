// const userName = prompt('What is your username?');
// const password = prompt('What is your password?');
const userName = 'Denys';
const password = '1234';
const clientOptions = {
  query: {
    userName,
    password,
  },
  auth: {
    userName,
    password,
  },
};
const socket = io('http://localhost:8000');
const namespaceSockets = [];
const listeners = {
  nsChange: [],
  messageToRoom: [],
};

let selectedNsId = 0;
document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const input = document.querySelector('#user-message');
  const newMessage = input.value;

  console.log(newMessage, selectedNsId);
  namespaceSockets[selectedNsId].emit('newMessageToRoom', {
    newMessage,
    date: Date.now(),
    avatar:
      'https://img.freepik.com/premium-vector/3d-realistic-person-people-vector-illustration_156780-269.jpg',
    userName,
    selectedNsId,
  });

  input.value = '';
});

const addListeners = (nsId) => {
  if (!listeners.nsChange[nsId]) {
    namespaceSockets[nsId].on('nsChange', (data) => {
      console.log('Namespace Changed!');
      console.log(data);
    });
    listeners.nsChange[nsId] = true;
  }

  if (!listeners.messageToRoom[nsId]) {
    namespaceSockets[nsId].on('messageToRoom', (messageObj) => {
      console.log(messageObj);
      document.querySelector('#messages').innerHTML +=
        buildMessageHTML(messageObj);
    });
    listeners.messageToRoom[nsId] = true;
  }
};

socket.on('connect', () => {
  console.log('Connected!');

  socket.emit('clientConnect');
});

socket.on('nsList', (nsData) => {
  console.log(nsData);
  const lastNs = Number(localStorage.getItem('lastNs'));
  const namespacesDiv = document.querySelector('.namespaces');
  namespacesDiv.innerHTML = '';

  nsData.forEach((ns) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src=${ns.image} /></div>`;

    if (!namespaceSockets[ns.id]) {
      namespaceSockets[ns.id] = io(`http://localhost:8000${ns.endpoint}`);
    }

    addListeners(ns.id);
  });

  Array.from(document.getElementsByClassName('namespace')).forEach(
    (element) => {
      console.log(element);
      element.addEventListener('click', (e) => {
        joinNs(element, nsData);
      });
    }
  );

  joinNs(document.getElementsByClassName('namespace')[lastNs], nsData);
});

socket.on('joinRoom', () => {
  console.log('Someone joined the room');
});

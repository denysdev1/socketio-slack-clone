const joinNs = (element, nsData) => {
  const nsEndpoint = element.getAttribute('ns');
  const clickedNs = nsData.find((row) => row.endpoint === nsEndpoint);
  selectedNsId = clickedNs.id;
  const rooms = clickedNs.rooms;
  let roomList = document.querySelector('.room-list');

  roomList.innerHTML = '';
  let firstRoom;
  rooms.forEach((room, i) => {
    if (i === 0) {
      firstRoom = room.roomTitle;
    }

    console.log(room);
    roomList.innerHTML += `<li class="room" namespaceId=${room.namespaceId}>
      <span class="fa-solid fa-${room.privateRoom ? 'lock' : 'globe'}"></span>${
      room.roomTitle
    }
    </li>`;
  });

  joinRoom(firstRoom, selectedNsId);

  const roomNodes = document.querySelectorAll('.room');
  roomNodes.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      console.log('Someone clicked on ' + e.target.innerText);
      const namespaceId = elem.getAttribute('namespaceId');

      joinRoom(e.target.innerText, namespaceId);
    });
  });

  localStorage.setItem('lastNs', selectedNsId);
};

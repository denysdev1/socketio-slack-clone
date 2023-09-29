const buildMessageHTML = ({ newMessage, userName, date, avatar }) => {
  const formattedDate = new Date(date).toLocaleString();

  return `
    <li>
      <div class="user-image">
        <img src="${avatar}" />
      </div>
      <div class="user-message">
        <div class="user-name-time">${userName}<span>${formattedDate}</span></div>
        <div class="message-text">${newMessage}</div>
      </div>
    </li>`;
};

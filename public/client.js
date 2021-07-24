const socket = io();

let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');


function sendmessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    appendMessage(msg, 'outgoing');

    textarea.value = '';

    scrollBottom();

    socket.emit('message', msg);

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let msgDiv = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = msgDiv;

    messageArea.appendChild(mainDiv);
}

do {
    name = prompt('Please enter your name:');
} while (!name)


textarea.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        sendmessage(event.target.value)
    }
})

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollBottom();
})

function scrollBottom(params) {
    messageArea.scrollTop = messageArea.scrollHeight;
}
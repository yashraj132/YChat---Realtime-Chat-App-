const socket = io("http://localhost:8000")

const form = document.getElementById('send-container');
const messageInput = document.getElementById('msgInp');
const messageContainer = document.querySelector(".container")

var audio = new Audio('Ting.mp3');

var joina = new Audio('joined.mp3');
const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    
    if(position == 'left'){
        audio.play();
    }

    if(position == 'mid'){
        joina.play();
    }
}

const name = prompt("Enter your name to join the chat");

socket.emit('new-user-joined', name)

socket.on('user-joined', name => {
    if(name != null){
        append(`${name} joined the chat`, 'mid');
    }
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name => {
    append(`${name} left the chat`, 'mid')
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if(message != ""){
        append(`You: ${message}`, 'right');
        socket.emit('send', message);
        messageInput.value = ''
    }
    else{
        alert("Your message box is empty");
    }
})
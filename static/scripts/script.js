const videoPlayer = document.getElementById('video-player');
<<<<<<< HEAD:static/scripts/script.js
const videos = ['finalVid/what-is-insurance.webm', 'finalVid/types-of-insurance.webm', 'finalVid/need-insurance.webm', 'finalVid/quotes.webm'];
=======
const videos = ['finalVid/what-is-insurance.mp4', 'finalVid/types-of-insurance.mp4', 'finalVid/need-insurance.mp4', 'finalVid/quotes.mp4'];
>>>>>>> 8b0b49f47989388b91e46d72995bc38202c13d3b:script.js
let currentVideoIndex = 0;

function loadVideo() {
    videoPlayer.src = videos[currentVideoIndex];
    videoPlayer.load();
    videoPlayer.play();
}

document.getElementById('prev-video').addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    loadVideo();
});

document.getElementById('next-video').addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    loadVideo();
});

loadVideo();

var conversation = {};

const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

const commentsContainer = document.querySelector(".comments");

function addComment(text) {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.textContent = text;
    commentsContainer.appendChild(commentElement);
    commentsContainer.scrollTop = commentsContainer.scrollHeight;
}

sendButton.addEventListener("click", function () {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
        addComment("User: " + messageText);
        messageInput.value = "";

        // Sends message to server
        fetch("/comment",{
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `comment=${messageText}`,
        }).then(response => response.json()).then(data => {
            const botResponse =  data.bot_response;
            console.log(data.bot_response)
            addComment("InsureBot: " + botResponse);
        }).catch(error=>{console.log(error)});



    }
});

messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});
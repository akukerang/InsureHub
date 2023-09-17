const videoPlayer = document.getElementById('video-player');
const videos = ['../static/finalVid/what-is-insurance.webm', '../static/finalVid/types-of-insurance.webm', '../static/finalVid/need-insurance.webm', '../static/finalVid/quotes.webm'];
let currentVideoIndex = 0;

function loadVideo() {
    videoPlayer.src = videos[currentVideoIndex];
    videoPlayer.load();
    videoPlayer.play();
}

function reset() {
    commentsContainer.innerHTML = "";
}

document.getElementById('prev-video').addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    loadVideo();
    reset();

});

document.getElementById('next-video').addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    loadVideo();
    reset();
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
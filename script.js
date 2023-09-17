const videoPlayer = document.getElementById('video-player');
const videos = ['finalVid/what-is-insurance.mp4', 'finalVid/types-of-insurance.mp4', 'finalVid/need-insurance.mp4', 'finalVid/quotes.mp4'];
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
    }
});

messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});
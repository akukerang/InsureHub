const videoPlayer = document.getElementById('video-player');
const videos = ['../static/finalVid/what-is-insurance.webm', '../static/finalVid/types-of-insurance.webm', '../static/finalVid/need-insurance.webm', '../static/finalVid/quotes.webm'];
let currentVideoIndex = 0;
let UserTurn = true
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

function addComment(text, user) {
    console.log(UserTurn)
    const image = UserTurn ? '../static/pictures/userpicture.jpeg': '../static/pictures/gptlogo.png';
    const commentElement = createComment(image, user, text)
    commentElement.classList.add("comment");
    commentsContainer.appendChild(commentElement);
    commentsContainer.scrollTop = commentsContainer.scrollHeight;
}

sendButton.addEventListener("click", function () {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
        addComment(messageText, "User");
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
            UserTurn = false;
            addComment(botResponse, "InsureBot");
            UserTurn = true;
        }).catch(error=>{console.log(error)});
    }
});

messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});

function createComment(profileImageUrl, username, commentText) {
    var commentDiv = document.createElement("div");
    commentDiv.className = "comment";

    var profileImage = document.createElement("img");
    profileImage.src = profileImageUrl;
    profileImage.alt = username;
    profileImage.className = "profile-image";

    var profile = document.createElement("div");
    profile.className = "profile";

    var usernamePara = document.createElement("span");
    usernamePara.textContent = username;
    usernamePara.className = "comment-username";

    var commentPara = document.createElement("p");
    commentPara.textContent = commentText;
    commentPara.className = "comment-content";

    profile.appendChild(profileImage);
    profile.appendChild(usernamePara);

    commentDiv.appendChild(profile);
    commentDiv.appendChild(commentPara);

    return commentDiv;
}
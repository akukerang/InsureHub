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
            addComment(botResponse, "InsurBot");
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
    // Create a new <div> element to represent the comment container
    var commentDiv = document.createElement("div");
    commentDiv.className = "comment";

    // Create an <img> element for the profile picture
    var profileImage = document.createElement("img");
    profileImage.src = profileImageUrl;
    profileImage.alt = username;
    profileImage.className = "profile-image";

    // Create a <div> element to hold the comment text
    var textDiv = document.createElement("div");
    textDiv.className = "comment-text";

    // Create a <p> element for the username
    var usernamePara = document.createElement("p");
    usernamePara.textContent = username;
    usernamePara.className = "comment-username";

    // Create a <p> element for the comment text
    var commentPara = document.createElement("p");
    commentPara.textContent = commentText;
    commentPara.className = "comment-content";

    // Append the profile picture, username, and comment text to the comment container
    textDiv.appendChild(usernamePara);
    textDiv.appendChild(commentPara);

    commentDiv.appendChild(profileImage);
    commentDiv.appendChild(textDiv);

    // Return the comment <div>
    return commentDiv;
}
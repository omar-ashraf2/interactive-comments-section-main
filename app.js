import data from "./data.json" assert { type: "json" };

const ul = document.getElementById("commentsList");
const commentsList = document.getElementById("commentsContainer");
let replyList = document.getElementById("replyContainer");
let modal = document.getElementById("modal-invisible");
let yesDelete = document.querySelector(".yes");
let noCancel = document.querySelector(".no");
let comments = data.comments;

//Load Comments & Replies Data
const readComments = () => {
  let listOfComments;
  if (comments) {
    for (const comment of comments) {
      const li = document.createElement("li");

      // Declaring comments variables
      const score = comment.score;
      const img = comment.user.image.png;
      const userName = comment.user.username;
      const createdAt = comment.createdAt;
      const content = comment.content;
      let replies = comment.replies;

      // Adding the comments
      listOfComments = `
      <div class="commentBoxContainer">
        <div class="vote">
          <button class="upVote"></button>
          <span class="score">${score}</span>
          <button class="downVote"></button>
        </div>
          <div class="comment">
          <div class="topSection">
            <div class="userInfo">
              <img class="avatar" src=${img} alt=""/>
              <h4>${userName}</h4>
              <span>${createdAt}</span>
            </div>
              <button class="replyButton reply" id="replyButton">
                <img src="./images/icon-reply.svg" alt="" /> Reply
              </button>
          </div>
          <div class="bottomSection">
            <p class="content">${content}</p>
          </div>
        </div>
      </div>`;
      li.innerHTML = listOfComments;
      li.setAttribute("class", "commentBox");
      commentsList.appendChild(li);

      //Append replies from data
      let listOfReplies = "";
      for (const reply of replies) {
        // Declaring replies variables
        const score = reply.score;
        const replyImg = reply.user.image.png;
        const replyUsername = reply.user.username;
        const replyCreatedAt = reply.createdAt;
        const replyContent = reply.content;

        const repliesList = document.createElement("li");
        listOfReplies = `
          <div class="vote">
            <button class="upVote"></button>
            <span class="score">${score}</span>
            <button class="downVote"></button>
            </div>
            <div class="comment">
              <div class="topSection">
                <div class="userInfo">
                  <img
                    class="avatar"
                    src=${replyImg}
                    alt=""
                  />
                  <h4>${replyUsername} ${
          replyUsername === "juliusomo" ? '<span class="you">you</span>' : ""
        }</h4>
                  <span>${replyCreatedAt}</span>
                </div>
                ${
                  replyUsername === "juliusomo"
                    ? '<div class="editButtons"> <button class="replyButton danger"> <img src="./images/icon-delete.svg" alt="" /> Delete</button> <button class="replyButton edit"> <img src="./images/icon-edit.svg" alt="" /> Edit</button> </div>'
                    : '<button class="replyButton reply" id="replyButton"> <img src="./images/icon-reply.svg" alt="" /> Reply</button>'
                }
              </div>
              <div class="bottomSection">
                <p class="content">
                  ${replyContent}
                </p>
              </div>
            </div> 
          `;
        repliesList.innerHTML = listOfReplies;
        repliesList.setAttribute("class", "commentBoxContainer replyBox");
        replyList.appendChild(repliesList);
      }
    }
  }
};
readComments();

ul.addEventListener("click", (e) => {
  const upVote = e.target.classList.contains("upVote");
  const downVote = e.target.classList.contains("downVote");
  let score = e.target.closest(".vote");

  const replyClicked = e.target.classList.contains("reply");
  const submitClicked = e.target.classList.contains("submit");
  const editClicked = e.target.classList.contains("edit");
  const deleteClicked = e.target.classList.contains("danger");
  const updateClicked = e.target.classList.contains("submitButton");
  let closestCommentBox = e.target.closest(".commentBox");
  let closestReply = e.target.closest(".replyBox");
  let closestReplyContainer = e.target.closest(".commentBoxContainer");
  const addNewComment = e.target.classList.contains("addNewComment");

  function addReply(text) {
    let div = document.createElement("div");
    div.setAttribute("class", "replyContainer");
    const newReply = document.createElement("li");
    newReply.setAttribute("class", "commentBoxContainer replyBox");

    newReply.innerHTML += `<div class="vote">
      <button class="upVote"></button>
      <span class="score">0</span>
      <button class="downVote"></button>
    </div>
    <div class="comment">
      <div class="topSection">
        <div class="userInfo">
          <img
            class="avatar"
            src="./images/avatars/image-juliusomo.png"
            alt=""/>
            <h4>juliusomo <span class="you">you</span></h4>
            <span>Just Now</span>
        </div>
        <div class="editButtons"> <button class="replyButton danger"> <img src="./images/icon-delete.svg" alt="" /> Delete</button> <button class="replyButton edit"> <img src="./images/icon-edit.svg" alt="" /> Edit</button> </div>
      </div>
      <div class="bottomSection">
          <p class="content">
            ${text}
          </p>
      </div>
    </div>`;

    div.appendChild(newReply);
    return div;
  }
  if (replyClicked) {
    // Creating Li & Container
    let div = document.createElement("div");
    div.setAttribute("class", "replyContainer");
    // if (closestCommentBox.children.length > 1) {
    //   console.log(closestCommentBox.children);
    // }
    let li = document.createElement("li");
    li.setAttribute("class", "replyBox addComment");
    li.innerHTML += `<div class="imgContainer">
        <img
          class="replyAvatar"
          src="./images/avatars/image-juliusomo.webp"
          alt=""
        />
      </div>
      <textarea
        name="commentText"
        class="textarea"
        placeholder="Add a comment..."
        rows="3"
        required
      ></textarea>
      <button class="submit">SEND</button>`;

    //Append in UL
    div.appendChild(li);
    closestCommentBox.appendChild(div);
  }

  if (submitClicked) {
    let closestReplyBox = e.target.closest(".replyContainer");
    let closestReplyInput = e.target.closest(".replyBox");
    let inputText = closestReplyInput.children[1].value;
    if (inputText != "") {
      closestCommentBox.appendChild(addReply(inputText));
      closestReplyBox.remove();
    }
  }

  function editComment(text) {
    let editText = closestReply.querySelector(".content");
    editText.innerHTML = `${text}`;
    return editText;
  }

  if (editClicked) {
    let editText = closestReply.querySelector(".content");
    editText.innerHTML = `<textarea name="commentText" id="commentText" class="textarea" rows="3">${editText.innerText}</textarea>
    <button class="submitButton">UPDATE</button>`;
  }

  if (updateClicked) {
    let editText = closestReply.querySelector(".content");
    let editTextInput = editText.children[0].value;
    let bottomSection = e.target.closest(".bottomSection");
    let updateBtn = e.target.closest(".submitButton");
    let textArea = editText.children[0];

    bottomSection.appendChild(editComment(editTextInput));
    updateBtn.remove();
    textArea.remove();
  }

  function addComment(text) {
    let div = document.createElement("div");
    div.setAttribute("class", "commentBoxContainer replyBox");
    div.innerHTML += `<div class="vote">
      <button class="upVote" ></button>
      <span class="score">0</span>
      <button class="downVote" ></button>
    </div>
      <div class="comment">
      <div class="topSection">
        <div class="userInfo">
          <img class="avatar" src="./images/avatars/image-juliusomo.webp" alt="">
          <h4>juliusomo <span class="you">you</span></h4>
          <span>Just Now</span>
        </div>
        <div class="editButtons"> <button class="replyButton danger"> <img src="./images/icon-delete.svg" alt=""> Delete</button> <button class="replyButton edit"> <img src="./images/icon-edit.svg" alt=""> Edit</button> </div>
      </div>
      <div class="bottomSection">
        <p class="content">${text}</p>
      </div>
    </div>`;
    document.querySelector(".textarea").value = "";
    return div;
  }
  if (addNewComment) {
    let addCommentContainer = e.target.closest(".addComment");
    let commentValue = addCommentContainer.querySelector(".textarea").value;
    if (commentValue === "") {
      addCommentContainer
        .querySelector(".textarea")
        .setAttribute("placeholder", "This field is required");
    } else {
      ul.appendChild(addComment(commentValue));
    }
  }
  function handleYes() {
    closestReplyContainer.remove();
    modal.style.display = "none";
  }
  function handleNo() {
    modal.style.display = "none";
  }
  if (deleteClicked) {
    modal.style.display = "block";
    yesDelete.addEventListener("click", () => handleYes());
    noCancel.addEventListener("click", () => handleNo());
  }

  function handleUpVote(number) {
    let currentScore = score.querySelector(".score");
    currentScore.innerHTML = ++number;
    return currentScore;
  }
  function handleDownVote(number) {
    let currentScore = score.querySelector(".score");
    if (currentScore.innerHTML > 0) {
      currentScore.innerHTML = --number;
    }
    return currentScore;
  }
  if (upVote) {
    handleUpVote(score.children[1].innerHTML);
  }
  if (downVote) {
    handleDownVote(score.children[1].innerHTML);
  }
});

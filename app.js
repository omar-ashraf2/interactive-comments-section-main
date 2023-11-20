import data from "./data.json" assert { type: "json" };

const ul = document.getElementById("commentsList");
const commentsList = document.getElementById("commentsContainer");
let replyList = document.getElementById("replyContainer");


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
          <a href="#"><img src="./images/icon-plus.svg" alt="" /></a>
          <span>${score}</span>
          <a href="#"><img src="./images/icon-minus.svg" alt="" /></a>
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
            <a href="#"><img src="./images/icon-plus.svg" alt="" /></a>
            <span>${score}</span>
            <a href="#"><img src="./images/icon-minus.svg" alt="" /></a>
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
                    ? '<div class="editButtons"> <button class="replyButton danger"> <img src="./images/icon-delete.svg" alt="" /> Delete</button> <button class="replyButton"> <img src="./images/icon-edit.svg" alt="" /> Edit</button> </div>'
                    : '<button class="replyButton" id="replyButton"> <img src="./images/icon-reply.svg" alt="" /> Reply</button>'
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

function addReply(text) {
  const newReply = document.createElement("li");
  newReply.innerHTML += `<div class="vote">
    <a href="#"><img src="./images/icon-plus.svg" alt="" /></a>
    <span>5</span>
    <a href="#"><img src="./images/icon-minus.svg" alt="" /></a>
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
      <div class="editButtons"> <button class="replyButton danger"> <img src="./images/icon-delete.svg" alt="" /> Delete</button> <button class="replyButton"> <img src="./images/icon-edit.svg" alt="" /> Edit</button> </div>
    </div>
    <div class="bottomSection">
        <p class="content">
          ${text}
        </p>
    </div>
  </div>`;

  newReply.setAttribute("class", "commentBoxContainer replyBox");
  replyList.appendChild(newReply);
  return replyList;
}

ul.addEventListener("click", (e) => {
  const replyClicked = e.target.classList.contains("reply");
  const submitClicked = e.target.classList.contains("submit");
  let closestCommentBox = e.target.closest(".commentBox");

  if (replyClicked) {
    let li = document.createElement("li");
    li.innerHTML = "";
    if (replyList != "") {
      // Creating Li
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
      class="commentText"
      placeholder="Add a comment..."
      rows="3"
      required
    ></textarea>
    <button class="submit">SEND</button>`;

      //Append in UL
      replyList.appendChild(li);
      closestCommentBox.appendChild(replyList);
    }
  }

  if (submitClicked) {
    let closestReplyBox = e.target.closest(".replyBox");
    let inputText = closestReplyBox.children[1].value;
    if (inputText != "") {
      closestCommentBox.appendChild(addReply(inputText));
      closestReplyBox.remove();
    }
  }
});

//Add a comment

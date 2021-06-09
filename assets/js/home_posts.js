{
    // method to submit the form data of a new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) { 
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create-post',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDOM(data.response.post);
                    $('#posts-list-container').prepend(newPost);
                    flashNoty('Post Published !!','success');
                    deletePost($(' .delete-post-button',newPost));
                    createComment($(' .new-comment-form',newPost));
                    
                },
                error: function(err){
                    console.log(err.responseText);
                }
            });

            // this will reset the form input fields after submission
            this.reset();
        });
    }

    //method to create a post in DOM
    let newPostDOM = function(post){
        return $(`<div id="post-${post._id}" class="card">
        <div class="card-header">
        <i class="far fa-calendar-alt"></i>
        Post published : just now
        <a class="delete-post-button" href="/posts/destroy/${post._id}"> <i class="fas fa-trash-alt"></i></a>
        </div>
        <div class="card-body">
          <h5 class="card-title">
                ${post.content}
          </h5>
          <p class="card-text"> post by : you </p>
          <div>
            <ul class = "comments-list-container">
            </ul>
        </div>
        <div>
            <form class = "new-comment-form" action="/comments/create" method="POST">
                <input name="content" type="text" placeholder="Add comment...">
                <input type="hidden" name="post" value= ${post._id}>
                <input type="submit" value="Comment">
            </form>
        </div>
        </div>
      </div>`);
    }

    // method to submit the form data of a new comment using AJAX
    let createComment = function(addCommentLink){
        $(addCommentLink).submit(function (e) { 
            e.preventDefault();
            $.ajax({
                type: "post",
                url: "/comments/create",
                data: addCommentLink.serialize(),
                success: function (data) {
                    let newComment = newCommentDOM(data.data.comment);
                    let associatedPost = `#post-${data.data.comment.post} .comments-list-container`;
                    flashNoty('Comment Published !!','success');
                    $(associatedPost).prepend(newComment);
                    deleteSelectedComment($(' .delete-comment-button',newComment));
                },error: function(err){
                    console.log(err.responseText);
                }
            });

            this.reset();
        });
    }

    //method to create a comment in DOM
    let newCommentDOM = function(comment)
    {
        return $(`<li id="comment-${comment._id}"> 
                    ${comment.content} by : 
                    <em>you</em>
                    <a class = "delete-comment-button" href="/comments/destroy/${comment._id}"> <button type="button" class="btn btn-outline-danger"><em>Remove</em></button></a>
                </li>`);
    }

    // Traverse to each existing post and associated comments and link delete operation
    // Add AJAX deletion to all the posts which are already present on the page
    function deleteItems()
    {
        let posts = $('#posts-list-container>div');
        for(post of posts)
        {
            deletePost($(' .delete-post-button',post));
            deleteComment($(' .comments-list-container>li',post));
            createComment($(' .new-comment-form',post));
        }
    }

    let deletePost = function(deleteLink){
        $(deleteLink).click(function (e) { 
            e.preventDefault();
            $.ajax({
                type: "get",
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    flashNoty('Post deleted !!','info');
                },
                error: function(err){
                    console.log(err.responseText);
                }
            });

        });
    }

    let deleteSelectedComment = function(deleteCommentLink){
        $(deleteCommentLink).click(function (e) { 
            e.preventDefault();
            
            $.ajax({
                type: "get",
                url: $(deleteCommentLink).prop('href'),
                success: function (data) {
                    $(`#comment-${data.data.comment_id}`).remove();
                    flashNoty('Comment deleted !!','info');
                },
                error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }
    // Associate delete link to each comment contained within a post 
    let deleteComment = function(commentsList){
        for(let comment of commentsList)
        {
            console.log(comment);
            deleteSelectedComment($(' .delete-comment-button',comment));
        }
    }


    let flashNoty = function(message,type){
        new Noty({
            theme: 'relax',
            text: message,
            type: type,
            layout:'topCenter',
            timeout:1500
        }).show();
    }


    createPost();
    deleteItems();

}
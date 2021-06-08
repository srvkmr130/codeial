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
        });
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
                },error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    let newCommentDOM = function(comment)
    {
        return `<li id="comment-${comment._id}"> 
                    <a href="/comments/destroy/${comment._id}"> X </a>
                    ${comment.content} by : 
                    <em>you</em>
                </li>`
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

    function deletePostFunc()
    {
        let posts = $('#posts-list-container>div');
        for(post of posts)
        {
            deletePost($(' .delete-post-button',post));
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

    createPost();
    deletePostFunc();

}
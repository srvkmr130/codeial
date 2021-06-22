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
                    
                    // call the create comment class
                    new PostComments(data.response.post._id);

                    new ToggleLike($(' .toggle-like-button', newPost));
                    
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
        <a class = "toggle-like-button" data-likes="${post.likes.length}"
                href="/likes/toggle/?id=${post._id}&type=Post">
                <i class="far fa-thumbs-up fa-lg"></i>
                ${post.likes.length} Likes
        </a>
        </div>
        <div class="card-body">
          <h5 class="card-title">
                ${post.content}
          </h5>
          <p class="card-text"> post by : you </p>
          <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
            </ul>
        </div>
        <div>
        <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
                <input name="content" type="text" placeholder="Add comment...">
                <input type="hidden" name="post" value= ${post._id}>
                <input type="submit" value="Comment">
            </form>
        </div>
        </div>
      </div>`);
    }

    // method to delete a post from DOM
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

    //    1. Traverse to each existing post and associated comments and link delete operation
    //    2. Add AJAX deletion to all the posts which are already present on the page

    //    Summary : loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    


    let convertPostsToAjax = function(){
        $('#posts-list-container>div').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button',self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            new PostComments(postId);
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

    createPost();
    convertPostsToAjax();

}
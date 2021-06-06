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
                    console.log(data);
                    let newPost = newPostDOM(data.response.post);
                    $('#posts-list-container').prepend(newPost);
                },
                error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }


    //method to create a post in DOM
    let newPostDOM = function(post){
        return(`<div id="post-${post._id}" class="card">
        <div class="card-header">
        <i class="far fa-calendar-alt"></i>
        Post published : just now
        <a class="delete-post-button" href="/posts/destroy/${post.id}"> X </a>
        </div>
        <div class="card-body">
          <h5 class="card-title">
                ${post.content}
          </h5>
          <p class="card-text"> post by : ${post.user.name}</p>
        <div>
            <form action="/comments/create" method="POST">
                <input name="content" type="text" placeholder="Add comment...">
                <input type="hidden" name="post" value="<%= post._id%>">
                <input type="submit" value="Comment">
            </form>
        </div>
        </div>
      </div>`);
    }

    createPost();
}
// Implement comment using classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        $(' .delete-comment-button',this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: "post",
                url: "/comments/create",
                data: $(self).serialize(),
                success: function (data) {
                    let newComment = pSelf.newCommentDOM(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button',newComment));
                    new ToggleLike($(' .toggle-like-button', newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topCenter',
                        timeout: 1500
                        
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });

            this.reset();
        })
    }

    //method to create a comment in DOM
    newCommentDOM(comment)
    {
        return $(`<li id="comment-${comment._id}"> 
                    ${comment.content} by : 
                    <em>you</em>
                    <a class = "delete-comment-button" href="/comments/destroy/${comment._id}"> <button type="button" class="btn btn-outline-danger"><em>Remove</em></button></a>
                    <a class = "toggle-like-button" data-likes="${comment.likes.length}"
                    href="/likes/toggle/?id=${comment._id}&type=Comment"><i class="fa-thumbs-up"></i> 
                    ${comment.likes.length} Likes
                    </a>
                    </li>`);
    }

    deleteComment(deleteLink)
    {
        $(deleteLink).click(function (e) { 
            e.preventDefault();
            
            $.ajax({
                type: "get",
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
}


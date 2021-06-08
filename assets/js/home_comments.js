// {
//     let createComment = function(){
//         console.log()
//         let commentForm = $('.new-comment-form');
//         console.log(commentForm);
//         commentForm.submit(function (e) { 
//             e.preventDefault();
//             console.log(commentForm.serialize());
//             $.ajax({
//                 type: "post",
//                 url: "/comments/create",
//                 data: commentForm.serialize(),
//                 success: function (data) {
//                     newCommentDOM(data.data.comment);
//                 },error: function(err){
//                     console.log(err.responseText);
//                 }
//             });
//         });
//     }

//     let newCommentDOM = function(comment)
//     {
//         console.log(comment);
//     }

//     createComment();
// }
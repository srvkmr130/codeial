class ToggleLike {
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function (e) { 
            e.preventDefault();
            let self = this;

            $.ajax({
                type: "post",
                url: $(self).attr('href'),
                success: function (data) {
                    let likesCount = parseInt($(self).attr('data-likes'));
                    let toggleLikeIcon = 'far';
                    if(data.data.deleted == true){
                        likesCount -= 1;
                        toggleLikeIcon = 'far';
                    }else{
                        likesCount += 1;
                        toggleLikeIcon = 'fas';
                    }

                    $(self).attr('data-likes', likesCount);
                    $(self).html(`<i class="${toggleLikeIcon} fa-thumbs-up fa-lg"> </i>${likesCount} Likes`);

                },
                error: function(err){
                    console.log('Error',err);
                }
            });
        });
    }
}
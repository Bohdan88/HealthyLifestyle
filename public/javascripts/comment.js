

$(function() {

    let commentForm;
    let parentId;

    function form(isNew, comment) {
        $('.reply').show();

        if (commentForm) {
            commentForm.remove();
        }
        parentId = null;

        commentForm = $('.comment').clone(true, true);

        if (isNew) {
            commentForm.find('.cancel').hide();
            commentForm.appendTo('.h3_comment');
        } else {
            var parentComment = $(comment).parent();
            parentId = parentComment.attr('id');
            $(comment).after(commentForm);
        }

        commentForm.css({ display: 'flex', position: 'relative'});
    }

    // load
    form(true);

    // add form
    $('.reply').on('click', function() {
        form(false, this);
        $(this).hide();
    });


    // add form


    $('form.comment .cancel').on('click', function(e) {

        e.preventDefault();
        commentForm.remove();

        form(true);

    });



// publish
    $('form.comment .send').on('click', function(e) {
        e.preventDefault();

        // removeErrors();

        let data = {
            post: $(".comments").attr("id"),
            body: commentForm.find('textarea').val(),
            parent: parentId
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/comment/add'
        }).done(function(data) {
           // console.log(data);
            if (!data.ok) {
                if ( data.error === undefined) {
                    data.error = 'Unknown error'
                }

                $(commentForm).prepend(`<p class = "error">` + data.error + `</p>`)
            } else {
                var newComment =
                    '<ul class = "ul_children"><li style="background-color:#ffffe0;"><div class="head"><a href="/users/' +
                    data.login +
                    '">' +
                    data.login +
                    '</a><spam class="date"> Just now</spam></div>' +
                    data.body +
                    '</li></ul>';

                $(commentForm).after(newComment);
                form(true);
            }

        });
    });
});

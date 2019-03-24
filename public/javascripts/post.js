


$(function() {

    // remove errors
    function removeErrors() {
        $('.post-form p.error').remove();
        $('.post-form input, #post-body').removeClass('error');
    }
    // eslint-disable-next-line
 //   var editor = new MediumEditor('#post-body', {
 //       placeholder: {
 //           text: '',
 //           hideOnClick: true
 //       }
 //   });

    // clear
    $('.post-form input, #post-body').on('focus', function() {
        removeErrors();
      //  $('.post-form p.error').remove();
      //  $('.post-form input, #post-body').removeClass('error');
    });

    // publish
    $('.publish-button, .save-button').on('click', function(e) {
        e.preventDefault();
        removeErrors();

        var isDraft =
            $(this)
                .attr('class')
                .split(' ')[0] === 'save-button';


        var data = {
            title: $('#post-title').val(),
            body: $('#post-body').val(),
            isDraft: isDraft,
            postId: $('#post-id').val(),


        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/post/add'
        }).done(function(data) {
            console.log(data);
            if (!data.ok) {
                $('.post-form h2').after(`<p class="error">` + data.error + `</p>`);
                if (data.fields) {
                    data.fields.forEach(function(item) {
                        $('#post-' + item).addClass('error');
                    });
                }
            } else {

                if (isDraft)  {
                    $(location).attr('href', '/post/edit/' + data.post.id);
                } else {
                    $(location).attr('href', '/posts/' + data.post.url);

                }
                // $('.register h2').after('<p class="success">Отлично!</p>');
             //   $(location).attr('href', '/post/add');
            }
        });
    });


    // uploads photochki

    $('#fileinfo').on('submit', function(e) {
        e.preventDefault();

        var formData = new FormData(this);


        $.ajax({
            type: 'POST',
            url: '/upload/image',
            data: formData,
            processData: false,
            contentType:  false,
            success: function (r) {
                console.log(r)
            },

            error: function (err) {
                console.log(err)
            }
        })
    });



});

/* eslint-enable no-undef */

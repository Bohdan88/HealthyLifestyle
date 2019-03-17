



$('input').on('focus', ()=>{
    $('p.error').remove();
    $('input').removeClass('error')
})






/*  animate form */
$(function() {

    let flag = true;

    $('.switch_button').on('click', function (e) {
        e.preventDefault();

        $('input').val('');
        $('p.error').remove();
        $('input').removeClass('error')



        if (flag) {
            flag = false;
            $('.register').show('slow');
            $('.login').hide();

        } else {
            flag = true;
            $('.login').show('slow');
            $('.register').hide();
        }
    });

    // register

    $('.register-button').on('click', function (e) {
        e.preventDefault();

        $('p.error').remove();
        $('input').removeClass('error')

        let data = {
            email: $('#register-email').val(),
            login: $('#register-login').val(),
            password: $('#register-password').val(),
            passwordConfirm: $('#register-password-confirm').val()
        };


/// ajax


        $.ajax({
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/auth/register',
        }).done(function (data) {
            if (!data.ok) {
                $('.register .after').after(`<p class = "error">` + data.error + `</p>`)

                if (data.fields) {
                    data.fields.forEach(function (item) {
                        $('input[name=' + item + ']').addClass('error')

                    })
                }
            } else {
                $(location).attr('href', '/');

                // $('.register .after').after('<p class = "success">' + data + '</p>')
            }


        });
    });

    $('.login-button').on('click', function (e) {
        e.preventDefault();

        $('p.error').remove();
        $('input').removeClass('error')
        let data = {

            login: $('#login-button').val(),
            password: $('#password-button').val(),
        };


/// ajax


        $.ajax({
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/auth/login',
        }).done(function (data) {
            if (!data.ok) {
                $('.login .after').after(`<p class = "error">` + data.error + `</p>`)

                if (data.fields) {
                    data.fields.forEach(function (item) {
                        $('input[name=' + item + ']').addClass('error')

                    })
                }
            } else {
                $(location).attr('href', '/');
              //  $('.login .after').after('<p class = "success">' + data + '</p>')
            }


        });

    });


});

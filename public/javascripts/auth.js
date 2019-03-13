

/*  анимирование формы */
$(function() {

    let flag = true;


    $('.switch_button').on('click', function (e) {
        e.preventDefault();

        $('input').val('')

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

    $('.register-button').on('click', function(e){
        e.preventDefault();


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
}).done(function(data){

    console.log(data)
        })
    });
});

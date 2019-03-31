
// add navigation

function myFunction() {
    let x = document.body.querySelector(".sidenav")

    if (x.className == 'sidenav') {
        x.className += " responsive"
    }

    x.style.width = "237px";

    let body = document.getElementsByTagName('BODY')[0]
    body.style.backgroundColor = 'rgba(34,36,36,0.80)'

}

function closeNav() {
    document.body.querySelector(".sidenav").style.width = 0;
    let body = document.getElementsByTagName('BODY')[0]

    body.style.backgroundColor = '#fff'

}


/* eslint-enable no-undef */


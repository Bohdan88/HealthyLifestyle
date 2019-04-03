
// add navigation

function myFunction() {
    let x = document.body.querySelector(".sidenav")

    if (x.className == 'sidenav') {
        x.className += " responsive"
    }
    x.style.width = "237px";

    let body = document.getElementsByTagName('BODY')[0]
    let addPost = document.querySelector('.post-form')


    body.style.backgroundColor = 'rgba(34,36,36,0.80)'

    if (!addPost) {
       return
    }
    addPost.style.backgroundColor = 'rgba(34,36,36,0.80)'
}

function closeNav() {
    document.body.querySelector(".sidenav").style.width = 0;
    let body = document.getElementsByTagName('BODY')[0]
    let addPost = document.querySelector('.post-form')

    body.style.backgroundColor = '#fff'
    if (!addPost) {
return
    }
    addPost.style.backgroundColor = '#fff'

}

// hide excessive  text
let clearText = (text) => {
    let newStr = ''
    if (text.innerHTML.length > 5) {
        newStr += text.innerHTML
    }
    let strDiv = document.createElement('div');


    strDiv.textContent = newStr.slice(0,5) + '...';
    let body = document.getElementsByTagName('BODY')[0]

   // document.body.removeChild(text)
    document.body.appendChild(strDiv)

}


//document.body.removeChild(bodyPost)
//clearText(bodyPost)
/* eslint-enable no-undef */


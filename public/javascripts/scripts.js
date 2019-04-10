
// add navigation


function myFunction() {
    let x = document.body.querySelector(".sidenav")

    if (x.className == 'sidenav') {
        x.className += " responsive"
    }
    x.style.width = "237px";

    let body = document.getElementsByTagName('BODY')[0]
    let addPost = document.querySelector('.post-form');
    let form = document.querySelector('.input')
    let buttons = document.querySelector('.buttons')


   // form.style.
    if ( buttons === null) {
        return
    }
    if (!addPost || !form || !buttons) {
       return
    }

    body.style.backgroundColor = 'rgba(34,36,36,0.80)'
    form.style.zIndex = '-1'

    buttons.style.zIndex = '-1';
    addPost.style.backgroundColor = 'rgba(34,36,36,0.80)'
}

function closeNav() {
    document.body.querySelector(".sidenav").style.width = 0;
    let body = document.getElementsByTagName('BODY')[0]
    let addPost = document.querySelector('.post-form')
    let form = document.querySelector('.input')
    let buttons = document.querySelector('.buttons')



    if (!addPost || !form || !buttons ) {
return
    }
    body.style.backgroundColor = '#fff';
    form.style.zIndex = '0';
    buttons.style.zIndex = '0';

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


// help page scripts

let tree = document.querySelector('.list_questions')

if(tree === null) {} else {

    tree.onclick = function (e) {
        let target = e.target;

        if (!target.classList.contains('parent_question')) {
            return
        }

        if (target.classList.contains('parent_question')) {
            target.classList.toggle('open')

        }

        let childrenContainer = target.parentNode.querySelector('.children')

        childrenContainer.classList.toggle('children_question')


    }

}


let icon = document.querySelector('.icon')


function hideButton() {
    let x = document.body.querySelector(".sidenav")

    if (x.className == 'sidenav') {
        x.className += " responsive"
    }
    x.style.width = "237px";

    let buttons = document.querySelector('.buttons')
    let form = document.querySelector('.input')


    form.style.zIndex = '-1'
    buttons.style.zIndex = '-1';
}

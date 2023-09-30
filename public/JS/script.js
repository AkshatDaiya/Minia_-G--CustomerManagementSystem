let password = document.getElementById('emailPass')
let password_1 = document.getElementById('emailPass').value
let eyeSlash = document.getElementById('eyeSlash')



//<!---------------------------- PASSWORD REVEAL BUTTON ---------------------------!>
function toText() {
    if (password.type === 'password') {
        document.getElementById('emailPass').attributes[0].nodeValue = 'text'
        eyeSlash.style.display= 'block'
        document.getElementById('eye').classList.replace('eye-0','eye-1')
    }
    else {
        document.getElementById('emailPass').attributes[0].nodeValue = 'password'
        eyeSlash.style.display= 'none'
        document.getElementById('eye').classList.replace('eye-1','eye-0')
    }
}

//<!---------------------------- PASSWORD CONDITIONS ---------------------------!>

// function passConditions() {

//     // if (password_1.trim() == '') {
//     //     document.getElementById('emailPass').style.border = '1px solid red'
//     //     document.getElementById('error').innerText = "Can't give only spacices"
//     //     document.getElementById('error').style.color = 'red'
//     //     return false
//     // }

//     // reg = /.+[^\s]/g

//     // if(reg.test(password_1)){
//     //     document.getElementById('emailPass').style.border = '1px solid red'
//     //     document.getElementById('error').innerText = "Can't give only spacices"
//     //     document.getElementById('error').style.color = 'red'
//     //     return false
//     // }else if(password_1.length <= 8){
//     //     document.getElementById('error').innerText = 'More then 8 letter'
//     //     document.getElementById('emailPass').style.border = '1px solid red'
//     //     document.getElementById('error').style.color = 'red'
//     //     return false
//     // }


//     if (password_1.length <= 8) {
//         document.getElementById('error').innerText = 'More then 8 letter'
//         document.getElementById('error').style.color = 'red'
//         document.getElementById('emailPass').style.border = '1px solid red'
//         return false
//     }
// }
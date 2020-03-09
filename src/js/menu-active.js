// function menu () {
//     let menuIcon =  document.querySelector('.menu-icon'),
//         nav = document.querySelector('.navigation');

//     return menuIcon.onclick = function(){
//         menuIcon.classList.toggle('menu-icon-active');
//         nav.classList.toggle('navigation_active');
//     }
// }


// menu ();

(function () {
    let menuIcon =  document.querySelector('.menu-icon'),
    nav = document.querySelector('.navigation');

    return menuIcon.onclick = function(){
        menuIcon.classList.toggle('menu-icon-active');
        nav.classList.toggle('navigation_active');
    }
}());




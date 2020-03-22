(function () {
    let menuIcon =  document.querySelector('.menu-icon'),
    nav = document.querySelector('.navigation');
    navMenuMobile = document.querySelector('.nav-menu_mobile')

    return menuIcon.onclick = function(){
        menuIcon.classList.toggle('menu-icon_active');
        nav.classList.toggle('navigation_active');
        navMenuMobile.classList.toggle('nav-menu_mobile_active');
    }
}());



(function () {

    let preloader  = document.createElement('div');

    preloader.className = "preloader";
    preloader.innerHTML = '<div class="b-ico-preloader"></div><div class="spinner"></div>';
    document.body.appendChild(preloader);
    
    window.addEventListener('load', function() {
      preloader.className +=  ' fade';
      setTimeout(function(){
         preloader.style.display = 'none';
      },600);
    })
}());
const anchors = document.querySelectorAll('a[href*="#"]')

anchors.forEach((anchor) => {

  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const blockID = anchor.getAttribute('href').substr(1)
    
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })

  })
})
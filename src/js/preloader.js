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
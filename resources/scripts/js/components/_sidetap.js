/**
 *
 *  Sidetap
 *  The sidetap JS handles the class toggling of the navigational menu on mobile devices.
 *
 */

(function(){

  var sidetap_link = document.getElementsByClassName('side-tap')[0],
      body = document.body;

  sidetap_link.addEventListener('click', e => body.classList.toggle('side-tap--open'));

})();

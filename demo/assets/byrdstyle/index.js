(function() {
  var $ = {};

  $.dropdown = function (trigger, menu) {
    if(!menu.classList.contains("active")){
      menu.style.width = trigger.offsetWidth+8+'px';
      menu.classList += ' active';
    } else
      menu.classList.value = menu.classList.value.replace(' active', '');
  };

  $.modal = function (id, state) {
    var modal = document.getElementById(id);
    if(state==='open')
      modal.classList.value += ' active';
    else if(state==='close'){
      modal.classList.value = modal.classList.value.replace(' active', '');
      modal.classList.value += ' death';
      setTimeout(function() {
        modal.classList.value = modal.classList.value.replace(' death', '');
      }, 300);
    }
  };

  window.Byrdstyle = $;
} ());

function dropdown (btn, id) {
  Byrdstyle.dropdown(btn, id);
}

function modal (id) {
  Byrdstyle.modal(id, 'open');
}

function closeModal (id) {
  Byrdstyle.modal(id, 'close');
}

window.onload = function(){
  var dropdowns = document.querySelectorAll('.dropdown');
  function getTrigger(dd){
    var children = Array.from(dd.children);
    return children.find(function (item) {
      return item.tagName.toLowerCase() === "button";
    });
  }
  function getMenu(dd){
    var children = Array.from(dd.children);
    return children.find(function (item) {
      return item.classList.contains("menu");
    });
  }

  var trigger = getTrigger(dropdowns[0]);
  var menu = getMenu(dropdowns[0]);
  console.log(trigger, menu);
  trigger.onclick = function() { Byrdstyle.dropdown(trigger, menu) };
  trigger.onblur = function() {  Byrdstyle.dropdown(trigger, menu) };
};


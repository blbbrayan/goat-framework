//looks for an active anchor tag
setActive(function() {
  var list, url;
  list = goat.getUnder($tag, '.link');
  url = location.hash || '/';
  return list.forEach(function(ele) {
    if (ele.hash === url) {
      if (!ele.classList.value.includes(' active')) {
        return ele.classList.value += ' active';
      } else {
        return ele.classList.value = ele.classList.value.replace(' active', '');
      }
    }
  });
});

window.addEventListener('hashchange', setActive);

window.addEventListener('load', setActive);

setActive();

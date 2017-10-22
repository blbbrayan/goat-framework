((goat) ->

  goat.router.addRoute('/', 'home', ["data"])
  goat.router.addRoute('/home', 'home', ["data"])
  goat.router.addRoute('/other', 'other', ["data"])

  goat.router.start()

)(window.goat)
((goat) ->

  goat.router.addRoute('/', 'home', ["data"])
  goat.router.addRoute('/home', 'home')
  goat.router.addRoute('/other', 'other')

  goat.router.start()

)(window.goat)
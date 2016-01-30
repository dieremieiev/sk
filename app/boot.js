(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    ng.core.enableProdMode()
    ng.platform.browser.bootstrap(app.AppComponent, ng.router.ROUTER_PROVIDERS)
  })
})(window.app || (window.app = {}))

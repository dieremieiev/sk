(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    ng.core.enableProdMode()
    ng.platform.browser.bootstrap(
      app.AppComponent,
      [ng.router.ROUTER_PROVIDERS, ng.core.provide(ng.router.LocationStrategy, {
        useClass: ng.router.HashLocationStrategy
      })]
    )
  })
})(window.app || (window.app = {}))

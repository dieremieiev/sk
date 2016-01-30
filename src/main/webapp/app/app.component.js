"use strict";

function createAppComponent()
{
  return ng.core.Component({
    directives: [ng.router.ROUTER_DIRECTIVES],
    selector: 'my-app',
    template: `
      <div>
        <div class="app-navbar">
          <nav>
            <ul>
              <li><a [routerLink]="['Base64Decoder']">Base64 decoder</a></li>
              <li><a [routerLink]="['Base64Encoder']">Base64 encoder</a></li>
            </ul>
          </nav>
        </div>
        <div class="app-content">
          <router-outlet></router-outlet>
        </div>
      </div>
    `
  })
  .Class({
    constructor: function() {}
  })
}

function createBase64DecoderComponent()
{
  return ng.core.Component({
    changeDetection: ng.core.ChangeDetectionStrategy.OnPush,
    queries: {
        vc: new ng.core.ViewChildren('inputelement')
    },
    template: `
      <h2>Base64 decoder</h2>
      <p>
        <label>Base64 encoded text:</label>
        <textarea #inputelement cols="40" rows="5" [(ngModel)]="input"></textarea>
      </p>
      <p>
        <label>Decoded text:</label>
        <textarea cols="40" rows="5" readonly="readonly">{{evaluate()}}</textarea>
      </p>
    `
  })
  .Class({
    constructor: function() {
      this.input = null
    },

    ngAfterViewInit: function() {
      this.vc.first.nativeElement.focus();
    },

    evaluate() {
      if (this.input == null) {
        return null
      }

      try {
        return atob(this.input)
      } catch (e) {
        return 'Input string is not Base64 decoded'
      }
    }
  })
}

function createBase64EncoderComponent()
{
  return ng.core.Component({
    changeDetection: ng.core.ChangeDetectionStrategy.OnPush,
    queries: {
        vc: new ng.core.ViewChildren('inputelement')
    },
    template: `
      <h2>Base64 encoder</h2>
      <p>
        <label>Text:</label>
        <textarea #inputelement cols="40" rows="5" [(ngModel)]="input"></textarea>
      </p>
      <p>
        <label>Base64 encoded text:</label>
        <textarea cols="40" rows="5" readonly="readonly">{{evaluate()}}</textarea>
      </p>
    `
  })
  .Class({
    constructor: function() {
      this.input = null
    },

    ngAfterViewInit: function() {
      this.vc.first.nativeElement.focus();
    },

    evaluate() {
      if (this.input == null) {
        return null
      }

      try {
        return btoa(this.input)
      } catch (e) {
        return 'Input string is not Base64 encoded'
      }
    }
  })
}

(function(app) {
  app.Base64DecoderComponent = createBase64DecoderComponent()
  app.Base64EncoderComponent = createBase64EncoderComponent()

  app.AppComponent = createAppComponent()

  app.AppComponent = ng.router.RouteConfig([
    { path: '/base64decoder', component: app.Base64DecoderComponent, name:'Base64Decoder' },
    { path: '/base64encoder', component: app.Base64EncoderComponent, name:'Base64Encoder' }
  ])(app.AppComponent);
})(window.app || (window.app = {}))

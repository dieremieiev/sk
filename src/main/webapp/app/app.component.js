"use strict";

function createAppComponent()
{
  return ng.core.Component({
    directives: [ng.router.ROUTER_DIRECTIVES],
    selector: '.app-main',
    template: `
      <div>
        <div class="app-top">SK v1.01</div>
        <div class="app-navbar">
          <nav>
            <ul>
              <li><a [routerLink]="['URIDecoder']">URI decoder</a></li>
              <li><a [routerLink]="['URIEncoder']">URI encoder</a></li>
              <li><a [routerLink]="['Base64Decoder']">Base64 decoder</a></li>
              <li><a [routerLink]="['Base64Encoder']">Base64 encoder</a></li>
              <li><a [routerLink]="['Timestamp']">Timestamp</a></li>
              <li><a [routerLink]="['UUIDGenerator']">UUID generator</a></li>
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
        <textarea cols="40" rows="5" readonly="readonly" placeholder="{{message}}">{{result}}</textarea>
      </p>
    `
  })
  .Class({
    constructor: function() {
      this.input    = null
      this.inputOld = null
      this.message  = null
      this.result   = null
    },

    ngAfterContentChecked() { 
      if (this.input != this.inputOld) {
        this.evaluate()
        this.inputOld = this.input
      }
    },

    ngAfterViewInit() {
      this.vc.first.nativeElement.focus();
    },

    evaluate() {
      this.message = null
      this.result  = null

      if (this.input == null || this.input.length == 0) { return }

      try {
        this.result = atob(this.input)
      } catch (e) {
        this.message = 'Input string is not Base64 decoded'
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
        <label>Input text:</label>
        <textarea #inputelement cols="40" rows="5" [(ngModel)]="input"></textarea>
      </p>
      <p>
        <label>Base64 encoded text:</label>
        <textarea cols="40" rows="5" readonly="readonly" placeholder="{{message}}">{{result}}</textarea>
      </p>
    `
  })
  .Class({
    constructor: function() {
      this.input    = null
      this.inputOld = null
      this.message  = null
      this.result   = null
    },

    ngAfterContentChecked() {
      if (this.input != this.inputOld) {
        this.evaluate()
        this.inputOld = this.input
      }
    },

    ngAfterViewInit() {
      this.vc.first.nativeElement.focus();
    },

    evaluate() {
      this.message = null
      this.result  = null

      if (this.input == null || this.input.length == 0) { return }

      try { 
        this.result = btoa(this.input)
      } catch (e) {
        this.message = 'Input string is not Base64 decoded'
      }
    }
  })
}

function createTimestampComponent()
{
  return ng.core.Component({
    changeDetection: ng.core.ChangeDetectionStrategy.OnPush,
    queries: {
        vc: new ng.core.ViewChildren('inputelement')
    },
    template: `
      <h2>Base64 encoder</h2>
      <p>
        <label>Timestamp, in milliseconds:</label>
        <textarea #inputelement cols="40" rows="5" [(ngModel)]="input"></textarea>
      </p>
      <p>
        <label>Date/time (ISO):</label>
        <textarea cols="40" rows="5" readonly="readonly" placeholder="{{message}}">{{result}}</textarea>
      </p>
    `
  })
  .Class({
    constructor: function() {
      this.input    = null
      this.inputOld = null
      this.message  = null
      this.result   = null
    },

    ngAfterContentChecked() {
      if (this.input != this.inputOld) {
        this.evaluate()
        this.inputOld = this.input
      }
    },

    ngAfterViewInit() {
      this.vc.first.nativeElement.focus();
    },

    evaluate() {
      this.message = null
      this.result  = null

      if (this.input == null || this.input.length == 0) { return }

      var i = parseInt(this.input, 10)
      var n = Number(this.input)
      var d = i == n ? new Date(i) : null

      if (d != null && !isNaN(d.getTime())) {
        this.result = d.toISOString()
      } else {
        this.message = 'Wrong input value'
      }
    }
  })
}

function createURIDecoderComponent()
{
  return ng.core.Component({
    changeDetection: ng.core.ChangeDetectionStrategy.OnPush,
    queries: {
        vc: new ng.core.ViewChildren('inputelement')
    },
    template: `
      <h2>URI decoder</h2>
      <p>
        <label>URI encoded:</label>
        <textarea #inputelement cols="40" rows="5" [(ngModel)]="input"></textarea>
      </p>
      <p>
        <label>URI decoded:</label>
        <textarea cols="40" rows="5" readonly="readonly" placeholder="{{message}}">{{result}}</textarea>
      </p>
    `
  })
  .Class({
    constructor: function() {
      this.input    = null
      this.inputOld = null
      this.message  = null
      this.result   = null
    },

    ngAfterContentChecked() {
      if (this.input != this.inputOld) {
        this.evaluate()
        this.inputOld = this.input
      }
    },

    ngAfterViewInit() {
      this.vc.first.nativeElement.focus();
    },

    evaluate() {
      this.message = null
      this.result  = null

      if (this.input == null || this.input.length == 0) { return }

      try {
        this.result = decodeURIComponent(this.input)
      } catch (e) {
        this.message = 'Error: ' + e.message
      }
    }
  })
}

function createURIEncoderComponent()
{
  return ng.core.Component({
    changeDetection: ng.core.ChangeDetectionStrategy.OnPush,
    queries: {
        vc: new ng.core.ViewChildren('inputelement')
    },
    template: `
      <h2>URI encoder</h2>
      <p>
        <label>URI decoded:</label>
        <textarea #inputelement cols="40" rows="5" [(ngModel)]="input"></textarea>
      </p>
      <p>
        <label>URI encoded:</label>
        <textarea cols="40" rows="5" readonly="readonly" placeholder="{{message}}">{{result}}</textarea>
      </p>
    `
  })
  .Class({
    constructor: function() {
      this.input    = null
      this.inputOld = null
      this.message  = null
      this.result   = null
    },

    ngAfterContentChecked() {
      if (this.input != this.inputOld) {
        this.evaluate()
        this.inputOld = this.input
      }
    },

    ngAfterViewInit() {
      this.vc.first.nativeElement.focus();
    },

    evaluate() {
      this.message = null
      this.result  = null

      if (this.input == null || this.input.length == 0) { return }

      try {
        this.result = encodeURIComponent(this.input)
      } catch (e) {
        this.message = 'Error: ' + e.message
      }
    }
  })
}

function createUUIDGeneratorComponent()
{
  return ng.core.Component({
    changeDetection: ng.core.ChangeDetectionStrategy.OnPush,
    queries: {
        vc: new ng.core.ViewChildren('button')
    },
    template: `
      <h2>UUID generator</h2>
      <p>
        <input #button type="button" value="Generate" (click)="evaluate()">
      </p>
      <p>
        <label>UUID:</label>
        <textarea cols="40" rows="5" readonly="readonly">{{result}}</textarea>
      </p>
    `
  })
  .Class({
    constructor: function() {
      this.result = null
      this.evaluate()
    },

    ngAfterViewInit() {
      this.vc.first.nativeElement.focus();
    },

    evaluate() {
      this.result = this.generateUUID()
    },

    generateUUID() {
      var d = new Date().getTime()

      if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now()
      }

      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16) % 16 | 0
        d = Math.floor(d/16)
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
    }
  })
}

(function(app) {
  app.AppComponent = ng.router.RouteConfig([
    { path: '/base64decoder', component: createBase64DecoderComponent(), name: 'Base64Decoder' },
    { path: '/base64encoder', component: createBase64EncoderComponent(), name: 'Base64Encoder' },
    { path: '/timestamp'    , component: createTimestampComponent()    , name: 'Timestamp'     },
    { path: '/uridecoder'   , component: createURIDecoderComponent()   , name: 'URIDecoder', useAsDefault: true },
    { path: '/uriencoder'   , component: createURIEncoderComponent()   , name: 'URIEncoder'    },
    { path: '/uuidgenerator', component: createUUIDGeneratorComponent(), name: 'UUIDGenerator' }
  ])(createAppComponent());
})(window.app || (window.app = {}))

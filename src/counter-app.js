import { LitElement, html, css } from 'lit';

class CounterApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: center;
      font-size: 24px;
      margin-bottom: 16px;
    }

    .counter-display {
      font-size: 48px;
    }

    button {
      margin: 16px;
      padding: 8px;
      background-color: grey;
    }

    button:disabled {
      opacity: 0.5;
    }
    button:hover{
      color: orange;
    }
    button:focus{
      outline: none;
      box-shadow: 10px 5px 5px;
    }
  `;

  static get properties() {
    return {
      counter: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true },
    };
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 25;
  }

  render() {
    var textColor = "black";
    if(this.counter === this.max){textColor = "red"}
    if(this.counter === this.min){textColor = 'green'}
    if(this.counter === 18){textColor = 'orange'}
    if(this.counter === 21){textColor = 'blue'}
    


    return html`
      <confetti-container id ="confetti">
      <div class="counter-display" style="color:${textColor}">${this.counter}
    </div>
      <button id="decrement" @click="${this.decrement}" ?disabled="${this.counter === this.min}">-</button>
      <button id="increment" @click="${this.increment}" ?disabled="${this.counter === this.max}">+</button>
      </confetti-container>
    `;
  }


  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }


updated(changedProperties) {
  if (changedProperties.has('counter')) {
    // do your testing of the value and make it rain by calling makeItRainthis
    if (this.counter === 21) {
      this.makeItRain();
    }
  }
}
makeItRain() {
  // this is called a dynamic import. It means it won't import the code for confetti until this method is called
  // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
  // will only run AFTER the code is imported and available to us
  import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
    (module) => {
      // This is a minor timing 'hack'. We know the code library above will import prior to this running
      // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
      // this "hack" ensures the element has had time to process in the DOM so that when we set popped
      // it's listening for changes so it can react
      setTimeout(() => {
        // forcibly set the poppped attribute on something with id confetti
        // while I've said in general NOT to do this, the confetti container element will reset this
        // after the animation runs so it's a simple way to generate the effect over and over again
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    }
  );
}

}

customElements.define('counter-app', CounterApp);



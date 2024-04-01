import { LitElement, html, css } from 'lit';

export class CampusAlert extends LitElement {

  static get tag() {
    return 'campus-alert';
  }

  constructor() {
    super();
    this.sticky = true;
    this.open = true;
    this.urgency = "notice";
    this.message = "SOMETHING IS GOING ON READ THIS FIRST WHILE YOU ARE HERE";
    this.date = "";
  }

 
  static get styles() {
  return css`
    :host {
      display: flex;
      width: 100%;
      --min-banner-height: 30vh;
      min-height: var(--min-banner-height);
      --color-one: #4102fd;
      --color-two: yellow;
      --zindex-priority: 900;
      --display-mode: unset;
      --display-mode-opposite: none;
      
    }

    :host([urgency="notice"]) {
      --color-one: blue;
      --color-two: skyblue;
      --zindex-priority: 901;
    }

    :host([urgency="caution"]) {
      --color-one: yellow;
      --color-two: #FFD700;
      --zindex-priority: 902;
    }

    :host([urgency="be-careful"]) {
      --color-one: orange;
      --color-two: darkorange;
      --zindex-priority: 903;
    }

    :host([urgency="warning"]) {
      --color-one: red;
      --color-two: darkred;
      --zindex-priority: 904;
    }

    .alertContainer {
      background-color: var(--color-two);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
     
    .centerDiv:before {
        content: " ";
        width: 0;
        height: 0;
        position: absolute;
        bottom: 2rem;
        left: -2rem;
        border-left: 25px solid transparent;
        border-right: 0px solid transparent;
      }
      .

    
  `;
}



/*toggleBanner() {

  
  this.open = !this.open;

  if (this.open) {
    localStorage.removeItem(this.localStorageKey);
  } else {
    localStorage.setItem(this.localStorageKey, 'closed');
  }

  this.requestUpdate();
}
*/

firstUpdated() {
  var stickyAttributeElements = document.querySelectorAll('campus-alert[sticky]');

  stickyAttributeElements.forEach((element) => {
    element.parentNode.removeChild(element);
    document.body.insertBefore(element, document.body.firstChild);
  });

  const slotElement = this.shadowRoot.querySelector('#messageSlot');
  slotElement.textContent = this.message;

 localStorage.setItem("state","closed");


  if (localStorage.getItem("state") == "closed") {
    this.closeBanner();
  }

  
  

  
}




  render() {
    return html`
    <div class="alertContainer" >
      <div class="openTextContainer">
        <span class="openText">
          <button id="openButton" @click="${this.openBanner}">OPEN CAMPUS ALERT!</button>
        </span>
      </div>
      <div class="alertSideText">${this.date}</div>
      <div class="centerDiv">
        <div class="centerDivNormal">
          <div class="exclamation">
          <svg fill="#000000" height="38px" width="38px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.963 27.963" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="c129_exclamation"> <path d="M13.983,0C6.261,0,0.001,6.259,0.001,13.979c0,7.724,6.26,13.984,13.982,13.984s13.98-6.261,13.98-13.984 C27.963,6.259,21.705,0,13.983,0z M13.983,26.531c-6.933,0-12.55-5.62-12.55-12.553c0-6.93,5.617-12.548,12.55-12.548 c6.931,0,12.549,5.618,12.549,12.548C26.531,20.911,20.913,26.531,13.983,26.531z"></path> <polygon points="15.579,17.158 16.191,4.579 11.804,4.579 12.414,17.158 "></polygon> <path d="M13.998,18.546c-1.471,0-2.5,1.029-2.5,2.526c0,1.443,0.999,2.528,2.444,2.528h0.056c1.499,0,2.469-1.085,2.469-2.528 C16.441,19.575,15.468,18.546,13.998,18.546z"></path> </g> <g id="Capa_1_207_"> </g> </g> </g></svg>

              
          </div>
          <div class="centerDivText" id="messageSlot">
            <slot>
              ${this.message}
            </slot>
          </div>
        </div>
      </div>
      <span id="closeClassText" class="alertSideText closeSideText">
        <button id="closeButton" @click="${this.closeBanner}">✕ Close</button>
      </span>
    </div>`;
  }




  closeBanner() {
    if(this.open) {
    this.open = false;
  
   this.style.setProperty('--display-mode', 'none');
    this.style.setProperty('--min-banner-height', '15vh');
    this.style.setProperty('--display-mode-opposite', 'flex');

    localStorage.setItem("state","closed");

    this.shadowRoot.querySelector('#openButton').focus();
  }
}

  openBanner() {
    if (!this.open) {
    this.open = true;
   
    this.style.setProperty('--display-mode', 'unset');
    this.style.setProperty('--min-banner-height', '50vh');
    this.style.setProperty('--display-mode-opposite', 'none');

    localStorage.setItem("state","open");

    this.shadowRoot.querySelector('#closeButton').focus();
  }
}

  static get properties() {
    return {
      sticky: { type: Boolean, reflect: true },
      open: { type: Boolean, reflect: true },
      urgency: { type: String, reflect: true },
      message: { type: String },
      date: { type: String },
    };
  }
}

customElements.define(CampusAlert.tag, CampusAlert);

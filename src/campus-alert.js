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
      --min-banner-height: 20vh;
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
      z-index: var(--z-index-priority);
    }
     
    .alertContainer-wrap:before {
        content: " ";
        width: 0;
        height: 0;
        position: absolute;
        bottom: 2rem;
        left: -2rem;
        border-left: 35px solid transparent;
        border-right: 0px solid transparent;
      }

    
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
  
  const storedStatus = localStorage.getItem(this.localStorageKey);
  if (storedStatus === 'closed') {
    this.open = true;
  }

  const stickyAttributeElements = this.querySelectorAll('campus-alert[sticky]');

  stickyAttributeElements.forEach((element) => {
    element.parentNode.removeChild(element);
    document.body.insertBefore(element, document.body.firstChild);
  });

  const slotElement = this.shadowRoot.querySelector('#messageSlot');
  slotElement.innerHTML = this.message;
}




  render() {
    return html`
    <div class="alertContainer">
      <div class="openTextContainer">
        <span class="openText">
          <button id="openClassText" @click="${this.openBanner}">OPEN CAMPUS ALERT!</button>
        </span>
      </div>
      <div class="alertSideText">${this.date}</div>
      <div class="centerDiv">
        <div class="centerDivNormal">
          <div class="exclamation">
            <svg fill="#000000" height="38px" width="38px" version="1.1" id="Capa_1"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.963 27.963"
              xml:space="preserve">
            </svg>
          </div>
          <div class="centerDivText" id="messageSlot">
            <slot></slot>
          </div>
        </div>
      </div>
      <span id="closeClassText" class="alertSideText closeSideText">
        <button id="closeBannerButton" @click="${this.closeBanner}">✕ Close</button>
      </span>
    </div>
  `;
    ;
  }




  closeBanner() {
    this.open = false;
    this.style.setProperty('--display-mode', 'none');
    this.style.setProperty('--min-banner-height', '6vh');
    this.style.setProperty('--display-mode-opposite', 'flex');
  }

  openBanner() {
    this.open = true;
    this.style.setProperty('--display-mode', 'unset');
    this.style.setProperty('--min-banner-height', '20vh');
    this.style.setProperty('--display-mode-opposite', 'none');
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

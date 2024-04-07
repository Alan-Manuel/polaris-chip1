
import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";


export class haxcmsparty extends DDD {
  
  static get tag() {
    return 'haxcms-party';
  }

  constructor() {
    super();
    this.users = [];
    this.userInput = '';
  
  }

  static get styles() {
    return [
      super.styles,
      css`
        .party-container {
          position: relative;
          border: 10px solid var(--ddd-theme-default-beaver70);
          border-radius: var(--ddd-radius-md);
          padding: var(--ddd-spacing-0) var(--ddd-spacing-5) var(--ddd-spacing-6) var(--ddd-spacing-5);
          box-shadow: var (--ddd-textShadow-sm);
          max-width: 600px;
          margin: var(--party-ui-party-container-margin, auto); 
          width: var(--party-ui-party-container-max-width, 600px);
          height: var(--party-ui-party-container-height, auto);
          background-color: var(--ddd-theme-default-roarLight);
        }

        .add-user-container {
          position: relative;
          margin-bottom: var(--ddd-spacing-0);
        }

        .add-user-container p, .current-user-container p {
          margin-bottom: var(--ddd-spacing-1);
          font-weight: bold;
        }
        
        .text-input {
          width: calc(100% - 110px);
          margin-right:  var(--ddd-spacing-2);
          padding: var(--ddd-spacing-2);
          border: 1px solid var(--ddd-theme-default-beaver70);
          border-radius: 10px var( --ddd-radius-sm);
        }

        #close-button {
          position: absolute;
          top: 0;
          right: 0;
          width: var(--ddd-spacing-6);
          height: var(--ddd-spacing-5);
          background-color: var(--ddd-theme-default-original87Pink);
          color: var(--ddd-theme-default-white);
          border: var(--ddd-border-none);
          border-radius: 5px;
          cursor: pointer;
        }

        #close-button:hover, #close-button:focus {
          transition: ease 0.3s;
          background-color: var(--ddd-theme-default-discoveryCoral) ;
        }

        #add-button {
          position: absolute;
          right: 0;
          padding: var(--ddd-spacing-2) var(--ddd-spacing-8);
          border: none;
          border-radius: var(--ddd-radius-xs);
          background-color: var(--ddd-theme-default-skyBlue);
          color: var(--ddd-theme-default-white);
          cursor: pointer;
        }

        #add-button:hover, #add-button:focus {
          transition: ease 0.3s;
          background-color: var(--ddd-theme-default-pughBlue);
        }

        .current-user-container {
          margin-bottom: var(--ddd-spacing-2);
        }

        .scroll-container {
          overflow-x: auto;
          overflow-y: hidden;
          white-space: nowrap;
          display: flex;
        }

        .card-container {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          vertical-align: top;
          height:var(--party-ui-party-container-height, auto); 
          width: var(--party-ui-party-container-width, auto);
          margin-right: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-2);
          border: 1px solid var(--ddd-theme-default-slateMaxLight);
          border-radius: 5px var( --ddd-radius-sm);
          background-color:var(--simple-colors-default-theme-grey-1);
        }

        .card-container p {
          margin: var(--ddd-spacing-2) var(--ddd-spacing-8);
        }

        .card-container button {
          background-color: var(--simple-colors-default-theme-grey-1);
          border: var(--ddd-border-none)none;
          border-radius: 10px var( --ddd-radius-sm);
          cursor: pointer;
        }

        .card-container button:hover, .card-container button:focus {
          transition: ease 0.3;
          background-color: var(--simple-colors-default-theme-grey-3);
        }

        #save-button {
          position: relative;
          padding:  var(--party-ui-save-button-padding, 10px);
          width: var(--party-ui-save-button-width, 100%);
          background-color: var(--ddd-theme-default-opportunityGreen);
          color:var(---ddd-default-white);
          border: var(---ddd-border-none);
          border-radius: var(---ddd-radius-xs);
          cursor: pointer;
        }

        #save-button:hover, #save-button:focus {
          transition: ease 0.3s;
          background-color: var(--ddd-theme-default-discoveryCoral);
        }
      `
    ];
  }

  handleInputChange(e) {
    this.userInput = e.target.value.replace(/[^a-z0-9]/g, '');
  }

  addUser() {
    if (this.userInput.trim() !== '') {
        const isExistingUser = this.users.some(user => user.username === this.userInput);
        if (isExistingUser) {
            alert('Username already exists!');
        } else {
            this.users.push({ username: this.userInput, character: null });
            this.userInput = '';
        }
    }
}

removeUser(index) {
  this.users = this.users.filter((_, i) => i !== index);
}

saveParty() {
  console.log('Party saved:', this.users);
  if (this.users.length === 0) {
      alert('Saved the party with no users');
  } else if (this.users.length === 1) {
      alert(`Saving party with user: ${this.users[0].username}`);
  } else if (this.users.length === 2) {
      alert(`Saving party with users: ${this.users[0].username} and ${this.users[1].username}`);
  } else {
      const usersExceptLast = this.users.slice(0, -1).map(user => user.username).join(', ');
      const lastUser = this.users[this.users.length - 1].username;
      alert(`Saving party with users: ${usersExceptLast}, and ${lastUser}`);
  }
  this.makeItRain();
}
  
render() {
  return html`
      <confetti-container id="confetti">
      <div class="party-container">
          <div class="add-user-container">
              <p><span>Add User:</span></p>
              <input type="text" class="text-input" .value="${this.userInput}" @input="${this.handleInputChange}">
              <button id="close-button">✕</button>
              <button id="add-button" @click="${this.addUser}">►</button>
          </div>
          <div class="current-user-container">
              <p><span>Current Users:</span></p>
              <div class="scroll-container">
                  ${this.users.map((user, index) => html`
                      <div class="card-container">
                          <rpg-character .seed="${user.character}"></rpg-character>
                          <p>${user.username}</p>
                          <button @click="${() => this.removeUser(index)}">Remove User</button>
                      </div>
                  `)}
              </div>
          </div>
          <button id="save-button" @click="${this.saveParty}">Save Party</button>
      </div>
      </confetti-container>
  `;
}
  makeItRain() {
    import('@lrnwebcomponents/multiple-choice/lib/confetti-container.js').then((module) => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
  }


  static get properties() {
    return {
      ...super.properties,
      users: { type: Array },
      userInput: { type: String }
    };
  }
  
}

customElements.define(haxcmsparty.tag, haxcmsparty);

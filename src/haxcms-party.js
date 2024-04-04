
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
          border-radius: 10px;
          padding: 0px 20px 25px 20px;
          box-shadow: var (--ddd-textShadow-sm);
          max-width: 600px;
          margin: 0 auto;
          width: 100vw;
          height: 48vh;
          background-color: var(--ddd-theme-default-roarLight);
        }

        .add-user-container {
          position: relative;
          margin-bottom: 20px;
        }

        .add-user-container p, .current-user-container p {
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        .text-input {
          width: calc(100% - 110px);
          margin-right: 10px;
          padding: 8px;
          border: 1px solid var(--ddd-theme-default-beaver70);
          border-radius: 10px var( --ddd-radius-sm);
        }

        #close-button {
          position: absolute;
          top: 0;
          right: 0;
          width: 30px;
          height: 20px;
          background-color: var(--ddd-theme-default-original87Pink);
          color: white;
          border: none;
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
          padding: 8.5px 30px;
          border: none;
          border-radius: 5px;
          background-color: var(--ddd-theme-default-skyBlue);
          color: #fff;
          cursor: pointer;
        }

        #add-button:hover, #add-button:focus {
          transition: ease 0.3s;
          background-color: var(--ddd-theme-default-pughBlue);
        }

        .current-user-container {
          margin-bottom: 20px;
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
          height: auto;
          width: auto;
          margin-right: 2.5px;
          padding: 2.5px;
          border: 1px solid var(--ddd-theme-default-slateMaxLight);
          border-radius: 5px var( --ddd-radius-sm);
          background-color: #f9f9f9;
        }

        .card-container p {
          margin: 5px 0;
        }

        .card-container button {
          background-color: #f9f9f9;
          border: none;
          border-radius: 10px var( --ddd-radius-sm);
          cursor: pointer;
        }

        .card-container button:hover, .card-container button:focus {
          transition: ease 0.3;
          background-color: #bebebe;
        }

        #save-button {
          position: relative;
          padding: 10px;
          width: 100%;
          background-color: var(--ddd-theme-default-opportunityGreen);
          color: #fff;
          border: none;
          border-radius: 5px;
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
      // this.users = [...this.users, this.userInput];
      const isExistingUser = this.users.includes(this.userInput);
      if(isExistingUser) {
        alert('Username already exists!');
      } else {
      this.users.push(this.userInput);
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
      alert(`Saving party with user: ${this.users}`);
    } else if (this.users.length === 2) {
      alert(`Saving party with users: ${this.users.join(' and ')}`);
    } else {
      const usersExceptLast = this.users.slice(0, -1).join(', ');
      const lastUser = this.users[this.users.length - 1];
      alert(`Saving party with users: ${usersExceptLast}, and ${lastUser}`);
    }
    this.makeItRain();  
  }
  
  

  render() {
    return html`
      <confetti-container id ='confetti'>
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
            <div >
                 ${this.users.map((user, index) => html`
                <div class="card-container">
                  <rpg-character></rpg-character>
                  <p>${user}</p>
                  <button @click="${() => this.removeUser(index)}">Remove User</button>
                </div>
              `)}
            </div>
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

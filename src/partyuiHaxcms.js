import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class partyuiHaxcms extends LitElement {
  
  static get tag() {
    return 'partyuiHaxcms';
  }
  constructor() {
    super();
    this.users = [];
    this.username = '';
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .partyui-wrapper {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        color: var(--ddd-theme-default-keystoneYellow);
      }
      .partyui-modal {
        background-color: darkblue;
        width: 50vw;
        pointer-events: all;
        box-sizing: border-box;
        padding: 20px;
      }
      
    `;
  }

 

  handleInputChange(e) {
    this.username = e.target.value;
  }

  addUser() {
    if (this.username.trim() !== '') {
      this.users = [...this.users, this.username];
      this.username = '';
    }
  }

  removeUser(index) {
    this.users.splice(index, 1);
    this.users = [...this.users];
  }

  saveParty() {
    // Add logic to save the party members
    console.log('Party saved:', this.users);
    // Optionally dispatch an event to notify parent components
    this.dispatchEvent(new CustomEvent('party-saved', { detail: this.users }));
  }

  render() {
    return html`
      <div class="partyui-wrapper">
        <div class="partyui-modal">
          <div>
            Add User:
            <input type="text" .value="${this.username}" @input="${this.handleInputChange}">
            <button @click="${this.addUser}">ADD!</button>
          </div>

          <div>
            Currently Added Users:
            ${this.users.map((user, index) => html`
              <div class="partyui-user-container">
                <rpg-character seed="${index}"></rpg-character>
                <div>${user}</div>
                <button @click="${() => this.removeUser(index)}">Remove User</button>
              </div>
            `)}
          </div>

          <button @click="${this.saveParty}">Save Party</button>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      users: { type: Array },
      username: { type: String }
    };
  }
}

customElements.define(partyui-Haxcms.tag, partyuiHaxcms);

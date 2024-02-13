import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
    this.imgsrc ="https://github.com/elmsln.png";
    this.description ="Hello world!";
    this.buttonText= "Click me";
    this.buttonLink ="https://hunterxhunter.fandom.com/wiki/List_of_Hunter_%C3%97_Hunter_Characters";
    this.fancy = false;

  }

  static get styles() {
    return css`
      .card {
  width: 300px; 
  border: 1px solid green;
  padding: 16px;
  margin: 16px;
  box-sizing: border-box;
  background-color: #F5F5DC; 
  height: 500px;
}
:host([fancy]) {
display: block;
  background-color: gold;
  border: 2px solid red;
  box-shadow: 10px 5px 5px orangered;
}

.card img {
  width: 80%; 
  height: 200px;
  text-align: center;
}

.card.new-background{
  background-color: lightgreen;
}


.card button {
  width: 100%;
}

@media (min-width: 500px) and (max-width: 800px) {
  .card button {
    display: flex;
  }
}

@media (max-width: 500px) {
  .card {
    transform: scale(0.8);
  }
  .card img {
    height: auto;
  }
}
    `;
  }


  openChanged(e){
    console.log(e.newState);
    if(e.newState === "open"){
      this.fancy = true;
    }
    else{
      this.fancy = false;
    }

  }

  render() {
    return html`
    
    
  <div class="card">
    <img class="card-image" src="${this.imgsrc}"> 
    <h2 class="card-title"> ${this.title} </h2>
 <!-- put this in your render method where you had details -->
 <details ?open="${this.fancy}" @toggle="${this.openChanged}">
  <summary>Description</summary>
  <div>
    <slot>${this.description}</slot>
  </div>
</details>
    <a href="${this.buttonLink}"> 
      <button class="card-button">${this.buttonText}</button>
    </a>
  </div>
    
  
 
    
    
    
      
    
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      imgsrc:{ type: String, reflect: true},
      description: {type: String},
      buttonText: {type: String},
      buttonLink: {type: String},
      fancy: { type: Boolean, reflect: true },

      /*link:  { type: String}, body-text, text, image link, button link, button text*/

    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);

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
    this.imgsrc ="";
    this.description ="";
    this.buttonText= "Click me";
    this.buttonLink ="https://hunterxhunter.fandom.com/wiki/List_of_Hunter_%C3%97_Hunter_Characters";

  }

  static get styles() {
    return css`
      .card {
  width: 300px; /* Smaller card size */
  border: 1px solid green;
  padding: 16px;
  margin: 16px;
  box-sizing: border-box;
  background-color: #F5F5DC; 
}

.card img {
  width: 80%; /* Larger image size */
  height: 200px;
  text-align: center;
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

.change-background {
  background-color: red; 
}
.duplicate {
  background-color: orange;
}
.delete {
  background-color: yellow;
}
.new-background{
  background-color:  #9bddff;
}
.change-image {
  background-color: cyan;
}
.card button:hover {
  background-color: blue;
}
.duplicate:hover::before{
  content:"🔁 ";
}
.change-background:hover::before{
  content: "🌈";
}
.delete:hover::before{
  content:"🗑️⚠️ ";
}
.change-title {
  background-color: magenta;
}

.change-title:hover::before{
  content:"✏️ ";
}
    `;
  }

  render() {
    return html`
    
    
  <div class="card">
    <img class="card-image" src="${this.imgsrc}"> 
    <h2 class="card-title"> ${this.title} </h2>
    <p> ${this.description}</p>
    <a href="${this.buttonLink}"> 
      <button class="card-button">${this.buttonText}</button>
    </a>
  </div>
    
  
 
    
    
    
    
    
    
    
    
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      imgsrc:{ type: String},
      description: {type: String},
      buttonText: {type: String},
      buttonLink: {type: String},

      /*link:  { type: String}, body-text, text, image link, button link, button text*/

    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);

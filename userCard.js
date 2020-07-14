// manually making the template

// const template = document.createElement('template')
// template.innerHTML = `
//  <style>
//      h3 {
//          color: coral
//      }
//  </style>
//
//   <div class="user-card">
//      <div>
//          <img src="" alt="">
//          <h3></h3>
//          <div class="info">
//              <p><slot name="email"></slot></p>
//              <p><slot name="phone"></slot></p>
//          </div>
//          <button>Hide info</button>
//      </div>
//  </div>
// `;

// making the template in the html
template = document.querySelector('template')

class UserCard extends HTMLElement {
    constructor() {
        super()

        this.showInfo = true;

        this.attachShadow({ 
            mode: 'open' 
        })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name')
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar')
    }

    connectedCallback() {
        this.shadowRoot.querySelector('button').addEventListener('click', () => this.toggleInfo())
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('button').removeEventListener('click')
    }

    toggleInfo() {
        this.showInfo = !this.showInfo
        const toggleBtn = this.shadowRoot.querySelector('button')
        const info = this.shadowRoot.querySelector('.info')

        if (this.showInfo) {
             info.style.display = 'block'
             toggleBtn.innerText = 'Hide info'
        } else {
            info.style.display = 'none'
            toggleBtn.innerText = 'Show info'
        }
    }
}

window.customElements.define('user-card', UserCard)
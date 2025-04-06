// components/book-preview.js

class BookPreview extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const image = this.getAttribute('image');
      const title = this.getAttribute('title');
      const author = this.getAttribute('author');
      const id = this.getAttribute('id');
  
      this.shadowRoot.innerHTML = `
        <style>
          /* Copied from the original styles.css file provided*/

            .preview {
                border-width: 0;
                width: 100%;
                font-family: Roboto, sans-serif;
                padding: 0.5rem 1rem;
                display: flex;
                align-items: center;
                cursor: pointer;
                text-align: left;
                border-radius: 8px;
                border: 1px solid rgba(var(--color-dark), 0.15);
                background: rgba(var(--color-light), 1);
            }

            @media (min-width: 60rem) {
            .preview {
                padding: 1rem;
            }
            }

            .preview_hidden {
                display: none;
            }

            .preview:hover {
                background: rgba(var(--color-blue), 0.05);
            }

            .preview__image {
                width: 48px;
                height: 70px;
                object-fit: cover;
                background: grey;
                border-radius: 2px;
                box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
            }

            .preview__info {
            padding: 1rem;
            }

            .preview__title {
                margin: 0 0 0.5rem;
                font-weight: bold;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;  
                overflow: hidden;
                color: rgba(var(--color-dark), 0.8)
            }

            .preview__author {
                color: rgba(var(--color-dark), 0.4);
            }

        </style>
        
        <button class="preview" data-preview="${id}">
          <img class="preview__image" src="${image}" alt="${title}">
          <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${author}</div>
          </div>
        </button>
      `;
    }
  }
  
  customElements.define('book-preview', BookPreview);
  
import { books, authors, BOOKS_PER_PAGE } from './data.js';
import Elements from './elements.js';

export default class Book {
    #page = 1;
    #matches = books;

    constructor() {
        this.booksPerPage = BOOKS_PER_PAGE;
        this.authors = authors;
    }

    get page() {
        return this.#page;
    }

    incrementPage() {
        this.#page += 1;
    }

    resetPage() {
        this.#page = 1;
    }

    get matches() {
        return this.#matches;
    }

    set matches(newMatches) {
        this.#matches = newMatches;
    }

    createBookElement({ author, id, image, title }, authors) {
        const element = document.createElement('button');
        element.classList.add('preview');
        element.setAttribute('data-preview', id);
        element.innerHTML = `
            <img class="preview__image" src="${image}" />
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;
        return element;
    }

    render() {
        const fragment = document.createDocumentFragment();
        books.slice(0, this.booksPerPage).forEach((book) => {
            fragment.appendChild(this.createBookElement(book, authors));
        });
        return fragment;
    }

    createDropdown(options, firstOptionText) {
        const dropdownHtml = document.createDocumentFragment();
        const firstElement = document.createElement('option');
        firstElement.value = 'any';
        firstElement.innerText = firstOptionText;
        dropdownHtml.appendChild(firstElement);

        Object.entries(options).forEach(([id, name]) => {
            const element = document.createElement('option');
            element.value = id;
            element.innerText = name;
            dropdownHtml.appendChild(element);
        });

        return dropdownHtml;
    }

    genreDropdown(genres) {
        return this.createDropdown(genres, 'All Genres');
    }

    authorDropdown(authors) {
        return this.createDropdown(authors, 'All Authors');
    }

    search(
        event,
        books,
        bookListItems,
        showListMessage,
        showListButton
    ) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const filters = Object.fromEntries(formData);
        const result = books.filter((singleBook) => {
            const genreMatch = filters.genre === 'any' || singleBook.genres.includes(filters.genre);
            const titleMatch = !filters.title.trim() || singleBook.title.toLowerCase().includes(filters.title.toLowerCase());
            const authorMatch = filters.author === 'any' || singleBook.author === filters.author;
            return genreMatch && titleMatch && authorMatch;
        });

        this.resetPage();
        this.matches = result;

        showListMessage.classList.toggle('list__message_show', result.length < 1);

        bookListItems.innerHTML = '';
        const newItems = document.createDocumentFragment();
        result.slice(0, this.booksPerPage).forEach((book) => {
            newItems.appendChild(this.createBookElement(book, authors));
        });

        bookListItems.appendChild(newItems);
        this.updateShowMoreButton(showListButton);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        Elements.searchOverlay.open = false;
    }

    updateShowMoreButton(showListButton) {
        const remainingBooks = this.matches.length - this.page * this.booksPerPage;
        showListButton.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
        `;
        showListButton.disabled = remainingBooks <= 0;
    }

    summaryCard(event) {
        const pathArray = Array.from(event.path || event.composedPath());
        let active = null;

        for (const node of pathArray) {
            if (node?.dataset?.preview) {
                active = books.find((book) => book.id === node.dataset.preview);
                if (active) break;
            }
        }

        if (active) 
        {
            const elements = new Elements(); //Will enhance later - It creates an instance everytime
            const elSummary = elements.elements; 

            elSummary.listActive.open = true;
            elSummary.bookListBlur.src = active.image;
            elSummary.bookListImage.src = active.image;
            elSummary.bookListTitle.innerText = active.title;
            elSummary.bookListSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
            elSummary.bookListDescription.innerText = active.description;
            
        }
    }

    ShowMore(showListButton, bookListItems) {
        const fragment = document.createDocumentFragment();
        this.matches
            .slice(this.page * this.booksPerPage, (this.page + 1) * this.booksPerPage)
            .forEach((book) => {
                fragment.appendChild(this.createBookElement(book, this.authors));
            });

        bookListItems.appendChild(fragment);
        this.incrementPage();
        this.updateShowMoreButton(showListButton);
    }
}

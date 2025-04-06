//import the book preview class for the web component
import './bookPreview.js'
export default class Book {
    #page = 1;
    #matches = [];

    constructor(books, authors,genres, BOOKS_PER_PAGE, Elements) {
        this.books = books;
        this.authors = authors;
        this.genres = genres;
        this.booksPerPage = BOOKS_PER_PAGE;

        this.elements = new Elements().elements; // Initialize elements from the passed Elements class
        this.init(); // Initialize the UI elements and render the first page
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

    init() {
        this.#matches = this.books;
        const bookFragment = this.render(); // Render books for the first page
        const createGenreDropdown = this.genreDropdown(this.genres); // Create the genre dropdown menu
        const createAuthorDropdown = this.authorDropdown(this.authors); // Create the author dropdown menu

        // Append the rendered book listings to the UI
        this.elements.bookListItems.appendChild(bookFragment);

        // Append the genre and author dropdown menus to the search form
        this.elements.searchGenresSelect.appendChild(createGenreDropdown);
        this.elements.searchAuthorsSelect.appendChild(createAuthorDropdown);

        // Update the "Show More" button with the correct remaining items based on the current page and total matches
        this.updateShowMoreButton();
    }
    //Book-Preview Component
    createBookElement({ author, id, image, title }, authors) {
        const bookPreview = document.createElement('book-preview');
        bookPreview.setAttribute('id', id);
        bookPreview.setAttribute('image', image);
        bookPreview.setAttribute('title', title);
        bookPreview.setAttribute('author', authors[author]);
        return bookPreview;
    }

    render() {
        const fragment = document.createDocumentFragment();
        this.books.slice(0, this.booksPerPage).forEach((book) => {
            fragment.appendChild(this.createBookElement(book, this.authors));
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

    search(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const filters = Object.fromEntries(formData);
        const result = this.books.filter((singleBook) => {
            const genreMatch = filters.genre === 'any' || singleBook.genres.includes(filters.genre);
            const titleMatch = !filters.title.trim() || singleBook.title.toLowerCase().includes(filters.title.toLowerCase());
            const authorMatch = filters.author === 'any' || singleBook.author === filters.author;
            return genreMatch && titleMatch && authorMatch;
        });

        this.resetPage();
        this.matches = result;

        this.elements.showListMessage.classList.toggle('list__message_show', result.length < 1);

        this.elements.bookListItems.innerHTML = '';
        const newItems = document.createDocumentFragment();
        result.slice(0, this.booksPerPage).forEach((book) => {
            newItems.appendChild(this.createBookElement(book, this.authors));
        });

        this.elements.bookListItems.appendChild(newItems);
        this.updateShowMoreButton();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.elements.searchOverlay.open = false;
    }

    updateShowMoreButton() {
        const remainingBooks = this.matches.length - this.page * this.booksPerPage;
        this.elements.showListButton.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
        `;
        this.elements.showListButton.disabled = remainingBooks <= 0;
    }

    summaryCard(event) {
        const pathArray = Array.from(event.path || event.composedPath());
        let active = null;

        for (const node of pathArray) {
            if (node?.dataset?.preview) {
                active = this.books.find((book) => book.id === node.dataset.preview);
                if (active) break;
            }
        }

        if (active) {
            this.elements.listActive.open = true;
            this.elements.bookListBlur.src = active.image;
            this.elements.bookListImage.src = active.image;
            this.elements.bookListTitle.innerText = active.title;
            this.elements.bookListSubtitle.innerText = `${this.authors[active.author]} (${new Date(active.published).getFullYear()})`;
            this.elements.bookListDescription.innerText = active.description;
        }
    }

    showMore() {
        const fragment = document.createDocumentFragment();
        this.matches
            .slice(this.page * this.booksPerPage, (this.page + 1) * this.booksPerPage)
            .forEach((book) => {
                fragment.appendChild(this.createBookElement(book, this.authors));
            });

        this.elements.bookListItems.appendChild(fragment);
        this.incrementPage();
        this.updateShowMoreButton();
    }
}

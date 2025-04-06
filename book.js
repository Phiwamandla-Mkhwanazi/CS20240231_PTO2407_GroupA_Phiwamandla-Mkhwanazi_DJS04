// Import the BookPreview Web Component
import "./bookPreview.js";

/**
 * Book class handles rendering book previews, managing search filters,
 * pagination, and dropdown generation in a modular way.
 */
export default class Book {
  #page = 1;
  #matches = [];

  /**
   * @param {Array} books - Array of book objects
   * @param {Object} authors - Object mapping author IDs to names
   * @param {Object} genres - Object mapping genre IDs to names
   * @param {number} BOOKS_PER_PAGE - Number of books to display per page
   * @param {Function} Elements - Class constructor that returns a DOM elements object
   */
  constructor(books, authors, genres, BOOKS_PER_PAGE, Elements) {
    this.books = books;
    this.authors = authors;
    this.genres = genres;
    this.booksPerPage = BOOKS_PER_PAGE;

    this.elements = new Elements().elements;
    this.init();
  }

  /** @returns {number} - Current page number */
  get page() {
    return this.#page;
  }

  /** Increments the current page number by 1 */
  incrementPage() {
    this.#page += 1;
  }

  /** Resets the current page number to 1 */
  resetPage() {
    this.#page = 1;
  }

  /** @returns {Array} - Filtered list of books */
  get matches() {
    return this.#matches;
  }

  /** @param {Array} newMatches - New filtered list of books */
  set matches(newMatches) {
    this.#matches = newMatches;
  }

  /**
   * Initializes the app: renders book previews and dropdown filters.
   */
  init() {
    this.#matches = this.books;

    const bookFragment = this.render();
    const createGenreDropdown = this.genreDropdown(this.genres);
    const createAuthorDropdown = this.authorDropdown(this.authors);

    this.elements.bookListItems.appendChild(bookFragment);
    this.elements.searchGenresSelect.appendChild(createGenreDropdown);
    this.elements.searchAuthorsSelect.appendChild(createAuthorDropdown);
    this.updateShowMoreButton();
  }

  /**
   * Creates a `book-preview` element.
   * @param {Object} book - A book object
   * @param {Object} authors - Mapping of author IDs to names
   * @returns {HTMLElement} - A `book-preview` element
   */
  createBookElement({ author, id, image, title }, authors) {
    const bookPreview = document.createElement("book-preview");
    bookPreview.setAttribute("id", id);
    bookPreview.setAttribute("image", image);
    bookPreview.setAttribute("title", title);
    bookPreview.setAttribute("author", authors[author]);
    return bookPreview;
  }

  /**
   * Renders a fragment containing the first page of books.
   * @returns {DocumentFragment}
   */
  render() {
    const fragment = document.createDocumentFragment();
    this.books.slice(0, this.booksPerPage).forEach((book) => {
      fragment.appendChild(this.createBookElement(book, this.authors));
    });
    return fragment;
  }

  /**
   * Creates a dropdown menu from a list of options.
   * @param {Object} options - Key-value pairs for dropdown options
   * @param {string} firstOptionText - The default top option text
   * @returns {DocumentFragment}
   */
  createDropdown(options, firstOptionText) {
    const dropdownHtml = document.createDocumentFragment();
    const firstElement = document.createElement("option");
    firstElement.value = "any";
    firstElement.innerText = firstOptionText;
    dropdownHtml.appendChild(firstElement);

    Object.entries(options).forEach(([id, name]) => {
      const element = document.createElement("option");
      element.value = id;
      element.innerText = name;
      dropdownHtml.appendChild(element);
    });

    return dropdownHtml;
  }

  /** @param {Object} genres - Genre options */
  genreDropdown(genres) {
    return this.createDropdown(genres, "All Genres");
  }

  /** @param {Object} authors - Author options */
  authorDropdown(authors) {
    return this.createDropdown(authors, "All Authors");
  }

  /**
   * Filters the books based on user input from the search form.
   * @param {Event} event - Form submit event
   */
  search(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);

    const result = this.books.filter((singleBook) => {
      const genreMatch =
        filters.genre === "any" || singleBook.genres.includes(filters.genre);
      const titleMatch =
        !filters.title.trim() ||
        singleBook.title.toLowerCase().includes(filters.title.toLowerCase());
      const authorMatch =
        filters.author === "any" || singleBook.author === filters.author;
      return genreMatch && titleMatch && authorMatch;
    });

    this.resetPage();
    this.matches = result;

    this.elements.showListMessage.classList.toggle(
      "list__message_show",
      result.length < 1,
    );
    this.elements.bookListItems.innerHTML = "";

    const newItems = document.createDocumentFragment();
    result.slice(0, this.booksPerPage).forEach((book) => {
      newItems.appendChild(this.createBookElement(book, this.authors));
    });

    this.elements.bookListItems.appendChild(newItems);
    this.updateShowMoreButton();

    window.scrollTo({ top: 0, behavior: "smooth" });
    this.elements.searchOverlay.open = false;
  }

  /**
   * Updates the "Show more" button state and label based on remaining books.
   */
  updateShowMoreButton() {
    const remainingBooks = this.matches.length - this.page * this.booksPerPage;
    this.elements.showListButton.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
        `;
    this.elements.showListButton.disabled = remainingBooks <= 0;
  }

  /**
   * Displays the summary modal of a selected book.
   * @param {Event} event - Click event on a book preview
   */
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

  /**
   * Appends the next page of books to the current list.
   */
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

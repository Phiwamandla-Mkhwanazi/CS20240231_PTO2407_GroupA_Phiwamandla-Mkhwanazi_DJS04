/**
 * Sets up and manages all event listeners for user interactions in the application.
 */
export default class EventListeners 
{
    /**
     * Constructs the EventListeners instance.
     * @param {Book} bookInstance - The instance of the Book class managing book logic.
     * @param {Array<Object>} booksData - Array of all book data.
     * @param {Class} Elements - The Elements class used to access DOM elements.
     * @param {ThemeManager} theme - The ThemeManager instance handling theme changes.
    */
    constructor(bookInstance, booksData, Elements, theme) 
    {
         /**
         * DOM elements extracted via the Elements class.
         * @type {Object}
         */
        this.elEvent = new Elements().elements;
        
         /**
         * Instance of the Book class for handling book-related operations.
         * @type {Book}
         */
        this.book = bookInstance;

        /**
         * Array of all books.
         * @type {Array<Object>}
         */
        this.books = booksData;

         /**
         * Instance of ThemeManager for applying UI themes.
         * @type {ThemeManager}
         */
        this.theme = theme;

        this.init(); 
    }

    /**
     * Initializes all relevant DOM event listeners for the UI.
    */
    init()
    {
        // Cancel search overlay
        this.elEvent.searchCancelButton.addEventListener('click', () => {
            this.elEvent.searchOverlay.open = false;
        });

         // Cancel settings overlay
        this.elEvent.settingsCancelButton.addEventListener('click', () => {
            this.elEvent.settingsOverlay.open = false;
        });

        // Open search overlay and focus input
        this.elEvent.headerSearchIcon.addEventListener('click', () => {
            this.elEvent.searchOverlay.open = true;
            this.elEvent.searchTitleInput.focus();
        });

        // Open settings overlay
        this.elEvent.headerSettingsIcon.addEventListener('click', () => {
            this.elEvent.settingsOverlay.open = true;
        });

         // Handle search form submission
        this.elEvent.searchForm.addEventListener('submit', (event) => {
            this.book.search(
                event,
                this.books,
                this.elEvent.bookListItems,
                this.elEvent.showListMessage,
                this.elEvent.showListButton
            );
        });

        // Display detailed book summary
        this.elEvent.bookListItems.addEventListener('click', (event) => {
            this.book.summaryCard(event);
        });

        // Show more books on click
        this.elEvent.showListButton.addEventListener('click', () => {
            this.book.showMore();
        });

        // Close active book preview
        this.elEvent.listCloseButton.addEventListener('click', () => {
            this.elEvent.listActive.open = false;
        });

        // Handle theme form submission
        this.elEvent.settingsForm.addEventListener('submit', (event) => {
            this.theme.handleThemeChange(event);
        });
    }
}

/**
 * Class representing and centralizing access to DOM elements used throughout the app.
 */
export default class Elements {
    /**
     * Initializes the Elements instance by querying and storing all relevant DOM elements.
     */
    constructor() {
        /**
         * Collection of DOM elements used in the application, categorized by their UI role.
         * @type {Object<string, HTMLElement>}
         */
        this.elements = {
            
            // Header elements
            /** @type {HTMLElement} */
            headerSearchIcon: document.querySelector('[data-header-search]'),
            /** @type {HTMLElement} */
            headerSettingsIcon: document.querySelector('[data-header-settings]'),

            // Search Card elements
            /** @type {HTMLElement} */
            searchOverlay: document.querySelector('[data-search-overlay]'),
            /** @type {HTMLFormElement} */
            searchForm: document.querySelector('[data-search-form]'),
            /** @type {HTMLButtonElement} */
            searchCancelButton: document.querySelector('[data-search-cancel]'),
            /** @type {HTMLInputElement} */
            searchTitleInput: document.querySelector('[data-search-title]'),
            /** @type {HTMLSelectElement} */
            searchGenresSelect: document.querySelector('[data-search-genres]'),
            /** @type {HTMLSelectElement} */
            searchAuthorsSelect: document.querySelector('[data-search-authors]'),

            // Theme Card elements
            /** @type {HTMLElement} */
            settingsOverlay: document.querySelector('[data-settings-overlay]'),
            /** @type {HTMLFormElement} */
            settingsForm: document.querySelector('[data-settings-form]'),
            /** @type {HTMLSelectElement} */
            settingsTheme: document.querySelector('[data-settings-theme]'),
            /** @type {HTMLButtonElement} */
            settingsCancelButton: document.querySelector('[data-settings-cancel]'),

            // Summary Card elements
            /** @type {HTMLElement} */
            bookListItems: document.querySelector('[data-list-items]'),
            /** @type {HTMLElement} */
            bookListBlur: document.querySelector('[data-list-blur]'),
            /** @type {HTMLImageElement} */
            bookListImage: document.querySelector('[data-list-image]'),
            /** @type {HTMLElement} */
            bookListTitle: document.querySelector('[data-list-title]'),
            /** @type {HTMLElement} */
            bookListSubtitle: document.querySelector('[data-list-subtitle]'),
            /** @type {HTMLElement} */
            bookListDescription: document.querySelector('[data-list-description]'),
            /** @type {HTMLButtonElement} */
            listCloseButton: document.querySelector('[data-list-close]'),
            /** @type {HTMLElement} */
            listActive: document.querySelector('[data-list-active]'),

            // Show More elements
            /** @type {HTMLButtonElement} */
            showListButton: document.querySelector('[data-list-button]'),
            /** @type {HTMLElement} */
            showListMessage: document.querySelector('[data-list-message]'),
        };
    }
}

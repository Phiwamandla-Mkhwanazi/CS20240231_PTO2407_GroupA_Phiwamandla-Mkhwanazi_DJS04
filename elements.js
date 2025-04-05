export default class Elements
{
    constructor() {
        // Destructuring the DOM elements inside the class constructor
        this.elements = {
            // Header elements
            headerSearchIcon: document.querySelector('[data-header-search]'),
            headerSettingsIcon: document.querySelector('[data-header-settings]'),

            // Search Card elements
            searchOverlay: document.querySelector('[data-search-overlay]'),
            searchForm: document.querySelector('[data-search-form]'),
            searchCancelButton: document.querySelector('[data-search-cancel]'),
            searchTitleInput: document.querySelector('[data-search-title]'),
            searchGenresSelect: document.querySelector('[data-search-genres]'),
            searchAuthorsSelect: document.querySelector('[data-search-authors]'),

            // Theme Card elements
            settingsOverlay: document.querySelector('[data-settings-overlay]'),
            settingsForm: document.querySelector('[data-settings-form]'),
            settingsTheme: document.querySelector('[data-settings-theme]'),
            settingsCancelButton: document.querySelector('[data-settings-cancel]'),

            // Summary Card elements
            bookListItems: document.querySelector('[data-list-items]'),
            bookListBlur: document.querySelector('[data-list-blur]'),
            bookListImage: document.querySelector('[data-list-image]'),
            bookListTitle: document.querySelector('[data-list-title]'),
            bookListSubtitle: document.querySelector('[data-list-subtitle]'),
            bookListDescription: document.querySelector('[data-list-description]'),
            listCloseButton: document.querySelector('[data-list-close]'),
            listActive: document.querySelector('[data-list-active]'),

            // Show More elements
            showListButton: document.querySelector('[data-list-button]'),
            showListMessage: document.querySelector('[data-list-message]'),
        };
    }
}
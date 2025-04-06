// Importing books, authors, genres, and the constant for books per page from the external data module
import { books, authors, genres} from './data.js';
import Elements from './elements.js';
import Book from './book.js';

//Encapsulation
const uiElements = new Elements();
// Destructuring the elements object to simplify access
const {
    headerSearchIcon,
    headerSettingsIcon,
    searchOverlay,
    searchForm,
    settingsTheme,
    searchCancelButton,
    searchTitleInput,
    searchGenresSelect,
    searchAuthorsSelect,
    settingsOverlay,
    settingsForm,
    settingsCancelButton,
    bookListItems,
    listCloseButton,
    listActive,
    showListButton,
    showListMessage,
} = uiElements.elements;

/*--------------------------------------------------Book Object-------------------------------------------- */
const book = new Book();


const bookFragment = book.render(authors); // Render books for the first page
const createGenreDropdown = book.genreDropdown(genres); // Create the genre dropdown menu
const createAuthorDropdown = book.authorDropdown(authors); // Create the author dropdown menu

// Append the rendered book listings to the UI
bookListItems.appendChild(bookFragment);

// Append the genre and author dropdown menus to the search form
searchGenresSelect.appendChild(createGenreDropdown);
searchAuthorsSelect.appendChild(createAuthorDropdown);

// Update the "Show More" button with the correct remaining items based on the current page and total matches
book.updateShowMoreButton(showListButton);


/*-----------------------------------------------Theme Object------------------------------------------------------------ */
/**
 * @namespace ThemeManager
 *
 * This module handles the theme management for the web application, including applying
 * light or dark themes based on user preference or system settings.
 */
const ThemeManager = {
    init() {
        if (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            settingsTheme.value = 'night';
            this.applyTheme('night');
        } else {
            settingsTheme.value = 'day';
            this.applyTheme('day');
        }
    },

    /**
     * Applies the specified theme by adjusting CSS custom properties (variables) for dark or light modes.
     *
     * @param {string} theme - The theme to apply. Can be either 'night' or 'day'.
     */
    applyTheme(theme) {
        if (theme === 'night') {
            document.documentElement.style.setProperty(
                '--color-dark',
                '255, 255, 255'
            );
            document.documentElement.style.setProperty(
                '--color-light',
                '10, 10, 20'
            );
        } else {
            document.documentElement.style.setProperty(
                '--color-dark',
                '10, 10, 20'
            );
            document.documentElement.style.setProperty(
                '--color-light',
                '255, 255, 255'
            );
        }
    },

    /**
     * Handles theme change when the user selects a new theme in the settings.
     * It updates the theme and closes the settings overlay.
     *
     * @param {Event} event - The submit event triggered when the user selects a new theme.
     * @listens submit
     */
    handleThemeChange(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { theme } = Object.fromEntries(formData);
        this.applyTheme(theme);
        settingsOverlay.open = false;
    },
};

/*-----------------------------------------------Event Listeners for UI (Cards) Interactions--------------------------------------------------------- */

searchCancelButton.addEventListener('click', () => {
    searchOverlay.open = false;
});
settingsCancelButton.addEventListener('click', () => {
    settingsOverlay.open = false;
});

headerSearchIcon.addEventListener('click', () => {
    searchOverlay.open = true;
    searchTitleInput.focus();
});
headerSettingsIcon.addEventListener('click', () => {
    settingsOverlay.open = true;
});

searchForm.addEventListener('submit', (event) => {
    book.search(
        event,
        books,
        bookListItems,
        showListMessage,
        showListButton
    );
});

bookListItems.addEventListener('click', (event) => {book.summaryCard(event)});

showListButton.addEventListener('click', () => {
    book.ShowMore(
        showListButton,
        bookListItems,
    );
});
listCloseButton.addEventListener('click', () => {
    listActive.open = false;
});

/*----------------------------------------------------Main Program Execution--------------------------------------------------------- */
/**
 * Initializes the page and book listings by rendering the initial set of books and setting up event listeners.
 * This also handles the initialization of the theme, dropdown menus for genres and authors,
 * and updates the "Show More" button functionality.
 */

// Initializes the theme based on user/system preference
ThemeManager.init();
// Sets up the event listener for the theme change form submission
settingsForm.addEventListener('submit', (event) =>
    ThemeManager.handleThemeChange(event)
);



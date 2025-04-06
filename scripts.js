/**
 * Entry point for the Book Connect application.
 * Initializes core components like Book logic, Theme manager, and Event listeners
 * after the DOM has fully loaded.
 */

// Importing books, authors, genres, and the constant for books per page from the external data module
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import Elements from './elements.js';
import Book from './book.js';
import EventListeners from './eventListeners.js';
import ThemeManager from './theme.js';

/**
 * Sets up the application once the DOM is fully loaded.
 * Instantiates the Book logic, ThemeManager for theme switching,
 * and registers all event listeners for user interaction.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the Book class with data and element references
    const book = new Book(books, authors, genres, BOOKS_PER_PAGE, Elements);

    // Initialize the ThemeManager for handling light/dark mode
    const theme = new ThemeManager(Elements);

    // Register all event listeners for UI interactions
    new EventListeners(book, books, Elements, theme);
});

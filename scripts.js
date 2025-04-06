// Importing books, authors, genres, and the constant for books per page from the external data module
import { books, authors, genres} from './data.js';
import Elements from './elements.js';
import Book from './book.js';
import EventListeners from './eventListeners.js';
import ThemeManager from './theme.js';

//Encapsulation
const uiElements = new Elements();
// Destructuring the elements object to simplify access
const 
{
    searchGenresSelect,
    searchAuthorsSelect,
    bookListItems,
    showListButton,
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

const theme = new ThemeManager(Elements);

new EventListeners(book, books,Elements, theme);




// Importing books, authors, genres, and the constant for books per page from the external data module
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import Elements from './elements.js';
import Book from './book.js';
import EventListeners from './eventListeners.js';
import ThemeManager from './theme.js';


/*--------------------------------------------------Book Object-------------------------------------------- */
document.addEventListener('DOMContentLoaded',  () =>{
        const book = new Book(books, authors, genres,BOOKS_PER_PAGE,Elements);

        const theme = new ThemeManager(Elements);
        
        new EventListeners(book, books,Elements, theme);
    })





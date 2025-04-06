export default class EventListeners 
{
    constructor(bookInstance, booksData, Elements, theme) 
    {
        this.elEvent = new Elements().elements;
        this.book = bookInstance;
        this.books = booksData;
        this.theme = theme;

        this.init(); 
    }
    init()
    {
        this.elEvent.searchCancelButton.addEventListener('click', () => {
            this.elEvent.searchOverlay.open = false;
        });

        this.elEvent.settingsCancelButton.addEventListener('click', () => {
            this.elEvent.settingsOverlay.open = false;
        });

        this.elEvent.headerSearchIcon.addEventListener('click', () => {
            this.elEvent.searchOverlay.open = true;
            this.elEvent.searchTitleInput.focus();
        });

        this.elEvent.headerSettingsIcon.addEventListener('click', () => {
            this.elEvent.settingsOverlay.open = true;
        });

        this.elEvent.searchForm.addEventListener('submit', (event) => {
            this.book.search(
                event,
                this.books,
                this.elEvent.bookListItems,
                this.elEvent.showListMessage,
                this.elEvent.showListButton
            );
        });

        this.elEvent.bookListItems.addEventListener('click', (event) => {
            this.book.summaryCard(event);
        });

        this.elEvent.showListButton.addEventListener('click', () => {
            this.book.showMore();
        });

        this.elEvent.listCloseButton.addEventListener('click', () => {
            this.elEvent.listActive.open = false;
        });

        this.elEvent.settingsForm.addEventListener('submit', (event) => {
            this.theme.handleThemeChange(event);
        });
    }
}

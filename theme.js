/**
 * Manages the application's theme (day/night) based on user preference
 * or system setting using CSS custom properties.
 */
export default class ThemeManager
{
    /**
     * Constructs a new ThemeManager instance.
     * @param {Class} Elements - The Elements class used to access DOM elements.
    */
    constructor(Elements)
    {   this.el = new Elements().elements;
        this.init();
    }

    /**
     * Initializes the theme based on the user's system preference.
     * Sets the default value in the settings theme dropdown and applies the theme.
    */
    init() 
    {
        if (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            this.el.settingsTheme.value = 'night';
            this.applyTheme('night');
        } else {
            this.el.settingsTheme.value = 'day';
            this.applyTheme('day');
        }
    };

    /**
     * Applies the specified theme by updating CSS variables.
     * @param {'day' | 'night'} theme - The selected theme to apply.
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
    };

    /**
     * Handles the theme change form submission.
     * Extracts theme from the form data and applies it.
     * @param {SubmitEvent} event - The form submission event.
     */
    handleThemeChange(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { theme } = Object.fromEntries(formData);
        this.applyTheme(theme);
        this.el.settingsOverlay.open = false;
    };
}
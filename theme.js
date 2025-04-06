export default class ThemeManager
{
    constructor(Elements)
    {   this.el = new Elements().elements;
        this.init();
    }
    
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

    handleThemeChange(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { theme } = Object.fromEntries(formData);
        this.applyTheme(theme);
        this.el.settingsOverlay.open = false;
    };
}
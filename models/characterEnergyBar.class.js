/**
 * Represents the character's energy bar.
 * Extends the StatusBar class and provides specific functionality
 * for displaying the character's energy with corresponding images.
 */
class characterEnergyBar extends StatusBar {
    percentage = 100;
    images = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/100.png'
    ];

    /**
     * Creates an instance of the characterEnergyBar class.
     * Loads the energy bar images, sets its initial
     * position on the screen, and initializes the energy percentage.
     */
    constructor() {
        super().loadImages(this.images);
        this.x = 30;
        this.y = 0;
        this.setPercentage(100);
    }
}
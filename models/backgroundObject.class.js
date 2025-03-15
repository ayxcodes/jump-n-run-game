/**
 * Represents a background object in the game.
 * It extends the MovableObject class.
 */
class backgroundObject extends MovableObject {
    width = 720;
    height = 500;

    /**
     * Creates an instance of BackgroundObject.
     * @param {string} imgPath - The path to the background image.
     * @param {number} x - The x-coordinate position of the background object.
     */
    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
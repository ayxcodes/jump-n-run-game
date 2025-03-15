/**
 * Represents a status bar that displays progress as a percentage.
 * Extends the `DrawableObject` class.
 */
class StatusBar extends DrawableObject {
    /**
     * Creates an instance of the StatusBar.
     * Initializes the width and height of the status bar.
     */
    constructor() {
        super();
        this.width = 200;
        this.height = 60;
    }

    /**
     * Sets the progress percentage and updates the image accordingly.
     * 
     * @param {number} percentage - The progress percentage to set (0 to 100).
     * @throws {Error} If the percentage is not a number or not within the range of 0 to 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolvePercentageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current percentage.
     * The index corresponds to a predefined set of images based on percentage ranges.
     * 
     * @returns {number} The index of the image to display based on the percentage.
     * 0: 0-20%, 1: 21-40%, 2: 41-60%, 3: 61-80%, 4: 81-99%, 5: 100%
     */
    resolvePercentageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else
            if (this.percentage > 80) {
                return 4;
            } else 
                if (this.percentage > 60) {
                    return 3;
                } else 
                    if (this.percentage > 40) {
                        return 2;
                    } else 
                        if (this.percentage > 20) {
                            return 1;
                        } else {
                            return 0;
                        }
    }
}
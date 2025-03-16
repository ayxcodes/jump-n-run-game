/**
 * Represents a drawable object that can be loaded, displayed, and animated.
 * This class provides methods for loading images, drawing the object on a canvas, and handling multiple images.
 */
class DrawableObject {
    img;
    x = 100;
    y = 280;
    width = 100;
    height = 150;
    imageCache = [];
    currentImage = 0;
    otherDirection = false;

    /**
     * Loads an image from the given path.
     * 
     * @param {string} path - The path to the image file.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of paths and caches them.
     * The images will be stored in the `imageCache` object with their paths as keys.
     * 
     * @param {string[]} arr - An array of image paths.
     * @returns {void}
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;  
        });
    }

    /**
     * Draws the object on a given canvas context.
     * If the object is an instance of `CoinCount` or `BottleCount`, it also draws the amount on the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw the object on.
     * @returns {void}
     */
    draw(ctx) {  
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        if (this instanceof CoinCount || this instanceof BottleCount) {
            ctx.font = "35px Markin"; 
            ctx.fillStyle = "white"; 
            ctx.fillText(this.amount, this.x + 60, this.y + 40);
        }
    }
}
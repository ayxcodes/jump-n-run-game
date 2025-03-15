/**
 * Represents a Coin object, which extends the CollectableObject class.
 * The Coin object loads an image and is positioned at the specified x and y coordinates.
 * It also defines an offset for its boundaries.
 */
class Coin extends CollectableObject {
    image = ['img/8_coin/coin_1.png'];

    /**
     * Creates an instance of the Coin class.
     * Loads the image and initializes the position and dimensions of the coin.
     */
    constructor(x, y) {
        super().loadImage(this.image);
        this.x = x;
        this.y = y;
        this.width = 120;
        this.height = 120;
    }

    /**
     * Defines the offset values for collision detection.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
    };
}
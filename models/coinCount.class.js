/**
 * Represents the coin count display in the game.
 * Extends DrawableObject to render a visual representation of the collected coins.
 */
class CoinCount extends DrawableObject {
    amount = 0;
    image = [
        'img/7_statusbars/2_icons/icon_coin.png'
    ];

    /**
     * Creates an instance of CoinCount.
     * Initializes position, dimensions, and loads the coin image.
     */
    constructor() {
        super();
        this.loadImage(this.image);
        this.x = 130;
        this.y = 55;
        this.width = 50;
        this.height = 50;
    }
}
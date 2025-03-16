/**
 * Represents the bottle count display in the game.
 * Extends DrawableObject to render a visual representation of the collected bottles.
 */
class BottleCount extends DrawableObject {
    amount = 0;
    image = [
        'img/7_statusbars/2_icons/icon_salsa_bottle.png'
    ];

    /**
     * Creates an instance of BottleCount.
     * Initializes position, dimensions, and loads the bottle image.
     */
    constructor() {
        super();
        this.loadImage(this.image);
        this.x = 20;
        this.y = 55;
        this.width = 60;
        this.height = 60;
    }
}
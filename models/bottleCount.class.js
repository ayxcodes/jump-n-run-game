class BottleCount extends DrawableObject {
    amount = 0;
    image = [
        'img/7_statusbars/2_icons/icon_salsa_bottle.png'
    ];

    constructor() {
        super();
        this.loadImage(this.image);
        this.x = 20;
        this.y = 55;
        this.width = 60;
        this.height = 60;
    }
}
class CoinCount extends DrawableObject {
    amount = 0;
    image = [
        'img/7_statusbars/2_icons/icon_coin.png'
    ];

    constructor() {
        super();
        this.loadImage(this.image);
        this.x = 130;
        this.y = 55;
        this.width = 50;
        this.height = 50;
    }
}
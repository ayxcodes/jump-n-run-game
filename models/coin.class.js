class Coin extends CollectableObject {
    image = ['img/8_coin/coin_1.png'];

    constructor(x, y) {
        super().loadImage(this.image);
        this.x = x;
        this.y = y;
        this.width = 120;
        this.height = 120;
    }
}
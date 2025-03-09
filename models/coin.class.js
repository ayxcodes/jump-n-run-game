class Coin extends CollectableObject {
    image = ['img/8_coin/coin_1.png'];

    constructor(x, y) {
        super().loadImage(this.image);
        this.x = 100;
        this.y = 100;
        this.width = 50;
        this.height = 50;
    }
}
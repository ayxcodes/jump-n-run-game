class CoinBar extends StatusBar {
    amount = 0;
    images = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.images);
        this.x = 30;
        this.y = 40;
        this.setAmount(0);
    }
}
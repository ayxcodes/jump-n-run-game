class BottleBar extends StatusBar {
    amount = 0;
    images = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.images);
        this.x = 30;
        this.y = 0;
        this.setAmount(0);
    }
}
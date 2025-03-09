class endbossEnergyBar extends StatusBar {
    percentage = 100;
    images = [
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/0.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/20.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/40.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/60.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/80.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/100.png'
    ];

    constructor() {
        super().loadImages(this.images);
        this.x = 480;
        this.y = 0;
        this.height = 72;
        this.width = 210; 
        this.setPercentage(100);
    }
} 
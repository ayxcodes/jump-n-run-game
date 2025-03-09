class Cloud extends MovableObject {
    speed;
    y = 0;
    height = 400;
    width = 700;
    images = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    constructor() {
        super();
        this.loadImage(this.getRandomImage());
        this.x = Math.random() * 10000;
        this.speed = 0.1 + Math.random() * 0.4;
        this.animate();
    }

    getRandomImage() {
        return this.images[Math.floor(Math.random() * this.images.length)];
    }

    animate() {
        setInterval(() => {
            this.x -= this.speed;
            if (this.x + this.width < 0) {
                this.x = 7000;
            }
        }, 1000 / 60);
    }
}
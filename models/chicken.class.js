class Chicken extends MovableObject {
    y = 330;
    height = 90;
    width = 90;
    imagesWalking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    imageDead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imageDead);

        this.x = 400 + Math.random() * 5000;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    offset = {
        top: 8,
        bottom: 8,
        left: 8,
        right: 8
    };

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000/60);

        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 100);
    }
}
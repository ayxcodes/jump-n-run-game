class SmallChicken extends MovableObject {
    y = 355;
    height = 70;
    width = 70;
    isDead = false;
    imagesWalking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    imageDead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
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
        top: 10,
        bottom: 10,
        left: 15,
        right: 10
    };

    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);
    
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.imagesWalking);
            }
        }, 100);
    }
}
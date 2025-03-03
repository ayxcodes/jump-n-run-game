class Character extends MovableObject {
    y = 130;
    height = 300;
    width = 150;
    speed = 10;
    world;
    imagesWalking = [
        'img/2_character_pepe/2_walk/W_21.png',
        'img/2_character_pepe/2_walk/W_22.png',
        'img/2_character_pepe/2_walk/W_23.png',
        'img/2_character_pepe/2_walk/W_24.png',
        'img/2_character_pepe/2_walk/W_25.png',
        'img/2_character_pepe/2_walk/W_26.png'
    ]

    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }

            this.world.camera_x = -this.x + 100;
        }, 1000/60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.imagesWalking);
            }
        }, 50);
    }

    jump() {}
}
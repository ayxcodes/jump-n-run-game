class Character extends MovableObject {
    y = 30;
    height = 300;
    width = 140;
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
    imagesJumping = [
        'img/2_character_pepe/3_jump/J_31.png',
        'img/2_character_pepe/3_jump/J_32.png',
        'img/2_character_pepe/3_jump/J_33.png',
        'img/2_character_pepe/3_jump/J_34.png',
        'img/2_character_pepe/3_jump/J_35.png',
        'img/2_character_pepe/3_jump/J_36.png',
        'img/2_character_pepe/3_jump/J_37.png',
        'img/2_character_pepe/3_jump/J_38.png',
        'img/2_character_pepe/3_jump/J_39.png'
    ]

    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000/60);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.imagesJumping);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.imagesWalking);
                }
            }
        }, 50);
    }
}
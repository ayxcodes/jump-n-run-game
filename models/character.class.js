class Character extends MovableObject {
    y = 30;
    height = 300;
    width = 140;
    speed = 10;
    world;
    imagesIdle = [
        'img/2_character_pepe/1_idle/idle/I_1.png',
        'img/2_character_pepe/1_idle/idle/I_6.png',
        'img/2_character_pepe/1_idle/idle/I_7.png',
        'img/2_character_pepe/1_idle/idle/I_8.png',
        'img/2_character_pepe/1_idle/idle/I_9.png',
        'img/2_character_pepe/1_idle/idle/I_10.png',
        'img/2_character_pepe/1_idle/long_idle/I_11.png',
        'img/2_character_pepe/1_idle/long_idle/I_12.png',
        'img/2_character_pepe/1_idle/long_idle/I_13.png',
        'img/2_character_pepe/1_idle/long_idle/I_14.png',
        'img/2_character_pepe/1_idle/long_idle/I_15.png',
        'img/2_character_pepe/1_idle/long_idle/I_16.png',
        'img/2_character_pepe/1_idle/long_idle/I_17.png',
        'img/2_character_pepe/1_idle/long_idle/I_18.png',
        'img/2_character_pepe/1_idle/long_idle/I_19.png',
        'img/2_character_pepe/1_idle/long_idle/I_20.png'
    ];
    imagesWalking = [
        'img/2_character_pepe/2_walk/W_21.png',
        'img/2_character_pepe/2_walk/W_22.png',
        'img/2_character_pepe/2_walk/W_23.png',
        'img/2_character_pepe/2_walk/W_24.png',
        'img/2_character_pepe/2_walk/W_25.png',
        'img/2_character_pepe/2_walk/W_26.png'
    ];
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
    ];
    imagesHurt = [
        'img/2_character_pepe/4_hurt/H_41.png',
        'img/2_character_pepe/4_hurt/H_42.png',
        'img/2_character_pepe/4_hurt/H_43.png',
    ];
    imagesDead = [
        'img/2_character_pepe/5_dead/D_51.png',
        'img/2_character_pepe/5_dead/D_52.png',
        'img/2_character_pepe/5_dead/D_53.png',
        'img/2_character_pepe/5_dead/D_54.png',
        'img/2_character_pepe/5_dead/D_55.png',
        'img/2_character_pepe/5_dead/D_56.png',
        'img/2_character_pepe/5_dead/D_57.png'
    ];

    constructor() {
        super().loadImage(this.imagesIdle[0]);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        
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
            if (this.isDead()) {
                this.playAnimation(this.imagesDead);
            } else 
                if (this.isHurt()) {
                    this.playAnimation(this.imagesHurt);
                } else 
                    if (this.isAboveGround()) {
                        this.playAnimation(this.imagesJumping);
                    } else
                        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                        this.playAnimation(this.imagesWalking);
                    }
        }, 50);
    }
}
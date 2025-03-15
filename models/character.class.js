class Character extends MovableObject {
    world;
    y = 30;
    speed = 10;
    width = 140;
    height = 300;
    imagesIdle = [
        'img/2_character_pepe/1_idle/idle/I_1.png',
        'img/2_character_pepe/1_idle/idle/I_6.png',
        'img/2_character_pepe/1_idle/idle/I_7.png',
        'img/2_character_pepe/1_idle/idle/I_8.png',
        'img/2_character_pepe/1_idle/idle/I_9.png',
        'img/2_character_pepe/1_idle/idle/I_10.png'
    ];
    imagesSleeping = [
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
        'img/2_character_pepe/3_jump/J_33.png',
        'img/2_character_pepe/3_jump/J_34.png'
    ];
    imagesFalling = [
        'img/2_character_pepe/3_jump/J_35.png',
        'img/2_character_pepe/3_jump/J_36.png',
        'img/2_character_pepe/3_jump/J_37.png',
        'img/2_character_pepe/3_jump/J_38.png',
        'img/2_character_pepe/3_jump/J_31.png'
    ];
    imagesHurt = [
        'img/2_character_pepe/4_hurt/H_41.png',
        'img/2_character_pepe/4_hurt/H_42.png',
        'img/2_character_pepe/4_hurt/H_43.png'
    ];
    imagesDead = [
        'img/2_character_pepe/5_dead/D_51.png',
        'img/2_character_pepe/5_dead/D_52.png',
        'img/2_character_pepe/5_dead/D_53.png',
        'img/2_character_pepe/5_dead/D_54.png',
        'img/2_character_pepe/5_dead/D_55.png',
        'img/2_character_pepe/5_dead/D_56.png'
    ];

    offset = {
        top: 120,
        bottom: 20,
        left: 30,
        right: 35
    };

    constructor() {
        super().loadImage(this.imagesIdle[0]);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesSleeping);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesFalling);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.characterMoving();
        }, 1000 / 60);
    
        setInterval(() => {
            this.playAnimationCharacter();
        }, 50);
    }

    characterMoving() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
            this.moveRight();
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.isJumping) {
            this.startJump();
        }
        this.world.camera_x = -this.x + 100;
    }

    playAnimationCharacter() {
        if (this.isDead()) {
            this.playDeadAnimation();
        } else if (this.isHurt()) {
            this.playAnimation(this.imagesHurt);
        } else if (this.isJumping || this.isAboveGround()) {
            this.playJumpAnimation();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.imagesWalking);
        }
        this.checkCollectables(this.world.level.coins);
        this.checkCollectables(this.world.level.bottles);
    }
    
    startJump() {
        if (this.isJumping) return;
        this.isJumping = true;
        this.currentImage = 0;
        
        let index = 0;
        let jumpInterval = setInterval(() => {
            this.img = this.imageCache[this.imagesJumping[index]];
            index++;
    
            if (index >= this.imagesJumping.length) {
                clearInterval(jumpInterval);
                this.jump();
            }
        }, 50);
    }
    
    playJumpAnimation() {
        if (this.speedY > 0) {
            this.img = this.imageCache[this.imagesJumping[1]];
        } else if (this.speedY < 0) {
            let fallingIndex = Math.min(Math.floor(Math.abs(this.speedY) / 10), this.imagesFalling.length - 1);
            this.img = this.imageCache[this.imagesFalling[fallingIndex]];
        }

        if (!this.isAboveGround()) {
            this.isJumping = false;
        }
    }

    playDeadAnimation() {
        let index = 0;
        let deadInterval = setInterval(() => {
            this.img = this.imageCache[this.imagesDead[index]];
            index++;
        
            if (index >= this.imagesDead.length) {
                clearInterval(deadInterval);
            }
        }, 150);
    }

    checkCollectables(objects) {
        objects.forEach((object) => {
            object.collect(this);
        });
    }

    collectItem(item) {
        if (item instanceof Coin) {
            this.world.coinCount.amount = this.world.coinCount.amount + 1;
        } else if (item instanceof Bottle) {
            this.world.bottleCount.amount = this.world.bottleCount.amount + 1;
        }
        item.removeFromCanvas();
    }
}
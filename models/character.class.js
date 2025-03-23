/**
 * Represents a character in the game, extending the MovableObject class.
 * The character can perform various actions like walking, jumping, falling, getting hurt, and dying.
 * Handles movement based on keyboard input and changes animations based on character states.
 */
class Character extends MovableObject {
    world;
    y = 30;
    speed = 10;
    width = 140;
    height = 300;
    lastMove = 0;
    jumpSound = new Audio("assets/audio/jump.mp3");
    walkingSound = new Audio("assets/audio/walking.mp3");
    collectCoinSound = new Audio("assets/audio/coin.mp3");
    gameLostSound = new Audio("assets/audio/game-lost.mp3");
    collectBottleSound = new Audio("assets/audio/bottle.mp3");
    imagesIdle = [
        'img/2_character_pepe/1_idle/idle/I_1.png',
        'img/2_character_pepe/1_idle/idle/I_2.png',
        'img/2_character_pepe/1_idle/idle/I_3.png',
        'img/2_character_pepe/1_idle/idle/I_4.png',
        'img/2_character_pepe/1_idle/idle/I_5.png',
        'img/2_character_pepe/1_idle/idle/I_6.png',
        'img/2_character_pepe/1_idle/idle/I_7.png',
        'img/2_character_pepe/1_idle/idle/I_8.png',
        'img/2_character_pepe/1_idle/idle/I_9.png',
        'img/2_character_pepe/1_idle/idle/I_10.png'
    ];
    imagesLongIdle = [
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
        'img/2_character_pepe/4_hurt/H_41.png',
        'img/2_character_pepe/4_hurt/H_42.png',
        'img/2_character_pepe/4_hurt/H_43.png'
    ];

    /**
     * Defines the offset values for collision detection.
     * 
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 120,
        bottom: 20,
        left: 30,
        right: 35
    };

    /**
     * Initializes a new character instance.
     */
    constructor() {
        super().loadImage(this.imagesIdle[0]);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesLongIdle);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesFalling);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        
        this.applyGravity();
        this.animate();
    }

    /**
     * Starts the character animation loop.
     * Runs two intervals: one for movement handling and another for animation updates.
     */
    animate() {
        setInterval(() => {
            this.characterMoving();
        }, 1000 / 60);
    
        setInterval(() => {
            this.playAnimationCharacter();
        }, 100);
    }

    /**
     * Handles character movement based on user input.
     * Moves the character left, right, or makes it jump.
     * Updates the camera position accordingly.
     */
    characterMoving() {
        if (this.isDead()) return;

        if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
            this.characterMoveRight();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.characterMoveLeft();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.isJumping) {
            this.characterJump();
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Moves the character to the right.
     * Updates movement direction, plays walking sound, and records last movement time.
     */
    characterMoveRight() {
        this.moveRight();
        this.playWalkingSound();
        this.otherDirection = false;
        this.lastMove = new Date().getTime();
    }

    /**
     * Moves the character to the left.
     * Updates movement direction, plays walking sound, and records last movement time.
     */
    characterMoveLeft() {
        this.moveLeft();
        this.playWalkingSound();
        this.otherDirection = true;
        this.lastMove = new Date().getTime();
    }

    /**
     * Initiates the character's jump action.
     * Starts the jumping process and plays the jump sound.
     */
    characterJump() {
        this.startJump();
        this.playJumpSound();
        this.lastMove = new Date().getTime();
    }

    /**
     * Plays the appropriate animation based on the character's current state.
     * Determines if the character is dead, hurt, jumping, walking, idle, or in a long idle state.
     */
    playAnimationCharacter() {
        if (this.isDead()) {
            this.characterDead();
        } else if (this.isHurt()) {
            this.playAnimation(this.imagesHurt);
        } else if (this.isJumping || this.isAboveGround()) {
            this.playJumpAnimation();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.imagesWalking);
        } else if (this.isIdle()) {
            this.playAnimation(this.imagesIdle);
        } else if (this.isLongIdle()) {
            this.playAnimation(this.imagesLongIdle);
        } else {
            this.loadImage(this.imagesIdle[0]);
        }
        this.collectableItems();
    }
    
    /**
     * Starts the jump sequence by switching through jump images.
     * Once the animation is complete, the actual jump action is executed.
     */
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
        }, 1000 / 60);
    }
    
    /**
     * Displays the jump animation based on the character's vertical speed.
     * Uses different images for ascending and falling states.
     */
    playJumpAnimation() {
        if (this.speedY > 0) {
            this.img = this.imageCache[this.imagesJumping[1]];
        } else if (this.speedY < 0) {
            let fallingIndex = Math.min(Math.floor(Math.abs(this.speedY) / 10), this.imagesFalling.length - 1);
            this.img = this.imageCache[this.imagesFalling[fallingIndex]];
        }
    }

    /**
     * Plays the death animation and triggers the game over sequence.
     * Calls the gameLost() function and plays a game over sound.
     */
    characterDead() {
        let index = 0;
        setInterval(() => {
            this.img = this.imageCache[this.imagesDead[index]];
            index++;
    
            if (index >= this.imagesDead.length) {
                gameLost();
                this.playGameLostSound();
            }
        }, 400);
    }

    /**
     * Checks for collectible items and triggers their collection if applicable.
     * 
     * @param {Array} objects - Array of collectible objects in the game world.
     */
    checkCollectables(objects) {
        objects.forEach((object) => {
            object.collect(this);
        });
    }

    /**
     * Collects all available collectible items in the current level.
     * This includes coins and bottles.
     */
    collectableItems() {
        this.checkCollectables(this.world.level.coins);
        this.checkCollectables(this.world.level.bottles);
    }

    /**
     * Collects an item, updates the inventory count, and plays the corresponding sound.
     * 
     * @param {Object} item - The item to be collected (Coin or Bottle).
     */
    collectItem(item) {
        if (item instanceof Coin) {
            this.world.coinCount.amount = this.world.coinCount.amount + 1;
            this.playCollectCoinSound();
        } else if (item instanceof Bottle) {
            this.world.bottleCount.amount = this.world.bottleCount.amount + 1;
            this.playCollectBottleSound();
        }
        item.removeFromCanvas();
    }
    
    /**
     * Checks if the character is in an idle state based on inactivity time.
     * 
     * @returns {boolean} True if the character has been idle for 10-12 seconds, false otherwise.
     */
   isIdle() {
       let timepassed = new Date().getTime() - this.lastMove;
       timepassed = timepassed / 1000;
       return timepassed > 10 && timepassed < 12;
   }

    /**
     * Checks if the character is in a long idle state based on inactivity time.
     * 
     * @returns {boolean} True if the character has been idle for more than 12 seconds, false otherwise.
     */
    isLongIdle() {
        let timepassed = new Date().getTime() - this.lastMove;
        timepassed = timepassed / 1000;
        return timepassed > 12 && timepassed < 3600;
    }

    /**
     * Determines if the character is above a given enemy.
     * The function checks vertical positioning and movement direction.
     *
     * @param {Object} enemy - The enemy object to check against.
     * @param {number} enemy.y - The vertical position of the enemy.
     * @param {number} enemy.height - The height of the enemy.
     * @returns {boolean} True if the character is above the enemy, false otherwise.
     */
    isAboveEnemy(enemy) {
        const verticalOverlap = this.y + this.height - enemy.y;
        return verticalOverlap > 0 && verticalOverlap < enemy.height && this.speedY < 0;
    }

    /**
     * Plays the walking sound if the character is on the ground.
     */
    playWalkingSound() {
        if (this.y == 130) {
            this.walkingSound.play();
        }
    }

    /**
     * Plays the jump sound effect.
     */
    playJumpSound() {
        this.jumpSound.play();
    }

    /**
     * Plays the sound effect when the game is lost.
     */
    playGameLostSound() {
        this.gameLostSound.play();
    }

    /**
     * Plays the sound effect when collecting a bottle.
     * Resets the sound to allow quick consecutive plays.
     */
    playCollectBottleSound() {
        this.collectBottleSound.currentTime = 0;
        this.collectBottleSound.play();
    }

    /**
     * Plays the sound effect when collecting a coin.
     * Resets the sound to allow quick consecutive plays.
     */
    playCollectCoinSound() {
        this.collectCoinSound.currentTime = 0;
        this.collectCoinSound.play();
    }
}
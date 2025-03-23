/**
 * Represents an Endboss character in the game, which extends the MovableObject class.
 * It defines specific behavior and animation for the Endboss character.
 */
class Endboss extends MovableObject {
    y = 80;
    height = 350;
    width = 350;
    alerted = false;
    isAngry = false;
    encountered = false;
    showEndbossEnergyBar = false;
    gameWonSound = new Audio("assets/audio/game-won.mp3");
    imagesWalking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    imagesAlert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    imagesAttack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    imagesHurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    imagesDead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates an instance of the Endboss and initializes its images and position.
     * The Endboss is placed at a predefined x position and begins walking animation.
     */
    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.x = 5500;
        this.animate();
    }

    /**
     * Defines the offset values for collision detection.
     * 
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 160,
        bottom: 120,
        left: 140,
        right: 120
    };

     /**
     * Starts the endboss animation loop and checks the distance to the character.
     * The movement and animation updates occur at different intervals.
     */
    animate() {
        setInterval(() => {
            this.moveEndboss();
            this.checkCharacterDistance();
            this.checkDamage();
        }, 1000/60);

        setInterval(() => {
            this.playAnimationEndboss();
        }, 500);
    }

    /**
     * Moves the endboss to the left if it is not dead.
     * Stops movement when the endboss is alerted or has encountered the player.
     */
    moveEndboss() {
        if (this.isDead()) {
            return;
        }
        if (!this.encountered || this.alerted) {
            this.moveLeft();
        }
    }

    /**
     * Plays the appropriate animation for the Endboss based on its current state.
     * Animations change depending on whether the boss is dead, hurt, alerted, angry, or walking.
     */
    playAnimationEndboss() {
        if (this.isDead()) {
            this.endbossDead();
        } else if (this.isHurt()) {
            this.playAnimation(this.imagesHurt);
        } else if (!this.alerted && this.encountered) {
            this.playAnimationAlert();
        } else if(this.isAngry) {
            this.playAnimation(this.imagesAttack); 
        } else {
            this.playAnimation(this.imagesWalking);
        }
    }

    /**
     * Triggers the alert animation for the endboss.
     * Sets the boss to an alerted state.
     */
    playAnimationAlert() {
        this.alerted = true;
        this.playAnimation(this.imagesAlert);
    }

    /**
     * Triggers the endboss death animation.
     * After a short delay, the game is marked as won, and the winning sound plays.
     */
    endbossDead() {
        this.playAnimation(this.imagesDead);
        setTimeout(() => {
            gameWon();
            this.playGameWonSound();
        }, 1000);
    }

    /**
     * Checks the distance between the endboss and the character.
     * If the character is within 450 pixels, the boss encounters the character,
     * and its energy bar becomes visible while its speed increases.
     */
    checkCharacterDistance() {
        this.character = world.character;
        this.distance = Math.abs(this.character.x - this.x);
        
        if (this.distance < 450 && !this.encountered) {
            this.encountered = true;
            this.showEndbossEnergyBar = true;
            this.speed = 0.8;
        }
    }

    /**
     * Checks if the endboss has taken damage and updates its behavior accordingly.
     * If its energy drops below 100, the boss becomes angry, increasing its speed
     * and altering the music speed and volume.
     */
    checkDamage() {
        if (this.energy < 100 && !this.isAngry) {
            this.isAngry = true;
            this.speed = 2;
            changeMusicSpeed(1.2);
            changeMusicVolume(0.1);
        }
    }

    /**
     * Plays the sound effect for winning the game.
     */
    playGameWonSound() {
        this.gameWonSound.play();
    }
}
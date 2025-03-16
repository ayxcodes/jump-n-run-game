/**
 * Represents an Endboss character in the game, which extends the MovableObject class.
 * It defines specific behavior and animation for the Endboss character.
 */
class Endboss extends MovableObject {
    y = 80;
    height = 350;
    width = 350;
    encountered = false;
    showEndbossEnergyBar = false;
    imagesWalking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
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
     * Starts the endboss animation loop
     * and checks the distance to the character.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
            this.checkCharacterDistance();
        }, 1000/60);

        setInterval(() => {
            this.playAnimationEndboss();
        }, 200);
    }

    /**
     * Plays the appropriate animation for the Endboss based on its current state.
     */
    playAnimationEndboss() {
        console.log("DÖÖÖÖÖNERGYYYY ", this.energy)
        if (this.isDead()) {
            this.endbossDead();
        } else if (this.isHurt()) {
            this.playAnimation(this.imagesHurt);
            
        } else if (this.encountered) {
            this.playAnimation(this.imagesAttack);
        } else {
            this.playAnimation(this.imagesWalking);
        }
    }

    /**
     * Triggers the end boss death animation.
     * After a short delay, the game has been won.
     */
    endbossDead() {
        this.playAnimation(this.imagesDead);
        setTimeout(() => {
            gameWon();
        }, 1000);
    }

    /**
     * Checks the distance between the endboss and the character.
     * If the endboss is close to the player (less than 300 units), it begins attacking and shows its energy bar.
     * If the endboss is far away, it moves at a slower speed and does not engage in the attack.
     */
    checkCharacterDistance() {
        this.character = world.character;
        this.distance = Math.abs(this.character.x - this.x);
        if (this.distance < 300) {
            this.encountered = true;
            this.showEndbossEnergyBar = true;
            this.speed = 0.5;
        } else if (this.distance > 300) {
            this.encountered = false;
            this.speed = 0.15;
        }
    }
}
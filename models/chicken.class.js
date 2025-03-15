/**
 * Represents a Chicken, which extends the  MovableObject class.
 * The Chicken moves left and plays a walking animation unless it's dead.
 */
class Chicken extends MovableObject {
    y = 335;
    height = 90;
    width = 90;
    isDead = false;
    imagesWalking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    imageDead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates an instance of the Chicken class.
     * Initializes the Chicken's position, speed, and images for walking and dead states.
     */
    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imageDead);

        this.x = 400 + Math.random() * 5000;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    /**
     * Animates the Chicken by moving it left and playing the walking animation.
     * The movement and animation are performed at different intervals.
     */
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
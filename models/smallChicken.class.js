/**
 * Represents a small chicken that can move and animate on the screen.
 * Extends the `MovableObject` class and provides functionality to move,
 * animate walking, and change state when dead.
 */
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

    /**
     * Creates an instance of the `SmallChicken` class.
     * Sets initial position, speed, and loads images for walking and dead states.
     * Calls `animate()` to begin the animation loops.
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
     * Starts two animation loops:
     * - Moves the chicken to the left every frame if it's not dead.
     * - Plays the walking animation every 100ms if the chicken is not dead.
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
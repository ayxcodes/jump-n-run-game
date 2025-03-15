/**
 * Represents a cloud in the game, which extends the MovableObject class.
 * The cloud object moves horizontally across the screen at a random speed and resets its position when off-screen.
 */
class Cloud extends MovableObject {
    speed;
    y = 0;
    height = 400;
    width = 700;
    images = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    /**
     * Creates an instance of the `Cloud` class.
     * Initializes the cloud's position, speed, and sets a random image for the cloud.
     * Starts the animation loop for movement.
     */
    constructor() {
        super();
        this.loadImage(this.getRandomImage());
        this.x = Math.random() * 10000;
        this.speed = 0.1 + Math.random() * 0.4;
        this.animate();
    }

    /**
     * Returns a random cloud image from the `images` array.
     * @returns {string} - The path to the random cloud image.
     */
    getRandomImage() {
        return this.images[Math.floor(Math.random() * this.images.length)];
    }

    /**
     * Animates the cloud by updating its horizontal position every frame.
     * When the cloud moves off-screen, it reappears at the right side of the screen.
     */
    animate() {
        setInterval(() => {
            this.x -= this.speed;
            if (this.x + this.width < 0) {
                this.x = 7000;
            }
        }, 1000 / 60);
    }
}
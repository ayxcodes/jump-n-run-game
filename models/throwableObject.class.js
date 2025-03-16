/**
 * Represents a throwable object in the game world, which extends the MovableObject class.
 * The object rotates while in the air, collides with enemies, and displays a splash animation upon impact.
 */
class ThrowableObject extends MovableObject {
    imagesRotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    imagesSplash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Creates an instance of a throwable object at the specified position.
     * Loads the initial rotation images, sets up collision detection, and starts the throwing animation.
     * 
     * @param {number} x - The x-coordinate where the object will be placed.
     * @param {number} y - The y-coordinate where the object will be placed.
     * @param {number} direction - The direction in which the object is thrown (1 for right, -1 for left).
     */
    constructor(x, y, direction) {
        super();
        this.loadImage(this.imagesRotation[0]);
        this.loadImages(this.imagesRotation);
        this.loadImages(this.imagesSplash);
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.height = 80;
        this.width = 80;
        this.world = world;
        this.throw();
    }

    /**
     * Defines the offset values for collision detection.
     * 
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 10,
        bottom: 10,
        left: 30,
        right: 30
    };

    /**
     * Starts the throwing motion for the object in the correct direction.
     * The object is affected by gravity and moves horizontally based on the character's direction.
     * 
     * @param {number} direction - The direction in which the object is thrown (1 for right, -1 for left).
     */
    throw() {
        this.speedY = 25;
        this.applyGravity();
        setInterval(() => {
            this.x += 10 * this.direction;
        }, 25);
    
        this.animateRotation();
    }
    
    /**
     * Animates the rotation of the object while it is in the air.
     * Continuously updates the object's image from the rotation image array.
     */
    animateRotation() {
        setInterval(() => {
            this.playAnimation(this.imagesRotation);
        }, 50);
    }

    /**
     * Plays the splash animation and stops the object's vertical movement.
     * Changes the image set to the splash images.
     */
    playSplashAnimation() {
        this.imagesRotation = this.imagesSplash;
        this.speedY = 0;
        this.animationSplash();
    }

    /**
     * Plays the splash animation and removes the object from the canvas after a brief delay.
     */
    animationSplash() {
        this.playAnimation(this.imagesSplash);
        setTimeout(() => {
            this.removeFromCanvas();
        }, 100);
        
    }
}
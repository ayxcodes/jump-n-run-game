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
     */
    constructor(x, y) {
        super();
        this.loadImage(this.imagesRotation[0]);
        this.loadImages(this.imagesRotation);
        this.loadImages(this.imagesSplash);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.world = world;
        this.throw();
    }

    /**
     * Defines the offset values for collision detection.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 10,
        bottom: 10,
        left: 30,
        right: 30
    };

    /**
     * Starts the throwing motion for the object.
     * The object is affected by gravity and moves horizontally.
     * It checks for collisions with enemies during the throw.
     */
    throw() {
        this.speedY = 25;
        this.applyGravity();
        let throwInterval = setInterval(() => {
            this.x += 10;
            this.checkCollisionBottle();
        }, 25);

        this.animateRotation();
    }

    /**
     * Checks for collisions with enemies in the game world.
     * If a collision is detected, it applies the appropriate effect, such as killing the enemy or starting the splash animation.
     */
    checkCollisionBottle() {
        this.world.level.enemies.forEach((enemy, index) => {
            if (this.isColliding(enemy, index) && !this.splashAnimationPlaying) {
                if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                    enemy.img = enemy.imageCache[enemy.imageDead[0]];
                    enemy.isDead = true;

                    setTimeout(() => {
                        this.world.level.enemies.splice(index, 1);
                    }, 200);
                }
                this.playSplashAnimation();
            }
        });

        if (this.y >= 330) {
            this.playSplashAnimation();
        }
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
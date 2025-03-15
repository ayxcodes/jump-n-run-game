/**
 * Represents a movable object that can be drawn on a canvas and interact with other objects.
 * Extends the `DrawableObject` class, providing functionality for movement, gravity, collision detection, and more.
 */
class MovableObject extends DrawableObject{
    speedY = 0;
    lastHit = 0;
    energy = 100;
    speed = 0.15;
    acceleration = 3;

    /**
     * Defines the offset values for collision detection.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Checks if the object is colliding with another movable object.
     * 
     * @param {MovableObject} mo - The other movable object to check for collision.
     * @returns {boolean} `true` if the object is colliding, `false` otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Applies gravity to the object, updating its vertical position and speed.
     * The object will fall and stop when it hits the ground.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
    
            if (!this.isAboveGround() && this.speedY <= 0) {
                this.y = 130;
                this.speedY = 0;
                this.isJumping = false;
            }
        }, 1000 / 25);
    }

    /**
     * Determines if the object is above the ground.
     * 
     * @returns {boolean} `true` if the object is above the ground, `false` otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * Moves the object to the left by the object's speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Moves the object to the right by the object's speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Plays the object's animation by cycling through an array of image paths.
     * 
     * @param {string[]} images - An array of image paths to use for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Makes the object jump by applying an initial upward speed.
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * Applies damage to the object by reducing its energy.
     * 
     * @param {number} damage - The amount of energy to reduce.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object was recently hit (within the last 1 second).
     * 
     * @returns {boolean} `true` if the object was hit recently, `false` otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Checks if the object is dead (energy is 0).
     * 
     * @returns {boolean} `true` if the object is dead, `false` otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Removes the object from the canvas by positioning it off-screen.
     */
    removeFromCanvas() {
        this.x = -1000;
        this.y = -1000;
    }
}
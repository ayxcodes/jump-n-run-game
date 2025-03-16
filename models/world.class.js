/**
 * Represents the game world, managing all game elements such as the character, enemies, collectibles, and the game state.
 * Handles the rendering, physics, and interactions of the game world.
 */
class World {
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    level = level1;
    throwableObjects = [];
    endboss = new Endboss();
    character = new Character();
    coinCount = new CoinCount();
    bottleCount = new BottleCount();
    endbossEnergyBar = new endbossEnergyBar();
    characterEnergyBar = new characterEnergyBar();

    /**
     * Creates an instance of the World.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element used for rendering the game world.
     */
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.generateCoins(); 
        this.draw();
        this.run();
    }

    /**
     * Sets the world for the character, linking it to the current game world.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Generates coins in a series of arcs across the game world.
     */
    generateCoins() {
        let totalWidth = 5000;
        let numArcs = 5;
        let arcWidth = 350;
        let spacing = (totalWidth - numArcs * arcWidth) / (numArcs + 1);
    
        for (let i = 0; i < numArcs; i++) {
            let startX = spacing + i * (arcWidth + spacing);
            let startY = 150;
            let width = arcWidth;
            let height = 100;
            let coins = generateCoinArc(startX, startY, width, height, 5);
            this.level.coins.push(...coins);
        }
    }

    /**
     * Starts the game loop, checking collisions and throwable objects at regular intervals.
     */
    run() {
        setInterval(() => {
            this.checkCollisions(this.character);
            this.checkThrowableObjects();
        }, 200);
    }

    /**
     * Checks for collisions between the given object (mo) and the enemies in the level.
     * If a collision occurs, determines whether the object is above the enemy and processes the collision accordingly.
     * If the object is above the enemy, the enemy is killed, and the object jumps.
     * If not, the object takes damage, and the energy bar is updated.
     *
     * @param {Object} mo - The object to check for collisions with enemies (e.g., player or character).
     */
    checkCollisions(mo) {
        this.level.enemies.forEach((enemy, index) => {
            if (!enemy.dead && mo.isColliding(enemy)) {
                if (mo.isAboveEnemy(enemy)) {
                    this.chickenDead(enemy, index);
                    mo.jump();
                } else {
                    mo.hit();
                    this.characterEnergyBar.setPercentage(mo.energy);
                }
            }
        });
    }

    /**
     * Checks for collisions between the given object (typically a bottle) and other game elements.
     * If a collision is detected, it handles enemy damage or plays a splash animation when hitting the ground.
     *
     * @param {Object} mo - The moving object (e.g., a thrown bottle) to check for collisions.
     */
    checkCollisionBottle(mo) {
        this.bottleColliding(mo);
        this.endbossHurt(mo);
        if (mo.y >= 330) {
            mo.playSplashAnimation();
        }
    }

    /**
     * Checks if a bottle is colliding with any enemy and triggers the splash animation.
     * If the bottle hits an enemy, the enemy is marked as dead.
     * 
     * @param {object} mo - The moving object (bottle) that may collide with enemies.
     */
    bottleColliding(mo) {
        this.level.enemies.forEach((enemy, index) => {
            if (mo.isColliding(enemy, index) && !mo.splashAnimationPlaying) {
                this.chickenDead(enemy, index);
                mo.playSplashAnimation();
            }
        });
    }

    /**
     * Marks a chicken as dead and removes it from the enemy list after a short delay.
     * 
     * @param {object} enemy - The enemy that was hit (Chicken or SmallChicken).
     * @param {number} index - The index of the enemy in the enemies array.
     */
    chickenDead(enemy, index) {
        if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            enemy.img = enemy.imageCache[enemy.imageDead[0]];
            enemy.isDead = true;

            setTimeout(() => {
                this.level.enemies.splice(index, 1);
            }, 200);
        }
    }

    /**
     * Handles collision with the Endboss, reducing its energy and updating the energy bar.
     * Triggers the splash animation if a hit is detected.
     * 
     * @param {object} mo - The moving object (bottle) that may collide with the Endboss.
     */
    endbossHurt(mo) {
        if (mo.isColliding(this.endboss) && !mo.splashAnimationPlaying) {
            this.endboss.hit();
            this.endbossEnergyBar.setPercentage(this.endboss.energy);
            mo.playSplashAnimation();
        }
    }

    /**
     * Checks if the player is attempting to throw a bottle and determines the direction of the throw.
     * If the character is facing right, the bottle is thrown to the right; if facing left, it is thrown to the left.
     */
    checkThrowableObjects() {
        if (this.keyboard.D && this.bottleCount.amount > 0) {
            let direction = this.character.otherDirection ? -1 : 1;
            let bottle = new ThrowableObject(this.character.x + (direction * 60), this.character.y + 120, direction);
            this.throwableObjects.push(bottle);
            this.bottleCount.amount--;
            setInterval(() => {
                this.checkCollisionBottle(bottle);
            }, 25);
        }
    }

    /**
     * Renders the game world to the canvas, redrawing all game objects.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addComponents();
        this.ctx.translate(-this.camera_x, 0);
        this.addFixedObjects();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * Adds various dynamic components (background objects, clouds, coins, etc.) to the map.
     */
    addComponents() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
    }

    /**
     * Adds fixed objects like UI elements (energy bars, coin count) to the map.
     */
    addFixedObjects() {
        this.addToMap(this.characterEnergyBar);
        this.addToMap(this.coinCount);
        this.addToMap(this.bottleCount);
        if (this.endboss.showEndbossEnergyBar) {
            this.addToMap(this.endbossEnergyBar);
        }
    }

    /**
     * Adds a list of objects to the game world map.
     * 
     * @param {Array} objects - The list of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a given object to the map, flipping its image if necessary.
     * 
     * @param {Object} mo - The object to be drawn to the map.
     */
    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally for objects facing the opposite direction.
     * 
     * @param {Object} mo - The object whose image needs to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the flipped image to its original orientation.
     * 
     * @param {Object} mo - The object whose image needs to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
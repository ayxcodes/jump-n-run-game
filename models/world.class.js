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
    canThrowBottle = true;
    endboss = new Endboss();
    character = new Character();
    coinCount = new CoinCount();
    bottleCount = new BottleCount();
    endbossEnergyBar = new endbossEnergyBar();
    characterEnergyBar = new characterEnergyBar();
    hurtSound = new Audio("assets/audio/ouch.mp3");
    stompSound = new Audio("assets/audio/stomp.mp3");
    endbossHit = new Audio("assets/audio/endboss-angry.mp3");
    shatteredGlassSound = new Audio("assets/audio/shattered-glass.mp3");

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

    /**
     * Starts the game loop, checking collisions and throwable objects at regular intervals.
     */
    run() {
        setInterval(() => {
            this.checkCollisions(this.character);
            this.checkThrowableObjects();
        }, 80);
    }

    /**
     * Checks for collisions between the given moving object and game entities.
     * @param {Object} mo - The moving object (e.g., the player character).
     */
    checkCollisions(mo) {
        this.checkCollisionChicken(mo);
        this.checkCollisionEndboss(mo);
    }

    /**
     * Checks if the moving object collides with any chickens in the level.
     * If the player is above the enemy, the enemy dies; otherwise, the player takes damage.
     * @param {Object} mo - The moving object (e.g., the player character).
     */
    checkCollisionChicken(mo) {
        this.level.enemies.forEach((enemy, index) => {
            if (!enemy.dead && mo.isColliding(enemy)) {
                if (mo.isAboveEnemy(enemy)) {
                    this.chickenDead(enemy, index);
                    mo.jump();
                } else {
                    this.characterHurt(mo);
                }
            }
        });
    }

    /**
     * Checks if the moving object collides with the Endboss.
     * If a collision occurs, the player takes damage.
     * @param {Object} mo - The moving object (e.g., the player character).
     */
    checkCollisionEndboss(mo) {
        if (mo.isColliding(this.endboss)) {
            this.characterHurt(mo);
        }
    }

    /**
     * Handles when the character takes damage.
     * Reduces the character's energy and plays a hurt sound.
     * @param {Object} mo - The moving object (e.g., the player character).
     */
    characterHurt(mo) {
        mo.hit();
        this.playHurtSound();
        this.characterEnergyBar.setPercentage(mo.energy);
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
        
        if (mo.y >= 330 && !mo.splashAnimationPlaying) { 
            this.bottleSplash(mo);
            return true;
        }
        return false;
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
                this.bottleSplash(mo);
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
            this.playStompSound();

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
            this.playEndbossHitSound();
            this.endbossEnergyBar.setPercentage(this.endboss.energy);
            this.bottleSplash(mo);
        }
    }
    
    /**
     * Checks if a throwable object (bottle) can be thrown.
     * If the conditions are met, it initiates the bottle-throwing process.
     */
    checkThrowableObjects() {
        if (this.keyboard.D && this.bottleCount.amount > 0 && this.canThrowBottle) {
            this.throwBottle();
        }
    }

    /**
     * Handles the process of throwing a bottle.
     * - Disables further throws temporarily.
     * - Creates a new bottle object.
     * - Adds the bottle to the game world.
     * - Starts collision monitoring.
     * - Initiates the throw cooldown.
     */
    throwBottle() {
        this.canThrowBottle = false; 
        let bottle = this.createThrowableObject();
        this.throwableObjects.push(bottle);
        this.bottleCount.amount--;
        this.monitorBottleCollision(bottle);
        this.startThrowCooldown();
    }

    /**
     * Creates and returns a new throwable object (bottle).
     * The direction of the throw is determined based on the character's orientation.
     * 
     * @returns {ThrowableObject} The newly created bottle object.
     */
    createThrowableObject() {
        let direction = this.character.otherDirection ? -1 : 1;
        return new ThrowableObject(this.character.x + (direction * 60), this.character.y + 120, direction);
    }


    /**
     * Monitors collisions for a thrown bottle.
     * This function repeatedly checks if the bottle collides with an enemy or the ground.
     * 
     * @param {ThrowableObject} bottle - The bottle object being monitored.
     */
    monitorBottleCollision(bottle) {
        let collisionInterval = setInterval(() => {
            if (this.checkCollisionBottle(bottle)) {
                clearInterval(collisionInterval);
            }
        }, 80);
    }

    /**
     * Starts a cooldown period to prevent immediate consecutive bottle throws.
     * After the cooldown period, throwing is re-enabled.
     */
    startThrowCooldown() {
        setTimeout(() => {
            this.canThrowBottle = true;
        }, 1500);
    }

    /**
     * Plays a splash animation for an object and a shattered glass sound.
     */
    bottleSplash(mo) {
        if (!mo.splashAnimationPlaying) {
            mo.splashAnimationPlaying = true;
            mo.playSplashAnimation();
            this.playShatteredGlassSound();
        }
    }

    /**
     * Plays sound effect for the character getting hurt.
     */
    playHurtSound() {
        this.hurtSound.play();
    }

    /**
     * Plays sound effect for the endboss getting hit.
     */
    playEndbossHitSound() {
        this.endbossHit.play();
    }

    /**
     * Plays sound effect for stomping en enemy.
     */
    playStompSound() {
        this.stompSound.play();
    }

    /**
     * Plays sound effect for a bottle splashing.
     */
    playShatteredGlassSound() {
        this.shatteredGlassSound.play();
    }
}
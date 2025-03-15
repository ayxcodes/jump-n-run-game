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
    characterEnergyBar = new characterEnergyBar();
    endbossEnergyBar = new endbossEnergyBar();


    /**
     * Creates an instance of the World.
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
            this.checkCollisions();
            this.checkThrowableObjects();
        }, 200);
    }

    /**
     * Checks if the character collides with any enemies, handling appropriate reactions such as enemy death or character damage.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy, index) && this.character.isAboveGround() && this.character.speedY <= 0) {
                if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                    enemy.img = enemy.imageCache[enemy.imageDead[0]];
                    enemy.isDead = true;

                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 200);

                    this.character.jump();
                }
            } else if (!enemy.dead && this.character.isColliding(enemy)) {
                this.character.hit();
                this.characterEnergyBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks if the player is attempting to throw a bottle and if there are any bottles available.
     */
    checkThrowableObjects() {
        if (this.keyboard.D) {
            if (this.bottleCount.amount > 0) {
                let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 120);
                this.throwableObjects.push(bottle);
                this.bottleCount.amount = this.bottleCount.amount - 1;
            }
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
        this.addObjectsToMap(this.throwableObjects);
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
     * @param {Array} objects - The list of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a given object to the map, flipping its image if necessary.
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
     * @param {Object} mo - The object whose image needs to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Ends the game and displays the Game Over screen.
     */
    gameOver() {
        clearInterval(this.run);
        showGameOver();
    }
}
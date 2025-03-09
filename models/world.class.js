class World {
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    character = new Character();
    level = level1;
    characterEnergyBar = new characterEnergyBar();
    endbossEnergyBar = new endbossEnergyBar();
    coinCount = new CoinCount();
    bottleCount = new BottleCount();
    throwableObjects = [];

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.generateCoins(); 
        this.draw();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    generateCoins() {
        let totalWidth = 5000;
        let numArcs = 5;
        let arcWidth = 350;
        let spacing = (totalWidth - numArcs * arcWidth) / (numArcs + 1);
    
        for (let i = 0; i < numArcs; i++) {
            let startX = spacing + i * (arcWidth + spacing);
            let startY = 200;
            let width = arcWidth;
            let height = 100;
            let coins = generateCoinArc(startX, startY, width, height, 5);
            this.level.coins.push(...coins);
        }
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.characterEnergyBar.setPercentage(this.character.energy)
            } ;
        });
    }

    checkThrowableObjects() {
        if (this.keyboard.D) {
            if (this.bottleCount.amount > 0) {
                let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 120);
                this.throwableObjects.push(bottle);
                this.bottleCount.amount = this.bottleCount.amount - 1;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.characterEnergyBar);
        this.ctx.translate(this.camera_x, 0)

        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.coinCount);
        this.ctx.translate(this.camera_x, 0)

        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.bottleCount);
        this.ctx.translate(this.camera_x, 0)

        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.endbossEnergyBar);
        this.ctx.translate(this.camera_x, 0)

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0)

        self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    update() {}

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
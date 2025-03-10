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

    throw() {
        this.speedY = 25;
        this.applyGravity();
        let throwInterval = setInterval(() => {
            this.x += 10;
            this.checkCollision();
        }, 25);

        this.animateRotation();
    }

    checkCollision() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.isColliding(enemy) && !this.splashAnimationPlaying) {
                this.playSplashAnimation();
            }
        });

        if (this.y >= 330) {
            this.playSplashAnimation();
        }
    }

    animateRotation() {
        setInterval(() => {
            this.playAnimation(this.imagesRotation);
        }, 50);
    }

    playSplashAnimation() {
        this.imagesRotation = this.imagesSplash;
        this.speedY = 0;
        this.animationSplash();
    }

    animationSplash() {
        this.playAnimation(this.imagesSplash);
        setTimeout(() => {
            this.removeFromCanvas();
        }, 100);
        
    }
}
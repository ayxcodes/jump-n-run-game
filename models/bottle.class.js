/**
 * Represents a Bottle object that can be collected in the game.
 * The bottle has different images for its initial state, rotation, and splash effect.
 * It extends the CollectableObject class.
 */
class Bottle extends CollectableObject {
    imageBottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
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
     * Creates a new Bottle instance and initializes its properties.
     */
    constructor() {
        super();

        let randomImage = this.imageBottle[Math.floor(Math.random() * this.imageBottle.length)];
        this.loadImage(randomImage);
        this.loadImages(this.imagesRotation);
        this.loadImages(this.imagesSplash);

        this.x = 200 + Math.random() * 5000;
        this.y = 325;
        this.width = 100;
        this.height = 100;
    }

    /**
     * Defines the offset values for collision detection.
     * 
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 20,
        bottom: 10,
        left: 45,
        right: 20
    };
}
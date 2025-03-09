class Level {
    coins;
    bottles;
    enemies;
    clouds;
    backgroundObjects;
    levelEnd_x = 5800;

    constructor(coins, bottles, enemies, clouds, backgroundObjects) {
        this.coins = coins;
        this.bottles = bottles;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
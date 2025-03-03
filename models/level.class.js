class Level {
    enemies;
    clouds;
    backgroundObjects;
    levelEnd_x = 2500;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
class Level {
    enemies;
    clouds;
    backgroundObjects;
    levelEnd_x = 5800;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
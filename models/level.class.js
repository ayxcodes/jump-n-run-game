/**
 * Represents a level in the game, containing various game objects and elements.
 */
class Level {
    coins;
    bottles;
    enemies;
    clouds;
    backgroundObjects;
    levelEnd_x = 5800;

    /**
     * Creates an instance of the Level class.
     * 
     * @param {Array} coins - The coins in the level.
     * @param {Array} bottles - The bottles in the level.
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     */
    constructor(coins, bottles, enemies, clouds, backgroundObjects) {
        this.coins = coins;
        this.bottles = bottles;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
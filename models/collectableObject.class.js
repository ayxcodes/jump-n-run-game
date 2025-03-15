/**
 * Represents a collectable object that can be collected by a character.
 * Inherits from the MovableObject class.
 */
class CollectableObject extends MovableObject {
    /**
     * Creates an instance of the CollectableObject.
     * Initializes the 'collected' property to false.
     */
    constructor() {
        super();
        this.collected = false;
    }

    /**
     * Attempts to collect the object by a given character.
     * The object can only be collected if the character is colliding with it 
     * and it hasn't been collected yet.
     * 
     * @param {Character} character - The character attempting to collect the object.
     * @returns {void}
     */
    collect(character) {
        if (this.isColliding(character) && !this.collected) {
            this.collected = true;
            character.collectItem(this);
        }
    }
}
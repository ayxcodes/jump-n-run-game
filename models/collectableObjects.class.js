class CollectableObject extends MovableObject {
    constructor() {
        super();
        this.collected = false;
    }

    collect(character) {
        if (this.isColliding(character) && !this.collected) {
            this.collected = true;
            character.collectItem(this);
        }
    }
}
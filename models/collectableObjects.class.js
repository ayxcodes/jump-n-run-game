class CollectableObject extends DrawableObject {
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

    removeFromCanvas() {
        this.x = -1000;
        this.y = -1000;
    }
}
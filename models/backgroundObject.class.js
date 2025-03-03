class backgroundObject extends MovableObject {
    width = 720;
    height = 500;


    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
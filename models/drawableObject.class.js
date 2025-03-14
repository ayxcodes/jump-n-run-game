class DrawableObject {
    img;
    x = 100;
    y = 280;
    width = 100;
    height = 150;
    imageCache = [];
    currentImage = 0;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {  
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        if (this instanceof CoinCount || this instanceof BottleCount) {
            ctx.font = "35px Markin"; 
            ctx.fillStyle = "white"; 
            ctx.fillText(this.amount, this.x + 60, this.y + 40);
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;  
        });
    }
}
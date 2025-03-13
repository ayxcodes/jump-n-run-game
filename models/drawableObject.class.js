class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    otherDirection = false;
    x = 100;
    y = 280;
    height = 150;
    width = 100;

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
    // drawFrame(ctx) {
    //    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof SmallChicken) {
    //        ctx.beginPath();
    //        ctx.lineWidth = '0';
    //        ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
    //        ctx.rect(this.x, this.y, this.width, this.height);
    //        ctx.stroke();

    //        ctx.beginPath();
    //        ctx.lineWidth = '0';
    //        ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
    //        ctx.rect(
    //            this.x + this.offset.left,
    //            this.y + this.offset.top,
    //            this.width - this.offset.left - this.offset.right,
    //            this.height - this.offset.top - this.offset.bottom
    //        );
    //        ctx.stroke();
    //    }
    //}

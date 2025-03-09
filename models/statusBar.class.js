class StatusBar extends DrawableObject {

    constructor() {
        super();
        this.width = 200;
        this.height = 60;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolvePercentageIndex()];
        this.img = this.imageCache[path];
    }

    resolvePercentageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else
            if (this.percentage > 80) {
                return 4;
            } else 
                if (this.percentage > 60) {
                    return 3;
                } else 
                    if (this.percentage > 40) {
                        return 2;
                    } else 
                        if (this.percentage > 20) {
                            return 1;
                        } else {
                            return 0;
                        }
    }
}
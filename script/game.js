let canvas;
let world;
let keyboard = new Keyboard();
const gameScreen = document.getElementById("gameScreen");
const playBtn = document.getElementById('playBtn');
const settings = document.getElementById('settings');

function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function generateCoinArc(startX, startY, width, height, numCoins) {
    let coins = [];
    for (let i = 0; i < numCoins; i++) {
        let progress = i / (numCoins - 1);
        let x = startX + progress * width;
        let y = startY + Math.pow(progress - 0.5, 2) * 4 * height;
        coins.push(new Coin(x, y));
    }
    return coins;
}

function toggleFullScreen() {
    const img = document.getElementById("fullScreen");

    if (!document.fullscreenElement) {
        requestFullScreen();
        fullscreenActiveStyles(img);
    } else {
        exitFullScreen();
        fullscreenInactiveStyles(img);
    }
}

function requestFullScreen() {
    if (gameScreen.requestFullscreen) {
        gameScreen.requestFullscreen();
    } else if (gameScreen.mozRequestFullScreen) {
        gameScreen.mozRequestFullScreen();
    } else if (gameScreen.webkitRequestFullscreen) {
        gameScreen.webkitRequestFullscreen();
    } else if (gameScreen.msRequestFullscreen) {
        gameScreen.msRequestFullscreen();
    }
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function fullscreenInactiveStyles(img) {
    img.classList.remove("active");
    img.classList.add("inactive");
    playBtn.style.fontSize = '24px';
    settings.width = '40px';
    settings.height = '40px';
}

function fullscreenActiveStyles(img) {
    img.classList.add("active");
    img.classList.remove("inactive");
    playBtn.style.fontSize = '40px';
    settings.width = '60px';
    settings.height = '60px';
}

function toggleMute() {

}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});
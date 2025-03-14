let canvas;
let world;
let keyboard = new Keyboard();
const gameScreen = document.getElementById("gameScreen");

function init() {
    showStartScreen();
    checkScreenWidth();
    resizeGameScreen();
}

function showStartScreen() {
    gameScreen.innerHTML = ``;
    gameScreen.innerHTML += getStartScreenTemplate();
}

function checkScreenWidth() {
    const screenWidth = window.innerWidth;
    const fullScreenImage = document.getElementById('fullScreen');

    if (screenWidth <= 720) {
        if (!fullScreenImage.classList.contains('dNone')) {
            fullScreenImage.classList.add('dNone');
        }
    } else if (fullScreenImage.classList.contains('dNone')) {
        fullScreenImage.classList.remove('dNone');
    }
}

function resizeGameScreen() {
    window.addEventListener('resize', checkScreenWidth);
}

function startGame() {
    showCanvas();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function showCanvas() {
    gameScreen.innerHTML = ``;
    gameScreen.innerHTML += getCanvasTemplate();
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
    const playBtn = document.getElementById("playBtn");
    const settings = document.getElementById("settings");

    img.src = "img/fullscreen-on.png";
    img.classList.remove("active");
    img.classList.add("inactive");
    settings.classList.remove("fullscreenSettings");
    settings.classList.add("settings");

    if (playBtn) {
        playBtn.classList.add("btn");
        playBtn.classList.remove("fullscreenBtn");
    }
}

function fullscreenActiveStyles(img) {
    const playBtn = document.getElementById("playBtn");
    const settings = document.getElementById("settings");
    
    img.src = "img/fullscreen-off.png";
    img.classList.add("active");
    img.classList.remove("inactive");
    settings.classList.add("fullscreenSettings");
    settings.classList.remove("settings");

    if (playBtn) {
        playBtn.classList.add("fullscreenBtn");
        playBtn.classList.remove("btn");
    }
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
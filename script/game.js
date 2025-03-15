let world;
let keyboard = new Keyboard();
let canvas = document.getElementById('canvas');
const gameScreen = document.getElementById("gameScreen");
const startScreen = document.getElementById("startScreen");
const playBtn = document.getElementById("playBtn");
const settings = document.getElementById("settings");
const overlay = document.getElementById("overlaySettings");

/**
 * Initializes the game by checking screen width and resizing the game screen.
 */
function init() {
    checkScreenWidth();
    resizeGameScreen();
}

/**
 * Checks if the screen width is below or above 720px and hides/shows full-screen image accordingly.
 */
function checkScreenWidth() {
    const screenWidth = window.innerWidth;
    const fullScreenImage = document.getElementById('fullScreen');

    if (screenWidth <= 720) {
        hideFullScreenImage(fullScreenImage);
    } else {
        showFullScreenImage(fullScreenImage);
    }
}

/**
 * Hides the full-screen image.
 * @param {HTMLElement} fullScreenImage - The full-screen image element.
 */
function hideFullScreenImage(fullScreenImage) {
    if (!fullScreenImage.classList.contains('dNone')) {
        fullScreenImage.classList.add('dNone');
    }
}

/**
 * Shows the full-screen image.
 * @param {HTMLElement} fullScreenImage - The full-screen image element.
 */
function showFullScreenImage(fullScreenImage) {
    if (fullScreenImage.classList.contains('dNone')) {
        fullScreenImage.classList.remove('dNone');
    }
}

/**
 * Resizes the game screen when the window is resized.
 */
function resizeGameScreen() {
    window.addEventListener('resize', checkScreenWidth);
}

/**
 * Starts the game by displaying the canvas and initializing the world.
 */
function startGame() {
    showCanvas();
    initLevel();
    initializeWorld();
}

/**
 * Initializes the world with the canvas and keyboard.
 */
function initializeWorld() {
    world = new World(canvas, keyboard);
}

/**
 * Displays the game canvas and hides the start screen elements.
 */
function showCanvas() {
    startScreen.classList.add("dNone");
    playBtn.classList.add("dNone");
    canvas.classList.remove("dNone");
}

/**
 * Toggles full-screen mode.
 */
function toggleFullScreen() {
    const img = document.getElementById("fullScreen");
    if (!document.fullscreenElement) {
        requestFullScreen();
        applyFullscreenStyles(img);
    } else {
        exitFullScreen();
        removeFullscreenStyles(img);
    }
}

/**
 * Requests full-screen mode for the game screen.
 */
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

/**
 * Exits full-screen mode.
 */
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

/**
 * Applies styles when fullscreen mode is activated.
 */
function applyFullscreenStyles(img) {
    img.src = "img/fullscreen-off.png";
    img.classList.add("active");
    settings.classList.add("fullscreenSettings");
    updateButtonStyles("fullscreenBtn", "btn");
}

/**
 * Removes styles when fullscreen mode is deactivated.
 */
function removeFullscreenStyles(img) {
    img.src = "img/fullscreen-on.png";
    img.classList.remove("active");
    settings.classList.remove("fullscreenSettings");
    updateButtonStyles("btn", "fullscreenBtn");
}

/**
 * Updates button styles based on fullscreen state.
 */
function updateButtonStyles(addClass, removeClass) {
    if (playBtn) {
        playBtn.classList.add(addClass);
        playBtn.classList.remove(removeClass);
    }
}

/**
 * Displays the settings menu overlay.
 */
function showSettings() {
    showOverlay(getSettingsTemplate());
}

/**
 * Displays the sound settings overlay.
 */
function showSound() {
    showOverlay(getSoundTemplate());
}

/**
 * Displays the controls settings overlay.
 */
function showControls() {
    showOverlay(getControlsTemplate());
}

/**
 * Displays the imprint settings overlay.
 */
function showImprint() {
    showOverlay(getImprintTemplate());
}

/**
 * Shows the overlay with the given content.
 */
function showOverlay(content) {
    overlay.classList.remove("dNone");
    overlay.innerHTML = content;
}

/**
 * Closes the settings menu overlay.
 */
function closeSettings() {
    overlay.classList.add("dNone");
}

function toggleSound() {

}

/**
 * Generates a coin arc in a parabolic path.
 * @param {number} startX - The starting X coordinate.
 * @param {number} startY - The starting Y coordinate.
 * @param {number} width - The width of the arc.
 * @param {number} height - The height of the arc.
 * @param {number} numCoins - The number of coins in the arc.
 * @returns {Coin[]} An array of coin objects positioned in an arc.
 */
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
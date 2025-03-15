let world;
let keyboard = new Keyboard();
let canvas = document.getElementById('canvas');
const gameScreen = document.getElementById("gameScreen");
const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const playBtn = document.getElementById("playBtn");
const settings = document.getElementById("settings");
const overlay = document.getElementById("overlaySettings");

/**
 * Starts the game by displaying the canvas and initializing the world.
 */
function startGame() {
    showCanvas();
    initLevel();
    initWorld();
}

/**
 * Initializes the world with the canvas and keyboard.
 */
function initWorld() {
    world = new World(canvas, keyboard);
}

/**
 * Displays the game canvas and hides the start screen elements.
 */
function showCanvas() {
    toggleScreen("canvas");
    playBtn.classList.add("dNone");
}

/**
 * Displays the start screen and shows the start screen elements.
 */
function showStart() {
    toggleScreen("startScreen");
    playBtn.classList.remove("dNone");
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
 * Handles the game lost scenario by clearing all active intervals 
 * and displaying the lost screen.
 */
function gameLost() {
    clearAllIntervals();
    showLostScreen();
}

/**
 * Handles the game won scenario by clearing all active intervals 
 * and displaying the winning screen.
 */
function gameWon() {
    clearAllIntervals();
    showWonScreen();
}

/**
 * Clears all active intervals to stop any running game logic.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Displays the lost screen by toggling the end screen 
 * and updating its content.
 */
function showLostScreen() {
    toggleScreen("endScreen");
    endScreen.innerHTML = ``;
    endScreen.innerHTML += getLostScreenTemplate();
}

/**
 * Displays the winning screen by toggling the end screen 
 * and updating its content.
 */
function showWonScreen() {
    toggleScreen("endScreen");
    endScreen.innerHTML = ``;
    endScreen.innerHTML += getWonScreenTemplate();
}

/**
 * Toggles the visibility of different game screens.
 * 
 * @param {string} screenId - The ID of the screen to be displayed.
 */
function toggleScreen(screenId) {
    const screens = ["startScreen", "endScreen", "canvas"];
    
    screens.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (id === screenId) {
                element.classList.remove("dNone");
            } else {
                element.classList.add("dNone");
            }
        }
    });
}

function toggleSounds() {

}

function toggleMusic() {

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
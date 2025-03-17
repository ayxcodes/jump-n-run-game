let world;
let allSounds = [];
let isMuted = false;
let keyboard = new Keyboard();
let canvas = document.getElementById('canvas');
const gameScreen = document.getElementById("gameScreen");
const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const playBtn = document.getElementById("playBtn");
const settings = document.getElementById("settings");
const overlay = document.getElementById("overlaySettings");

function toggleSoundImg() {
    const sounds = document.getElementById("sounds");

    toggleMute();
    sounds.src = soundManager.muted ? "img/sound-off.png" : "img/sound-on.png";
}

function toggleSoundBtn() {
    const sound = document.getElementById("sound");

    toggleMute();
    sound.innerText = soundManager.muted ? "Sound off" : "Sound on";
}

function toggleMute() {
    isMuted = !isMuted;
    allSounds.forEach(sound => {
        sound.volume = isMuted ? 0 : 0.1;
        isMuted ? sound.pause() : sound.play().catch(() => {});
    });
}

/**
 * Registriert einen Sound im `allSounds`-Array.
 * @param {HTMLAudioElement} audioElement - Der Sound, der registriert werden soll.
 */
function initSound(audioElement) {
    allSounds.push(audioElement);
}

/**
 * Registriert alle Sounds des Spiels.
 */
function initSounds() {
    if (!world) return;
    initSound(world.hurtSound);
    initSound(world.stompSound);
    initSound(world.shatteredGlassSound);
    initCharacterSounds();
}

/**
 * Initializes character sounds.
 */
function initCharacterSounds() {
    if (!world.character) return;

    ["walkingSound", "jumpSound", "collectCoinSound", "collectBottleSound"].forEach(sound => 
        initSound(world.character[sound])
    );
}

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
    toggleButton("sounds");
}

/**
 * Displays the start screen and shows the start screen elements.
 */
function showStart() {
    toggleScreen("startScreen");
    playBtn.classList.remove("dNone");
    toggleButton("settings");
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
    sounds.classList.add("fullscreenSounds");
    updateButtonStyles("fullscreenBtn", "btn");
}

/**
 * Removes styles when fullscreen mode is deactivated.
 */
function removeFullscreenStyles(img) {
    img.src = "img/fullscreen-on.png";
    img.classList.remove("active");
    settings.classList.remove("fullscreenSettings");
    sounds.classList.remove("fullscreenSounds");
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
 * and displaying the lost screen and playing the losing sound.
 */
function gameLost() {
    clearAllIntervals();
    showLostScreen();
    playLostSound();
}

/**
 * Plays the losing game sound.
 */
function playLostSound() {
    const gameLostSound = new Audio("assets/audio/game-lost.mp3");
    gameLostSound.play();
}

/**
 * Handles the game won scenario by clearing all active intervals 
 * and displaying the winning screen and playing the winning sound.
 */
function gameWon() {
    clearAllIntervals();
    showWonScreen();
    playWonSound();
}

/**
 * Plays the winning game sound.
 */
function playWonSound() {
    const gameWonSound = new Audio("assets/audio/game-won.mp3");
    gameWonSound.play();
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
    toggleButton("settings");
}

/**
 * Displays the winning screen by toggling the end screen 
 * and updating its content.
 */
function showWonScreen() {
    toggleScreen("endScreen");
    endScreen.innerHTML = ``;
    endScreen.innerHTML += getWonScreenTemplate();
    toggleButton("settings");
}

/**
 * Toggles the visibility of different game screens.
 * 
 * @param {string} screenId - The ID of the screen to be displayed.
 */
function toggleScreen(screenId) {
    const screens = ["startScreen", "endScreen", "canvas"];
    
    screens.forEach(id => {
        let element = document.getElementById(id);
        if (element) {
            if (id === screenId) {
                element.classList.remove("dNone");
            } else {
                element.classList.add("dNone");
            }
        }
    });
}

/**
 * Toggles the visibility of a button by showing the specified button and hiding others.
 *
 * @param {string} buttonId - The ID of the button to be displayed.
 */
function toggleButton(buttonId) {
    const buttons = ["settings", "sounds"];

    buttons.forEach(id => {
        let element = document.getElementById(id);
        if (element) {
            if (id === buttonId) {
                element.classList.remove("dNone");
            } else {
                element.classList.add("dNone");
            }
        }
    });
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
 * 
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
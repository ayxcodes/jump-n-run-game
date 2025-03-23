let world, backgroundMusic;
let allSounds = [], previouslyPlayingSounds = [];
let isMuted = false;
let keyboard = new Keyboard();
let canvas = document.getElementById('canvas');
const playBtn = document.getElementById("playBtn");
const settings = document.getElementById("settings");
const endScreen = document.getElementById("endScreen");
const gameScreen = document.getElementById("gameScreen");
const startScreen = document.getElementById("startScreen");
const overlay = document.getElementById("overlaySettings");

/**
 * Toggles sound by muting or unmuting all sounds and updating the UI.
 */
function toggleSound() {
    toggleMute();
    toggleSoundUI();
}

/**
 * Updates the sound icon in the UI based on the mute state.
 */
function toggleSoundUI() {
    const soundImg = document.getElementById("sounds");
    if (soundImg) {
        soundImg.src = isMuted ? "img/sound-off.png" : "img/sound-on.png";
    }
}

/**
 * Toggles the mute state and applies necessary changes to sound playback.
 */
function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        muteAllSounds();
        muteBackgroundMusic();
    } else {
        unmuteAllSounds();
    }
}

/**
 * Unmutes all sounds, including background music if available.
 */
function unmuteAllSounds() {
    unmuteSounds();
    if (backgroundMusic) {
        unmuteBackgroundMusic();
    }
}

/**
 * Mutes all currently playing sounds and stores them for later resumption.
 */
function muteAllSounds() {
    previouslyPlayingSounds = allSounds.filter(sound => !sound.paused);
    allSounds.forEach(sound => {
        muteSounds(sound);
    });
}

/**
 * Mutes a specific sound by setting it to muted and pausing it.
 * @param {HTMLAudioElement} sound - The sound element to mute.
 */
function muteSounds(sound) {
    sound.muted = true;
    sound.pause();
}

/**
 * Unmutes all sounds that were previously playing before being muted.
 */
function unmuteSounds() {
    allSounds.forEach(sound => sound.muted = false);
    previouslyPlayingSounds.forEach(sound => sound.play().catch(() => {}));
    previouslyPlayingSounds = [];
}

/**
 * Mutes and pauses the background music if available.
 */
function muteBackgroundMusic() {
    backgroundMusic.muted = true;
    backgroundMusic.pause();
}

/**
 * Unmutes and resumes playback of the background music.
 */
function unmuteBackgroundMusic() {
    backgroundMusic.muted = false;
    backgroundMusic.play().catch(() => {});
}

/**
 * Checks if sounds should be muted and applies the mute state accordingly.
 */
function checkMute() {
    if (isMuted) {
        allSounds.forEach(sound => {
            muteSounds(sound);
        });
        muteBackgroundMusic();
    }
}

/**
 * Changes the playback speed of the background music.
 * @param {number} speed - The playback speed (e.g., 1.0 for normal speed).
 */
function changeMusicSpeed(speed) {
    if (backgroundMusic) {
        backgroundMusic.playbackRate = speed;
    }
}

/**
 * Adjusts the volume of the background music.
 * @param {number} volume - The volume level (0.0 to 1.0).
 */
function changeMusicVolume(volume) {
    if (backgroundMusic) {
        backgroundMusic.volume = volume;
    }
}

/**
 * Initializes the background music with predefined settings.
 */
function initBackgroundMusic() {
    backgroundMusic = new Audio("assets/audio/background-music.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.05;
    backgroundMusic.playbackRate = 0.9;
    backgroundMusic.play().catch(() => {});
}

/**
 * Stops and resets the background music.
 */
function stopBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        backgroundMusic = null;
    }
}

/**
 * Initializes a given audio element with a default volume and adds it to the sound list.
 * @param {HTMLAudioElement} audioElement - The audio element to initialize.
 */
function initSound(audioElement) {
    audioElement.volume = 0.1;
    allSounds.push(audioElement);
}

/**
 * Initializes all game sounds if the world is defined.
 */
function initSounds() {
    if (!world) return;
    initWorldSounds();
    initCharacterSounds();
}

/**
 * Initializes sound effects related to the game world.
 */
function initWorldSounds() {
    initSound(world.hurtSound);
    initSound(world.stompSound);
    initSound(world.endbossHit);
    initSound(world.shatteredGlassSound);
    initSound(world.endboss.gameWonSound);
}

/**
 * Initializes sound effects related to the game character.
 */
function initCharacterSounds() {
    if (!world.character) return;

    ["walkingSound", "jumpSound", "collectCoinSound", "collectBottleSound", "gameLostSound"].forEach(sound => 
        initSound(world.character[sound])
    );
}

/**
 * Starts the game by setting up the environment, sounds, and background music.
 */
function startGame() {
    showCanvas();
    initLevel();
    initWorld();
    initSounds();
    initBackgroundMusic();
    checkMute();
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
    toggleButton("settings");
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
    stopBackgroundMusic();
}

/**
 * Handles the game won scenario by clearing all active intervals 
 * and displaying the winning screen and playing the winning sound.
 */
function gameWon() {
    clearAllIntervals();
    showWonScreen();
    stopBackgroundMusic();
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
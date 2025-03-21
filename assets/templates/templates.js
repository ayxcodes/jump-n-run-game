/**
 * Generates the HTML template for the settings menu.
 *
 * @returns {string} The HTML template as a string.
 */
function getSettingsTemplate() {
    return `
        <div id="settingsMenu" class="settingsMenu">
            <h2>Settings</h2>
            <div class="settingsLinks">
                <a onclick="showSound()">Sounds</a>
                <a onclick="showControls()">Controls</a>
                <a onclick="showImprint()">Imprint</a>
                <button class="settingsBtn" onclick="closeSettings()">X</button>
            </div>
        </div>
    `;
}

/**
 * Generates the HTML template for the sound section.
 *
 * @returns {string} The HTML template as a string.
 */
function getSoundTemplate() {
    return `
        <div id="settingsMenu" class="settingsMenu">
            <h2>Sounds</h2>
            <button id="sound" class="soundBtn" onclick="toggleSoundUI()"></button>
            <button class="settingsBtn" onclick="showSettings()">←</button>
        </div>
    `;
}

/**
 * Generates the HTML template for the controls section.
 *
 * @returns {string} The HTML template as a string.
 */
function getControlsTemplate() {
    return `
        <div id="settingsMenu" class="settingsMenu">
            <h2>Controls</h2>
            <p>◄/► = Walk</p>
            <p>SPACE = Jump</p>
            <p>D = Throw Bottle</p>
            <button class="settingsBtn" onclick="showSettings()">←</button>
        </div>
    `;
}

/**
 * Generates the HTML template for the imprint section.
 *
 * @returns {string} The HTML template as a string.
 */
function getImprintTemplate() {
    return `
        <div id="settingsMenu" class="settingsMenu">
            <h2>Imprint</h2>
            <p>Aylin Celikhan</p>
            <p>+49 171583280</p>
            <p>a.cel@gmail.com</p>
            <button class="settingsBtn" onclick="showSettings()">←</button>
        </div>
    `;
}

/**
 * Generates the HTML template for the game lost screen.
 *
 * @returns {string} The HTML template as a string.
 */
function getLostScreenTemplate() {
    return `
        <img class="endScreenLost" src="img/lost_endscreen.png" />
        <button id="back" class="back btn" onclick="showStart()">Back to start</button>
    `;
}

/**
 * Generates the HTML template for the game won screen.
 *
 * @returns {string} The HTML template as a string.
 */
function getWonScreenTemplate() {
    return `
        <img class="endScreenWon" src="img/won_endscreen.png" />
        <button id="back" class="back btn" onclick="showStart()">Back to start</button>
    `;
}
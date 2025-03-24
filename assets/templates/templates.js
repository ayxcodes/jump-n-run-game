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
                <a onclick="showControls()">Controls</a>
                <a onclick="showImprint()">Imprint</a>
            </div>
            <button class="settingsBtn" onclick="closeSettings()">x</button>
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
        <div id="settingsMenu" class="settingsControls">
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
        <div id="settingsMenu" class="settingsImprint">
            <h2>Imprint</h2>
            <p>Information according to § 5 DDG</p>
            <p>Aylin Celikhan<br>38118 Braunschweig<br></p>
            <p><strong>Contact:</strong><br>a.celikhan@outlook.de</br></p>
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
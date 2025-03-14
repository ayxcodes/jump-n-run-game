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
                <a onclick="closeSettings()">Close</a>
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
            <h2>Sound</h2>
            <button id="sounds" class="soundBtn" onclick="toggleSound()">Sound off</button>
            <a onclick="showSettings()">Back</a>
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
            <p>▲ = Jump</p>
            <p>SPACE = Throw Bottle</p>
            <a onclick="showSettings()">Back</a>
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
            <p>DA 2025</p>
            <p>Aylin C.</p>
            <a onclick="showSettings()">Back</a>
        </div>
    `;
}
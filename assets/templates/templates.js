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

function getSoundTemplate() {
    return `
        <div id="settingsMenu" class="settingsMenu">
            <h2>Sound</h2>
            <button id="sounds" class="soundBtn" onclick="toggleSound()">Sound off</button>
            <a onclick="showSettings()">Back</a>
        </div>
    `;
}

function getControlsTemplate() {
    return `
        <div id="settingsMenu" class="settingsMenu">
            <h2>Controls</h2>
            <p>Arrows Left/right = Walk</p>
            <p>Space = Jump</p>
            <p>D = Throw Bottle</p>
            <a onclick="showSettings()">Back</a>
        </div>
    `;
}

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
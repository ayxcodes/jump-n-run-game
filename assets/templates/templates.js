function getCanvasTemplate() {
    return `
        <div class="activeGame">
            <img id="settings" class="settings" src="img/settings.png" onclick="showSettings()" />
            <img id="fullScreen" class="fullScreen inactive" src="img/fullscreen-on.png" onclick="toggleFullScreen()" />
            <div id="overlaySettings" class="overlay dNone"></div>
            <canvas id="canvas" width="720px" height="480px"></canvas>
        </div>
    `;
}

function getSettingsTemplate() {
    return `
        <div id="settingsMenu" class="settingsMenu">
            <h2>Settings</h2>
            <div class="settingsLinks">
                <a onclick="showSound()">Sounds</a>
                <a onclick="showControls()">Controls</a>
                <a onclick="showImpressum()">Impressum</a>
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
            <p>Aylin Celikhan</p>
            <p>a.celikhan@outlook.de</p>
            <a onclick="showSettings()">Back</a>
        </div>
    `;
}
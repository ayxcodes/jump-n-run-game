function getStartScreenTemplate() {
    return `
    <div id="startScreen" class="startScreen">
        <button id="playBtn" class="btn" onclick="startGame()">Play</button>
        <img id="settings" class="settings" src="img/settings.png" onclick="openSettings()" />
        <img id="fullScreen" class="fullScreen inactive" src="img/fullscreen.png" onclick="toggleFullScreen()" />
    </div>
    `;
}

function getCanvasTemplate() {
    return `
        <div>
            <div id="headerScreen" class="headerScreen">
                <img id="settings" class="settings" src="img/settings.png" onclick="openSettings()" />
            </div>
            <img id="fullScreen" class="fullScreen inactive" src="img/fullscreen.png" onclick="toggleFullScreen()" />
        </div>
        <canvas id="canvas" width="720px" height="480px">
        </canvas>
    `;
}

function getSettingsTemplate() {

}

function getControlsTemplate() {
    return `
        <div id="controls">
            <h3>Arrows Left/right = Walk</h3>
            <h3>Space = Jump</h3>
            <h3>D = Throw Bottle</h3>
        </div>
    `;
}
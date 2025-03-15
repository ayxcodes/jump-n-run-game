/**
 * Class representing a keyboard input handler for both physical keyboards and touch devices.
 * It listens for key and touch events to update movement states for the game.
 */
class Keyboard {
    RIGHT = false;
    LEFT = false;
    SPACE = false;
    D = false;

    /**
     * Initializes the keyboard event listeners.
     */
    constructor() {
        this.bindKeyPressEvents();
        this.bindBtsPressEvents();
    }

    /**
     * Binds event listeners for keyboard key presses.
     * Listens for 'keydown' and 'keyup' events to update movement states.
     */
    bindKeyPressEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 39) {
                keyboard.RIGHT = true;
            }
            if (e.keyCode == 37) {
                keyboard.LEFT = true;
            }
            if (e.keyCode == 32) {
                keyboard.SPACE = true;
            }
            if (e.keyCode == 68) {
                keyboard.D = true;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (e.keyCode == 39) {
                keyboard.RIGHT = false;
            }
            if (e.keyCode == 37) {
                keyboard.LEFT = false;
            }
            if (e.keyCode == 32) {
                keyboard.SPACE = false;
            }
            if (e.keyCode == 68) {
                keyboard.D = false;
            }
        });
    }

    /**
     * Binds event listeners for button presses on touch devices.
     * Listens for 'touchstart' and 'touchend' events to update movement states.
     */
    bindBtsPressEvents() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        });
        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });
    }
}
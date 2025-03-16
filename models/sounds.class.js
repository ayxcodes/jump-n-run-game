class Sounds {
    constructor() {
        this.sounds = {
            walkingSound: new Audio("assets/audio/walking.mp3"),
            stompSound: new Audio("assets/audio/stomp.mp3"),
            shatteredGlassSound: new Audio("assets/audio/shattered-glass.mp3"),
            hurtSound: new Audio("assets/audio/ouch.mp3"),
            jumpSound: new Audio("assets/audio/jump.mp3"),
            wonSound: new Audio("assets/audio/game-won.mp3"),
            lostSound: new Audio("assets/audio/game-lost.mp3"),
        };

        this.muted = false;
    }
  
    /**
     * Plays the specified sound if it exists and is not muted.
     * @param {string} sound - The name of the sound to play.
     */
    play(sound) {
      if (this.sounds[sound] && !this.muted) {
        this.sounds[sound].currentTime = 0; // Restart sound if already playing
        this.sounds[sound].play();
      }
    }
  
    /**
     * Stops the specified sound if it exists.
     * @param {string} sound - The name of the sound to stop.
     */
    stop(sound) {
      if (this.sounds[sound]) {
        this.sounds[sound].pause();
        this.sounds[sound].currentTime = 0;
      }
    }
  
    /**
     * Mutes all sounds in the game.
     */
    mute() {
      this.muted = true;
      for (let key in this.sounds) {
        this.sounds[key].volume = 0;
      }
    }
  
    /**
     * Unmutes all sounds in the game.
     */
    unmute() {
      this.muted = false;
      for (let key in this.sounds) {
        this.sounds[key].volume = 1;
      }
    }
  
    /**
     * Toggles the mute state between muted and unmuted.
     */
    toggleMute() {
      if (this.muted) {
        this.unmute();
      } else {
        this.mute();
      }
    }
  }
  
  /**
   * Global instance of the SoundManager.
   */
  const soundManager = new SoundManager();
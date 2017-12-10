/**
 * Snapshot of the game timing state expressed in values that can be used by 
 * variable-step (real time) or fixed-step (game time) games.
 *
 * @module GameTime
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
/**
 * My namespace for game time.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.GameFolder
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.GameFolder = JSWooF.Framework.GameFolder || {};

/**
 * Snapshot of the game timing state.
 * @class
 * @classdesc Snapshot of the game timing state.
 */
export default JSWooF.Framework.GameFolder.GameTime = class {
    /**
     * Creates a new instance of GameTime.
     * @constructs GameTime
     */
    constructor() {
        this.timeSpan = 0;
        this.elapsedGameTime = {};
        this.elapsedGameTime.totalMilliseconds = 0;
        this.elapsedGameTime.totalSeconds = 0;
        
        this.isRunningSlowly = false;
    }
    
    /**
     * The amount of elapsed game time since the last update.
     * @returns {number} Amount of game time passed.
     */
    get ElapsedGameTime() {
        return this.elapsedGameTime;
    }
    
    /**
     * The amount of elapsed game time since the last update.
     * @param {DOMHighResTimeStamp} gameTime - Reference to a GameTime object. 
     */
    setElapsedGameTime(timeStamp = 0) {
        this.elapsedGameTime.totalMilliseconds = timeStamp - this.timeSpan;
        this.elapsedGameTime.totalSeconds = this.elapsedGameTime.totalMilliseconds / 1000;
        this.timeSpan = timeStamp;
    }
    
    /**
     * Gets a value indicating that the game loop is taking longer than its 
     * TargetElapsedTime. In this case, the game loop can be considered to be 
     * running too slowly and should do something to "catch up."
     * @returns {Boolean} True if the game loop is taking too long; false otherwise.
     */
    get IsRunningSlowly() {
        return this.isRunningSlowly;
    }
    
    /**
     * Sets a value indicating that the game loop is taking longer than its 
     * TargetElapsedTime. In this case, the game loop can be considered to be 
     * running too slowly and should do something to "catch up."
     * @param {Boolean} value - True if the game loop is taking too long; false otherwise.
     */
    set IsRunningSlowly(value) {
        this.isRunningSlowly = value;
    }
};
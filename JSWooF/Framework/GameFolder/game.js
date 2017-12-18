/**
 * Provides basic graphics device initialization, game logic, and rendering 
 * code.
 *
 * @module Game
 * @author Sébastien Bolduc
 * @version 0.0
 */

import ContentManager from "/JSWooF/Framework/GameFolder/Content/contentManager.js";
import GameTime from "/JSWooF/Framework/GameFolder/gameTime.js";
 
/**
 * My namespace for game logic.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.GameFolder
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.GameFolder = JSWooF.Framework.GameFolder || {};

/**
 * Initializes a new instance of this class, which provides basic graphics 
 * device initialization, game logic, rendering code, and a game loop.
 * @class
 * @classdesc This is the point of entry of the game which provide a game loop.
 */
export default JSWooF.Framework.GameFolder.Game = class {
    /**
     * We intitialize our game loop.
     * @constructs Game
     */
    constructor() {
        this._content = undefined;
        this.Content = new ContentManager();
        this.Content.RootDirectory = "/Content";
        
        this._graphicsDevice;
        
        this._isFixedTimeStep = true;       // game update frequency
        this._targetElapsedTime = 1/60;
        this._accumulatedTime = 0;
        
        this._contextType = "2d";
        
        this._gameTime = undefined;
    }

    /**
     * Gets the current ContentManager.
     * @return {ContentManager} The current content manager.
     */
    get Content() {
        return this._content;
    }
    
    /**
     * Sets the current ContentManager.
     * @param {ContentManager} contentManager - The current content manager.
     */
    set Content(contentManager) {
        this._content = contentManager;
    }
    
    /**
     * Gets the current GraphicsDevice.
     * @return {GraphicsDevice} The current GraphicsDevice.
     */
    get GraphicsDevice() {
        return this._graphicsDevice;
    }
    
    /**
     * Gets a value indicating whether to use fixed time steps.
     * @returns {Boolean} - true if using fixed time steps; false otherwise. 
     */
    get IsFixedTimeStep() {
        return this._isFixedTimeStep;
    }
    
    /**
     * Sets a value indicating whether to use fixed time steps.
     * @param {Boolean} value - true if using fixed time steps; false otherwise. 
     */
    set IsFixedTimeStep(value) {
        this._isFixedTimeStep = value;
    }
    
    /**
     * Gets the target time between calls to Update when IsFixedTimeStep is true.
     * @returns {number} The target time period for the game loop.
     */
    get TargetElapsedTime() {
        if (this.IsFixedTimeStep) {
            return this._targetElapsedTime;
        } else {
            return 0;
        }
    }
    
    /**
     * Sets the target time between calls to Update when IsFixedTimeStep is true.
     * @param {number} time - The target time period for the game loop.
     */
    set TargetElapsedTime(time) {
        this._targetElapsedTime = time;
    }
    
    /**
     * Gets the context type for the canvas.
     * @returns {string} Context type for the canvas.
     */
    get ContextType() {
        return this._contextType;
    }
    
    /**
     * Sets the context type for the canvas. 
     * @param {string} type - Context type for the canvas.
     */
    set ContextType(type) {
        this._contextType = type;
    }
    
    /**
     * Resets the elapsed time counter.
     * @function resetElapsedTime
     */
    resetElapsedTime() {
        this._gameTime = new GameTime();
    }
    
    /**
     * Called after the Game and GraphicsDevice are created, but before 
     * LoadContent.
     * @function initialize
     */
    // Must be overridden. https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/
    initialize() {
        this.resetElapsedTime();
    }
    
    /**
     * Called when graphics resources need to be loaded.
     * @function loadContent
     */
    // Must be overridden. https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/
    loadContent() {
    }
    
    /**
     * Called when graphics resources need to be unloaded. Override this method to
     * unload any game-specific graphics resources.
     * @function unloadContent
     */
    // Must be overridden. https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/
    unloadContent() {
    }
    
    /**
     * Called when the game has determined that game logic needs to be processed.
     * @function update
     * @param {GameTime} gameTime - Time passed since the last call to update.
     */
    // Must be overridden. https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/
    update(gameTime) {
    }
    
    /**
     * Called when the game determines it is time to draw a frame.
     * @function draw
     * @param {GameTime} gameTime - Time passed since the last call to draw.
     */
    // Must be overridden. https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/
    draw(gameTime) {
    }
    
    /**
     * Call this method to initialize the game, begin running the game loop, and 
     * start processing events for the game.
     * @function run
     */
    run() {
        this.initialize();
        this.loadContent();

        this.tick();
    }
    
    /**
     * Updates the game's clock and calls Update and Draw.
     * @function tick
     */
    tick(timeStamp) {
        this._gameTime.setElapsedGameTime(timeStamp);
        
        if (this.IsFixedTimeStep) {                                                 // Accumulated pattern (timing)
            this._accumulatedTime += this._gameTime.elapsedGameTime.totalSeconds;
            if (this._accumulatedTime > 1) {                                        // ... Limiting it to 1 second
                this._accumulatedTime = 1;
            }
            while (this._accumulatedTime > this.TargetElapsedTime) {
                this.update(this._gameTime);
                this._accumulatedTime -= this.TargetElapsedTime;
                this._gameTime.IsRunningSlowly = true;
            }
            this._gameTime.IsRunningSlowly = false;
        } else {                                                                    // No timing
            this.update(this._gameTime);
        }
        
        this.draw(this._gameTime);

        const that = this;
        window.requestAnimationFrame(function(timeStamp) {
            that.tick(timeStamp);
        });
    }
};
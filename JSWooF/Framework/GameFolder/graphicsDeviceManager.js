/**
 * Handles the configuration and management of the graphics device.
 *
 * @module GraphicsDeviceManager
 * @author Sébastien Bolduc
 * @version 0.0
 */

import GraphicsDevice from "/JSWooF/Framework/GameFolder/Graphics/graphicsDevice.js";
import PresentationParameters from "/JSWooF/Framework/GameFolder/Graphics/presentationParameters.js";

/**
 * My namespace for graphic device manager.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.GameFolder
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.GameFolder = JSWooF.Framework.GameFolder || {};

/**
 * Creates a new GraphicsDeviceManager and registers it to handle the 
 * configuration and management of the graphics device for the specified game.
 * @class
 * @classdesc Handles the configuration and management of the graphics device.
 */
export default JSWooF.Framework.GameFolder.GraphicsDeviceManager = class {
    /**
     * handle the configuration and management of the graphics device for the 
     * specified Game.
     * @constructs GraphicsDeviceManager
     * @param {Game} game - Game the GraphicsDeviceManager should be associated with.
     */
    constructor(game) {
        this.presentationParameters = new PresentationParameters();     // Presentation parameters for GraphicsDevice (creating the canvas)
        
        this.defaultBackBufferHeight = 640;
        this.defaultBackBufferWidth = 640;
        
        this._preferredBackBufferFormat = undefined;
        this._preferredBackBufferHeight = undefined;
        this._preferredBackBufferWidth = undefined;
        this.PreferredBackBufferHeight = this.defaultBackBufferHeight;
        this.PreferredBackBufferWidth = this.defaultBackBufferWidth;
        
        this.presentationParameters.BackBufferFormat = game.ContextType;
        this.presentationParameters.BackBufferHeight = this.PreferredBackBufferHeight;
        this.presentationParameters.BackBufferWidth = this.PreferredBackBufferWidth;
        
        this._graphicsDevice = new GraphicsDevice(this.presentationParameters);
        game._graphicsDevice = this._graphicsDevice;                    // Pass by reference...
    }
    
    /**
     * Gets the GraphicsDevice associated with the GraphicsDeviceManager.
     * @returns {GraphicsDevice} The GraphicsDevice associated with the GraphicsDeviceManager.
     */
    get GraphicsDevice() {
        return this._graphicsDevice;
    }
    
    /**
     * Gets the format of the back buffer.
     * @returns {Object} Format of the back buffer.
     */
    get PreferredBackBufferFormat() {
        return this._preferredBackBufferFormat;
    }
    
    /**
     * Sets the format of the back buffer.
     * @param {Object} format - Format of the back buffer.
     */
    set PreferredBackBufferFormat(format) {
        this._preferredBackBufferFormat = format;
        this.presentationParameters.BackBufferFormat = format;
    }
    
    /**
     * Gets the preferred back-buffer height.
     * @returns {number} Back-buffer height.
     */
    get PreferredBackBufferHeight() {
        return this._preferredBackBufferHeight;
    }
    
    /**
     * Sets the preferred back-buffer height.
     * @param {number} height - Back-buffer height.
     */
    set PreferredBackBufferHeight(height) {
        this._preferredBackBufferHeight = height;
        this.presentationParameters.BackBufferHeight = height;
    }
    
    /**
     * Gets the preferred back-buffer width.
     * @returns {number} Back-buffer width.
     */
    get PreferredBackBufferWidth() {
        return this._preferredBackBufferWidth;
    }
    
    /**
     * Sets the preferred back-buffer width.
     * @param {number} width - Back-buffer width.
     */
    set PreferredBackBufferWidth(width) {
        this._preferredBackBufferWidth = width;
        this.presentationParameters.BackBufferWidth = width;
    }
};
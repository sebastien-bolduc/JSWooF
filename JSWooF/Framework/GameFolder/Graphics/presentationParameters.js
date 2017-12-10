/**
 * Contains presentation parameters.
 *
 * @module PresentationParameters
 * @author Sébastien Bolduc
 * @version 0.0
 */

/**
 * My namespace for presentation parameters.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.GameFolder.Graphics
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.GameFolder = JSWooF.Framework.GameFolder || {};
JSWooF.Framework.GameFolder.Graphics = JSWooF.Framework.GameFolder.Graphics || {};

/**
 * Contains presentation parameters.
 * @class
 * @classdesc Contains presentation parameters.
 */
export default JSWooF.Framework.GameFolder.Graphics.PresentationParameters = class {
    /**
     * Initializes a new instance of this class.
     * @constructs PresentationParameters
     */
    constructor() {
        this._backBufferFormat = undefined;
        this._backBufferHeight = undefined;
        this._backBufferWidth = undefined;
        this._deviceWindowHandle = undefined;
        this._renderTargerUsage = undefined;
    }
    
    /**
     * Gets the format of the back buffer.
     * @returns {Object} Format of the back buffer.
     */
    get BackBufferFormat() {
        return this._backBufferFormat;
    }
    
    /**
     * Sets the format of the back buffer.
     * @param {Object} format - Format of the back buffer.
     */
    set BackBufferFormat(format) {
        this._backBufferFormat = format;
    }
    
    /**
     * Gets a value indicating the height of the new swap chain's back buffer.
     * @returns {number} Height of the new swap chain's back buffer.
     */
    get BackBufferHeight() {
        return this._backBufferHeight;
    }
    
    /**
     * Sets a value indicating the height of the new swap chain's back buffer.
     * @param {number} height - Height of the new swap chain's back buffer.
     */
    set BackBufferHeight(height) {
        this._backBufferHeight = height;
    }
    
    /**
     * Gets a value indicating the width of the new swap chain's back buffer.
     * @returns {number} Width of the new swap chain's back buffer.
     */
    get BackBufferWidth() {
        return this._backBufferWidth;
    }
    
    /**
     * Sets a value indicating the width of the new swap chain's back buffer.
     * @param {number} width - Width of the new swap chain's back buffer.
     */
    set BackBufferWidth(width) {
        this._backBufferWidth = width;
    }
    
    /**
     * Gets the handle to the device window (canvas).
     * @returns {string} Handle to the device window (canvas).
     */
    get DeviceWindowHandle() {
        return this._deviceWindowHandle;
    }
    
    /**
     * Sets the handle to the device window (canvas).
     * @param {string} handle - Handle to the device window (canvas).
     */
    set DeviceWindowHandle(handle) {
        this._deviceWindowHandle = handle;
    }
    
    /**
     * Gets render target usage ID.
     * @return {string} Render target usage ID.
     */
    get RenderTargetUsage() {
        return this._renderTargerUsage;
    }
    
    /**
     * Sets render target usage ID.
     * @param {string} target - Render target usage ID.
     */
    set RenderTargetUsage(target) {
        this._renderTargerUsage = target; 
    }
};
/**
 * Defines the window dimensions of a render-target surface onto which a 3D 
 * volume projects.
 * 
 * @module Viewport
 * @author Sébastien Bolduc
 * @version 0.0
 */

import Vector2 from "/JSWooF/Framework/GameFolder/vector2.js";

/**
 * My namespace for viewport.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.GameFolder.Graphics
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.GameFolder = JSWooF.Framework.GameFolder || {};
JSWooF.Framework.GameFolder.Graphics = JSWooF.Framework.GameFolder.Graphics || {};

/**
 * Defines the window dimensions of a render-target surface onto which a 3D 
 * volume projects.
 * @class
 * @classdesc Defines the window dimensions of a render-target surface.
 */
export default JSWooF.Framework.GameFolder.Graphics.Viewport = class {
    /**
     * Creates an instance of this class.
     * @constructs Viewport
     * @param {number} x - The x coordinate of the upper-left corner of the viewport in pixels
     * @param {number} y - The y coordinate of the upper-left corner of the viewport in pixels.
     * @param {number} width - The width of the viewport in pixels.
     * @param {number} height - The height of the viewport in pixels.
     */
    constructor(x, y , width, height) {
        this._position = new Vector2(x, y);
        this._size = new Vector2(width, height);
        this._tileSafeArea = new Vector2(0, 0);
    }
    
    /**
     * Gets the pixel coordinate of the upper-left corner of the viewport on the 
     * render-target surface. 
     * @returns {number} The upper-left corner of the viewport.
     */
    get X() {
        return this._position.X;
    }
    
    /**
     * Sets the pixel coordinate of the upper-left corner of the viewport on the 
     * render-target surface. 
     * @param {number} x - The upper-left corner of the viewport.
     */
    set X(x) {
        this._position.X = x;
    }
    
    /**
     * Gets the pixel coordinate of the upper-left corner of the viewport on the 
     * render-target surface.
     * @returns {number} The upper-left corner of the viewport.
     */
    get Y() {
        return this._position.Y;
    }
    
    /**
     * Sets the pixel coordinate of the upper-left corner of the viewport on the 
     * render-target surface.
     * @param {number} y - The upper-left corner of the viewport.
     */
    set Y(y) {
        this._position.Y = y;
    }
    
    /**
     * Gets the width dimension of the viewport on the render-target surface, 
     * in pixels.
     * @returns {number} The width, in pixels, of the viewport.
     */
    get Width() {
        return this._size.X;
    }
    
    /**
     * Sets the width dimension of the viewport on the render-target surface, 
     * in pixels.
     * @param {number} width - The width, in pixels, of the viewport. 
     */
    set Width(width) {
        this._size.X = width;
    }
    
    /**
     * Gets the height dimension of the viewport on the render-target surface, 
     * in pixels.
     * @returns {number} The height, in pixels, of the viewport.
     */
    get Height() {
        return this._size.Y;
    }
    
    /**
     * Sets the height dimension of the viewport on the render-target surface, 
     * in pixels.
     * @param {number} height - The height, in pixels, of the viewport.
     */
    set Height(height) {
        this._size.Y = height;
    }
    
    /**
     * Gets the title safe area of the current viewport (viewport offset).
     * @returns {Vector2} The title safe area.
     */
    get TileSafeArea() {
        return this._tileSafeArea;
    }
};
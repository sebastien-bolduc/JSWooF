/**
 * Defines a vector with two components.
 *
 * @module Vector2
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
/**
 * My namespace for a vector.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.GameFolder
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.GameFolder = JSWooF.Framework.GameFolder || {};

/**
 * Defines a vector with two components.
 * @class
 * @classdesc Defines a vector with two components.
 */
export default JSWooF.Framework.GameFolder.Vector2 = class {
    /**
     * Initializes a new instance of Vector2.
     * @constructs Vector2
     * @param {number} x - The x-component of the vector.
     * @param {number} y - the y-component of the vector.
     */
    constructor(x, y) {
        this._x = undefined;
        this._y = undefined;
        this.X = x;
        this.Y = y;
    }
    
    /**
     * Gets the x-component of the vector.
     * @returns {number} The x-component of the vector.
     */
    get X() {
        return this._x;
    }
    
    /**
     * Sets the x-component of the vector.
     * @param {number} component - The x-component of the vector.
     */
    set X(component) {
        this._x = component;
    }
    
    /**
     * Gets the y-component of the vector.
     * @returns {number} The y-component of the vector.
     */
    get Y() {
        return this._y;
    }
    
    /**
     * Sets the y-component of the vector.
     * @param {number} component - The y-component of the vector.
     */
    set Y(component) {
        this._y = component;
    }
};
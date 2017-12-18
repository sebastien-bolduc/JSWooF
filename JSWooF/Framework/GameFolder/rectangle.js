/**
 * Defines a rectangle.
 *
 * @module Rectangle
 * @author Sébastien Bolduc
 * @version 0.0
 */

import Vector2 from "/JSWooF/Framework/GameFolder/vector2.js";

/**
 * My namespace for a rectangle.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.GameFolder
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.GameFolder = JSWooF.Framework.GameFolder || {};

/**
 * Defines a rectangle.
 * @class
 * @classdesc Defines a rectangle.
 */
export default JSWooF.Framework.GameFolder.Rectangle = class {
    /**
     * Initializes a new instance of Rectangle.
     * @constructs Rectangle
     * @param {number} x - The x-coordinate of the rectangle.
     * @param {number} y - The y-coordinate of the rectangle.
     * @param {number} width - Width of the rectangle.
     * @param {number} height - Height of the rectangle.
     */
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }
    
    /**
     * Gets the upper-left value of the Rectangle.
     * @returns {Vector2} The upper-left corner of the Rectangle.
     */
    get Location() {
        return new Vector2(this._x, this._y);
    }
    
    /**
     * Sets the upper-left value of the Rectangle.
     * @param {Vector2} point - The new upper-left corner of the Rectangle.
     */
    set Location(point) {
        this._x = point.X;
        this._y = point.Y;
    }
    
    /**
     * Sets the size of the Rectangle.
     * @param {Vector2} point - the new size of the Rectangle.
     */
    set Size(point) {
        this._width = point.X;
        this._height = point.Y;
    }
    
    /**
     * Returns the y-coordinate of the bottom of the rectangle.
     * @returns {number} The y-coordinate of the bottom of the rectangle.
     */
    get Bottom() {
        return this._y + this._height;
    }
    
    /**
     * Returns the x-coordinate of the left side of the rectangle.
     * @returns {number} The x-coordinate of the left side of the rectangle.
     */
    get Left() {
        return this._x;
    }
    
    /**
     * Returns the x-coordinate of the right side of the rectangle.
     * @returns {number} The x-coordinate of the right side of the rectangle.
     */
    get Right() {
        return this._x + this._width;
    }
    
    /**
     * Returns the y-coordinate of the top of the rectangle.
     * @returns {number} The y-coordinate of the top of the rectangle.
     */
    get Top() {
        return this._y;
    }
    
    /**
     * Determines whether a specified Rectangle intersects with this Rectangle.
     * @function intersects
     * @param {Rectangle} value - The Rectangle to evaluate.
     * @returns {boolean} True if the specified Rectangle intersects with this one; false otherwise.
     */
    intersects(value) {
        if (this.Left < value.Right && 
            this.Right > value.Left &&
            this.Top < value.Bottom &&
            this.Bottom > value.Top) {
                return true;
        } else {
            return false;
        }
    }
};
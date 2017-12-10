/**
 * Defines a matrix.
 *
 * @module Matrix
 * @author Sébastien Bolduc
 * @version 0.0
 */

/**
 * My namespace for a matrix.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.GameFolder
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.GameFolder = JSWooF.Framework.GameFolder || {};

/**
 * Defines a matrix.
 * @class
 * @classdesc Defines a matrix.
 */
export default JSWooF.Framework.GameFolder.Matrix = class {
    /**
     * Initializes a new instance of Matrix.
     * @constructs Matrix
     */
    constructor() {
        this._columnVector = true;
        this._rowVector = false;
        
        this._grid = [];
    }
    
    /**
     * Sets matrix as column vector.
     * @function setColumnVector
     */
    setColumnVector() {
        this._columnVector = true;
        this._rowVector = false;
    }
    
    /**
     * Sets matrix as row vector.
     * @function setRowVector
     */
    setRowVector() {
        this._columnVector = false;
        this._rowVector = true;
    }
    
    /**
     * Gets a value of the matrix.
     * @function get
     * @param {number} x - Row of the matrix.
     * @param {number} y - Column of the matrix.
     * @returns {Object} Value at row and column of the matrix.
     */
    get(x, y) {
        if (this._grid[x] == undefined) {
            return undefined;
        }
        
        return this._grid[x][y];
    }
    
    /**
     * Sets a value of the matrix.
     * @function set
     * @param {number} x - Row of the matrix.
     * @param {number} y - Column of the matrix.
     * @param {Object} value - Value at row and column of the matrix.
     */
    set(x, y, value) {
        if (this._grid[x] == undefined) {
            this._grid[x] = [];
        }
        
        this._grid[x][y] = value;
    }
};